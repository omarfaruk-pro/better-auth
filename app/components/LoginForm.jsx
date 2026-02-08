"use client"

import { useState } from "react";
import { authClient, signIn } from "../lib/auth-client";
import GoogleLogin from "./GoogleLogin";
import GithubLogin from "./GithubLogin";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [rememberMe, setRememberMe] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formEmail, setFormEmail] = useState("")
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        await signIn.email({
            email,
            password,
            rememberMe: rememberMe
        }, {
            onSuccess: (ctx) => {
                Swal.fire({
                    icon: "success",
                    title: `Hey ${ctx.data.user.name}`,
                    text: "You are logged in successfully",
                    timer: 4000
                })
                setLoading(false)
                router.push("/")
            },
            onError: (ctx) => {
                setLoading(false)
                console.log("error from login page", ctx)
                const { response } = ctx;
                if (response.status === 429) {
                    const retryAfter = response.headers.get("X-Retry-After");
                    console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
                    Swal.fire({
                        icon:"warning",
                        text:`Rate limit exceeded. Retry after ${retryAfter} seconds`
                    })
                } else if (ctx.error.status === 403) {
                    Swal.fire({
                        icon: "warning",
                        title: "Your email is not verified",
                        timer: 4000
                    })
                } else if (ctx.error.status === 500) {
                    Swal.fire({
                        icon: "warning",
                        title: "Internal Server Error",
                        timer: 4000
                    })
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: ctx.error.message,
                    })
                }
            }
        })
    }

    const reqResetPass = async () => {
        if (!formEmail) {
            Swal.fire({
                icon: "error",
                title: "Add your email first",
                timer: 4000
            })
        } else {
            await authClient.requestPasswordReset({
                email: formEmail,
                redirectTo: "http://localhost:3000/reset-password",
            }, {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Check your email",
                        text: "An email send your email with password reset url. Click this url and reset your password."
                    })
                },
                onError: (ctx) => {
                    console.log(ctx)
                    Swal.fire({
                        icon: "error",
                        text: ctx.error.message
                    })
                },
            });
        }

    }
    return (
        <>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-md w-full mx-auto">
                <div className="p-8">
                    <form className="" onSubmit={handleLogin}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>

                            <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} id="email" autoComplete="true" name="email" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />
                        </div>

                        <div className="mb-3 relative">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>

                            <input type={showPass ? "text" : "password"} id="password" autoComplete="true" name="password" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />

                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute bottom-3 right-2 capitalize">
                                {
                                    showPass ? "hide" : "show"
                                }
                            </button>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="remember" className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600 ">
                                <input type="checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                                Remember Me
                            </label>

                        </div>

                        <button disabled={loading} type="submit" className="w-full p-3 bg-indigo-600 text-white rounded shadow">Sign In</button>
                    </form>
                    <div className="flex mt-5 justify-between gap-1">
                        <GoogleLogin />
                        <GithubLogin />
                    </div>
                </div>

                <div className="flex justify-between px-8 py-4 text-sm border-t border-gray-300 bg-gray-100  gap-5">
                    <button onClick={reqResetPass} className="font-medium text-indigo-500">Forget Password</button>
                    <Link href="/signup" className="font-medium text-indigo-500">Sign Up</Link>
                </div>
            </div>
        </>
    )
}
