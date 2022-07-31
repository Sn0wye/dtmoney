import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
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
  disconnect: () => Promise<void>;
  createAccountWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
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
    const { user } = await signInWithPopup(auth, googleProvider);

    const dbUser = await backend.post('/users/create', {
      name: user.displayName,
      id: user.uid,
      profilePic: user.photoURL,
    });

    setUser(dbUser.data);
    return;
  }

  async function disconnect() {
    await signOut(auth);
    setUser(null);
  }

  async function createAccountWithEmailAndPassword(
    name: string,
    email: string,
    password: string
  ) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const dbUser = await backend.post('/users/create', {
      name,
      id: user.uid,
      profilePic: user.photoURL,
    });

    setUser(dbUser.data.user);
    return;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        disconnect,
        createAccountWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
