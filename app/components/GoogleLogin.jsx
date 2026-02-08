
"use client";

import { useState } from "react";
import { signIn } from "../lib/auth-client";


export default function GoogleLogin() {
  const [loading, setLoading] = useState(false)
  const handleGoogle = async () => {
    setLoading(true)
    await signIn.social({ provider: "google" }, {onSuccess:()=>setLoading(false)});
  };

  return (
    <button disabled={loading} onClick={handleGoogle} className='bg-blue-600 px-6 py-2 rounded-md text-white font-semibold'>
      Sign in with Google
    </button>
  );
}
