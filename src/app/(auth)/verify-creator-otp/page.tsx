"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { axiosInstance } from "@/store/axiosInstance";

export default function VerifyCreatorOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Send initial OTP when page loads
  useEffect(() => {
    if (phoneNumber && !otpSent) {
      sendInitialOtp();
    }
  }, [phoneNumber, otpSent]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const sendInitialOtp = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/creators/send-otp", { phoneNumber });
      setOtpSent(true);
      toast.success("Verification code sent to your phone");
    } catch (err: any) {
      console.error("Send OTP Error:", err);
      setError(err.response?.data?.message || "Failed to send verification code");
      toast.error("Failed to send verification code");
    } finally {
      setLoading(false);
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
      await axiosInstance.post("/creators/verify-otp", { 
        phoneNumber, 
        verificationCode: otpString 
      });
      
      toast.success("Phone number verified successfully!");
      router.push("/icerik-uretici-ol/submitted-successfully");
    } catch (err: any) {
      console.error("OTP Verification Error:", err);
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      await axiosInstance.post("/creators/resend-otp", { phoneNumber });
      setCountdown(120);
      setCanResend(false);
      setOtp(Array(6).fill(""));
      toast.success("Verification code resent");
    } catch (err: any) {
      setError("Failed to resend OTP");
      toast.error("Failed to resend verification code");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!phoneNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Request</h1>
          <p className="text-gray-600 mb-4">Phone number is required for verification.</p>
          <button 
            onClick={() => router.push("/icerik-uretici-ol")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify Your Phone Number
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to
          </p>
          <p className="font-semibold text-blue-600">{phoneNumber}</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Enter 6-digit verification code
            </label>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Phone Number"}
            </button>
          </div>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!canResend}
              className={`text-sm ${
                canResend
                  ? "text-blue-600 hover:text-blue-500 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              {canResend ? "Resend Code" : `Resend in ${formatTime(countdown)}`}
            </button>
            
            <div>
              <button
                type="button"
                onClick={() => router.push("/icerik-uretici-ol")}
                className="text-sm text-gray-600 hover:text-gray-500"
              >
                Back to Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
