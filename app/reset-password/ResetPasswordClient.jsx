"use client";

import Link from "next/link";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function ResetPasswordClient() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [showPass, setShowPass] = useState({
        pass: false,
        cpass: false,
    });

    useEffect(() => {
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "You don't have a valid token",
                timer: 4000,
            });
        }
    }, [token]);

    const handleResetPass = async (e) => {
        e.preventDefault();
        const pass = e.target.password.value;
        const cpass = e.target.cpassword.value;

        if (pass !== cpass) {
            Swal.fire({
                icon: "error",
                title: "Your password not match",
            });
            return;
        }

        await authClient.resetPassword({
            newPassword: pass,
            token,
        });
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-md w-full mx-auto">
            <div className="p-8">
                <form onSubmit={handleResetPass}>
                    <div className="mb-5 relative">
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type={showPass.pass ? "text" : "password"}
                            name="password"
                            className="block w-full p-3 rounded bg-gray-200 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPass({ ...showPass, pass: !showPass.pass })
                            }
                            className="absolute bottom-3 right-2"
                        >
                            {showPass.pass ? "hide" : "show"}
                        </button>
                    </div>

                    <div className="mb-5 relative">
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            type={showPass.cpass ? "text" : "password"}
                            name="cpassword"
                            className="block w-full p-3 rounded bg-gray-200 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPass({ ...showPass, cpass: !showPass.cpass })
                            }
                            className="absolute bottom-3 right-2"
                        >
                            {showPass.cpass ? "hide" : "show"}
                        </button>
                    </div>

                    <button
                        disabled={!token}
                        className="w-full p-3 mt-4 bg-indigo-600 text-white rounded"
                    >
                        Reset Password
                    </button>
                </form>
            </div>

            <div className="flex justify-between p-8 text-sm border-t bg-gray-100 gap-5">
                <Link href="/login" className="text-indigo-500">Sign In</Link>
                <Link href="/signup" className="text-indigo-500">Sign Up</Link>
            </div>
        </div>
    );
}
