"use client"
import Link from 'next/link'
import { signOut, useSession } from '../lib/auth-client'

export default function Header() {
    const { data, isPending } = useSession()

    const handleSignOut = async () => {
        await signOut();
    }
    return (
        <>
            <header className='py-5'>
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-3xl font-bold uppercase text-yellow-600">
                        OF
                    </Link>
                    <div className='flex items-center gap-5'>
                        {
                            isPending ? <span>Wait...</span> : (


                                !data?.user ? (
                                    <>
                                        <Link href="/login" className='bg-amber-600 px-6 py-2 rounded-md text-white font-semibold'>Login</Link>
                                        <Link href="/signup" className='bg-blue-600 px-6 py-2 rounded-md text-white font-semibold'>Sign Up</Link>
                                    </>
                                ) : <button onClick={handleSignOut}>Logout</button>
                            )
                        }
                    </div>
                </div>
            </header>
        </>
    )
}
