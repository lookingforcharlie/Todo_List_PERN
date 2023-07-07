import { FC } from 'react';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <LoginForm />
      </div>
      <div className='hidden relative bg-gray-200 lg:flex w-1/2 items-center justify-center '>
        <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-pulse' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
      </div>
    </div>
  );
};

export default LoginPage;
