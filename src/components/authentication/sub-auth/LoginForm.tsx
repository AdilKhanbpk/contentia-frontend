"use client";
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/features/auth/loginSlice'; // Import resetLoginState
import { RootState } from '@/store/store';
import { AppDispatch } from '@/store/store'; // Correctly typed dispatch
import { toast } from "react-toastify";

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const dispatch = useDispatch<AppDispatch>();

  // Access the login state using useSelector
  const loginState = useSelector((state: RootState) => state.login);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await dispatch(loginUser(data)); // Dispatch login action

      // Check if the login action was fulfilled and contains the token
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('Login successful'); // Show success message
      } else {
        toast.error('Login failed: Invalid credentials'); // Show error message if login fails
      }
    } catch (error) {
      toast.error('Login failed: An error occurred'); // Show error if there's an issue with the login process
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
      <button type="button" className="flex justify-center w-full text-gray-700 mb-4 border border-gray-300">
        <Image src="/googleIcon.svg" width={15} height={15} alt="Google Icon" className="p-1.5 w-10 h-10 border-r border-gray-300" />
        <div className="w-11/12 py-2">Google ile devam et</div>
      </button>

      <div className="text-center mb-4 text-gray-500">veya</div>

      <div className="mb-4">
        <div className="flex items-center border border-gray-300">
          <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
            <img src="/messageIcon.png" alt="Email Icon" className="w-7 h-7" />
          </div>
          <input
            type="email"
            {...register('email', { required: 'E-posta zorunludur' })}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="eposta@gmail.com"
          />
        </div>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div className="mb-4">
        <div className="flex items-center border border-gray-300">
          <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
            <img src="/lockIcon.png" alt="Password Icon" className="w-7 h-7" />
          </div>
          <input
            type="password"
            {...register('password', { required: 'Şifre zorunludur' })}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="şifrenizi girin"
          />
        </div>
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      <div className="flex items-start mt-4 mb-4">
        <input id="rememberMe" type="checkbox" className="mt-1 mr-2" {...register('rememberMe')} />
        <label htmlFor="rememberMe" className="text-sm text-gray-500">Beni Hatırla</label>
      </div>

      <button type="submit" className="w-full ButtonBlue text-white py-2 rounded-lg font-semibold" disabled={loginState.loading}>
        {loginState.loading ? 'Yükleniyor...' : 'Giriş Yap'}
      </button>

      {/* Show error message */}
      {loginState.error && <div className="text-red-500 text-center mt-4">{loginState.error}</div>}
    </form>
  );
};

export default LoginForm;
