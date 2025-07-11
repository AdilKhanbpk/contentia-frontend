"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/store/axiosInstance";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);
    if (digits.length === 6) {
      const newOtp = digits.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post("/users/verify-otp", { phoneNumber, verificationCode: otpString });
      console.log(res.data.statusCode, res)
      if (res.data.statusCode == 200) {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          router.push("/giris-yap");
        }, 1500);
      }
    } catch (err: any) {
      console.error("OTP Verification Error:", err);
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await axiosInstance.post("/users/resend-otp", { phoneNumber });
      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    } catch (err: any) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-gray-600">Enter the 6-digit code sent to <strong>{phoneNumber}</strong></p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el: HTMLInputElement | null) => {
                  if (inputRefs.current) {
                    inputRefs.current[index] = el;
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 mb-2">Didn't receive the code?</p>
          {canResend ? (
            <button
              onClick={handleResendOTP}
              className="text-blue-600 font-semibold hover:text-blue-700"
              disabled={loading}
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">Resend in {countdown}s</p>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/giris-yap" className="text-gray-600 hover:text-gray-800 text-sm">
            ← Back to login page
          </Link>
        </div>
      </div>
    </div>
  );
}
