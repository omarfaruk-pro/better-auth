"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { emailOtp } from "../lib/auth-client";

export default function VerifyOtpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await emailOtp.verifyEmail({
                email,
                otp,
            });

            setSuccess("Email verified successfully!");
            setTimeout(() => router.push("/login"), 1200);
        } catch (err) {
            setError(err?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError("");
        setSuccess("");

        try {
            await otpClient.sendEmailVerification({ email });
            setSuccess("OTP resent to your email");
        } catch {
            setError("Failed to resend OTP");
        }
    };

    if (!email) {
        return (
            <div className="flex min-h-screen items-center justify-center text-red-500">
                Invalid verification link
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                    Verify your email
                </h1>

                <p className="mb-6 text-sm text-gray-600">
                    We sent a 6-digit code to{" "}
                    <span className="font-medium text-gray-900">{email}</span>
                </p>

                <form onSubmit={handleVerify} className="space-y-4">
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-lg tracking-widest outline-none focus:border-black"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-900 disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-600">
                        {success}
                    </p>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={handleResend}
                        className="text-sm font-medium text-gray-700 hover:underline"
                    >
                        Didn’t receive the code? Resend
                    </button>
                </div>
            </div>
        </div>
    );
}
