import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import * as z from 'zod';

import closeImg from '../../assets/close.svg';
import googleIcon from '../../assets/google.svg';
import { useAuth } from '../../hooks/useAuth';

import {
  AlreadyHaveAnAccount,
  Divider,
  Form,
  Google,
  Register,
} from './styles';

interface RegisterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSwitchModalRequest: () => void;
}

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerFormSchema = z
  .object({
    name: z.string(),
    email: z.string().email({ message: 'Email must be valid' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const RegisterModal = ({
  isOpen,
  onRequestClose,
  onSwitchModalRequest,
}: RegisterModalProps) => {
  const { signInWithGoogle, createAccountWithEmailAndPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: IFormInputs) {
    await createAccountWithEmailAndPassword(
      data.name,
      data.email,
      data.password
    );
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create your account</h2>

        <Google type='button' onClick={signInWithGoogle}>
          <span>Google</span>
          <img src={googleIcon} alt='Google Icon' />
        </Google>

        <Divider>
          <span>or</span>
        </Divider>

        <input placeholder='Display Name' {...register('name')} />
        {errors.email && <p>{errors.name?.message}</p>}

        <input placeholder='Email' {...register('email')} />
        {errors.email && <p>{errors.email?.message}</p>}

        <input
          placeholder='Password'
          type='password'
          {...register('password')}
        />
        {errors.password && <p>{errors.password?.message}</p>}

        <input
          placeholder='Confirm Password'
          type='password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}

        <Register type='submit'>Register</Register>

        <AlreadyHaveAnAccount>
          <span>Already have an account?</span>
          <button onClick={onSwitchModalRequest}>Log in</button>
        </AlreadyHaveAnAccount>
      </Form>
    </Modal>
  );
};
