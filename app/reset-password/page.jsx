"use client"

import Link from "next/link";
import Swal from "sweetalert2";
import { authClient } from "../lib/auth-client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [showPass, setShowPass] = useState({
        pass: false,
        cpass: false,
    })

    if (!token) {
        Swal.fire({
            icon: "warning",
            title: "You don't have a valid token",
            timer: 4000
        })
    }

    const handleResetPass = async (e) => {
        e.preventDefault();
        const pass = e.target.password.value;
        const cpass = e.target.cpassword.value;

        if (pass !== cpass) {
            Swal.fire({
                icon: "error",
                title: "Your password not match"
            })
            return;
        }
        await authClient.resetPassword({
            newPassword: pass,
            token,
        });
    }
    return (
        <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-md w-full mx-auto">
                <div className="p-8">
                    <form onSubmit={handleResetPass}>
                        <div className="mb-5 relative">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>

                            <input type={showPass.pass ? "text" : "password"} id="password" name="password" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />
                            <button type="button" onClick={() => setShowPass({ ...showPass, pass: !showPass.pass })} className="absolute bottom-3 right-2 capitalize">
                                {
                                    showPass.pass ? "hide" : "show"
                                }
                            </button>
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>

                            <input type={showPass.cpass ? "text" : "password"} id="cpassword" name="cpassword" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />

                            <button type="button" onClick={() => setShowPass({ ...showPass, cpass: !showPass.cpass })} className="absolute bottom-3 right-2 capitalize">
                                {
                                    showPass.cpass ? "hide" : "show"
                                }
                            </button>
                        </div>

                        <button disabled={!token} type="submit" className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">Reset Password</button>
                    </form>
                </div>

                <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100 mt-5 gap-5">
                    <Link href="/login" className="font-medium text-indigo-500">Sign In</Link>
                    <Link href="/signup" className="font-medium text-indigo-500">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
