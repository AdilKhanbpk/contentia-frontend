"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetSignupState } from "@/store/features/auth/signupSlice";

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, success, error } = useSelector((state: any) => state.signup);
  const [form, setForm] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    rememberMe: false,
    termsAndConditionsApproved: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(signupUser(form) as any).unwrap();
      // Replace home page redirect with OTP page redirect
      router.push(`/verify-otp?phoneNumber=${encodeURIComponent(form.phoneNumber)}`);
    } catch (error) {
      // ...error handling...
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          <div>
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          <div>
            <input 
              name="phoneNumber" 
              type="tel" 
              placeholder="Phone Number" 
              value={form.phoneNumber} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input 
                name="rememberMe" 
                type="checkbox" 
                checked={form.rememberMe} 
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Remember Me</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input 
                name="termsAndConditionsApproved" 
                type="checkbox" 
                checked={form.termsAndConditionsApproved} 
                onChange={handleChange} 
                required
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>I agree to the terms and conditions</span>
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
