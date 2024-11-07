import { useForm } from "react-hook-form";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store"; // Import AppDispatch and RootState types
import { loginUser, resetLoginState } from "@/store/features/auth/loginSlice"; // Assuming your loginSlice is named like this

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch to correctly type dispatch
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const loginState = useSelector((state: RootState) => state.login); // Use RootState to type the state

  const onSubmit = (data: FormData) => {
    dispatch(loginUser(data)); // Ensure correct data type passed to loginUser
  };

  useEffect(() => {
    if (loginState.success) {
      alert("Login successful!");
      dispatch(resetLoginState());
    }
  }, [loginState.success, dispatch]);

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
            {...register("email", { required: "E-posta zorunludur" })}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="eposta@gmail.com"
          />
        </div>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div className="mb-4">
        <div className="flex items-center border border-gray-300">
          <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
            <img src="/lockIcon.png" alt="Password Icon" className="h-7 w-7" />
          </div>
          <input
            type="password"
            {...register("password", { required: "Şifre zorunludur" })}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="şifrenizi girin"
          />
        </div>
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      <div className="flex items-start mb-2">
        <input id="rememberMe" type="checkbox" className="mt-1 mr-2" {...register("rememberMe")} />
        <label htmlFor="rememberMe" className="text-sm text-gray-500">Beni Hatırla</label>
      </div>
      {errors.rememberMe && <span className="text-red-500">Beni hatırlama seçeneği gereklidir</span>}

      <button type="submit" className="w-full ButtonBlue text-white py-2 rounded-lg font-semibold">
        {loginState.loading ? "Logging in..." : "Giriş Yap"}
      </button>

      {loginState.error && <span className="text-red-500">{loginState.error}</span>}
    </form>
  );
};

export default LoginForm;
