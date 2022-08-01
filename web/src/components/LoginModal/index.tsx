import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import * as z from 'zod';

import closeImg from '../../assets/close.svg';
import googleIcon from '../../assets/google.svg';
import { useAuth } from '../../hooks/useAuth';

import { Divider, Form, Login, LogInWithGoogle, NoAccount } from './styles';

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSwitchModalRequest: () => void;
}

interface ILoginFormFields {
  email: string;
  password: string;
}

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
//TODO: Finish the auth process via firebase and validate form input

export const LoginModal = ({
  isOpen,
  onRequestClose,
  onSwitchModalRequest,
}: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormFields>({
    resolver: zodResolver(loginFormSchema),
  });

  const { signInWithGoogle, logInWithEmailAndPassword } = useAuth();

  async function handleLogin(data: ILoginFormFields) {
    const { email, password } = data;
    await logInWithEmailAndPassword(email, password);
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt='Close modal' />
      </button>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <h2>
          Log in and take your finances
          <br />
          <span>a step further</span>.
        </h2>

        <LogInWithGoogle type='button' onClick={signInWithGoogle}>
          <span>Log in with Google</span>
          <img src={googleIcon} alt='Google Icon' />
        </LogInWithGoogle>

        <Divider>
          <span>or</span>
        </Divider>

        <input placeholder='Username' {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          placeholder='Password'
          type='password'
          {...register('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <Login type='submit'>Log In</Login>
        <NoAccount>
          <span>Don't have an account?</span>
          <button onClick={onSwitchModalRequest}>Sign Up</button>
        </NoAccount>
      </Form>
    </Modal>
  );
};
