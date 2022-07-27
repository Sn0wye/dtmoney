import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { backend } from '../services/backend';
import { auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  profilePic: string | null;
};

interface UserContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as UserContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        retrieveUser(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  async function retrieveUser(uid: string) {
    const response = await backend.get(`/users/${uid}`);
    setUser(response.data);
  }

  const googleProvider = new GoogleAuthProvider();

  async function signInWithGoogle() {
    console.log('Fazendo signin');
    const { user } = await signInWithPopup(auth, googleProvider);

    const dbUser = await backend.post('/users/create', {
      name: user.displayName,
      id: user.uid,
      profilePic: user.photoURL,
    });

    console.log(dbUser);

    setUser(dbUser.data);
    return;
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
