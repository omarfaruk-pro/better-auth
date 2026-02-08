"use client"
import Link from "next/link";
import { signUp } from "../lib/auth-client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const router = useRouter();
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        await signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: () => {
                setLoading(false);
                Swal.fire({
                    icon:"success",
                    title:"Successfully Registerd",
                    text:`Hey ${name}! Check your email and verify to login`,
                    
                })
                router.push('/login')
            },
            onError: (ctx) => {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    text: ctx.error.message || "Something went wrong!"
                })
            },
        });
    }
    return (
        <>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-md w-full mx-auto">
                <div className="p-8">
                    <form className="" onSubmit={handleSignUp}>
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">Name</label>

                            <input type="text" id="name" autoComplete="true" name="name" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>

                            <input type="email" id="email" autoComplete="true" name="email" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />
                        </div>

                        <div className="mb-5 relative">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>

                            <input type={showPass ? "text" : "password"} id="password" autoComplete="true" name="password" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />

                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute bottom-3 right-2 capitalize">
                                {
                                    showPass ? "hide" : "show"
                                }
                            </button>
                        </div>

                        <button disabled={loading} type="submit" className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">Sign Up</button>
                    </form>
                </div>

                <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
                    <Link href="/login" className="font-medium text-indigo-500">Login</Link>
                </div>
            </div>
        </>
    )
}
