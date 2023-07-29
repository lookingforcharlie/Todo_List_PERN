import { FC } from 'react';

interface ThreeDProps {}

const ThreeD: FC<ThreeDProps> = ({}) => {
  return (
    <>
      {/* <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-pulse' />
      <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div> */}

      <div className='absolute bottom-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob'></div>
      <div className='absolute top-24 right-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000'></div>
      <div className='absolute top-40 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000'></div>
    </>
  );
};

export default ThreeD;
