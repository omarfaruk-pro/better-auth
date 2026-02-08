
"use client";

import Swal from "sweetalert2";
import { signIn } from "../lib/auth-client";


export default function GithubLogin() {
  const handleGithub = async () => {
    Swal.fire({
      icon:"info",
      title:"No functionality here",
      text:"You can use Google or email pass to check. Thank you."
    })
  };

  return (
    <button onClick={handleGithub} className='bg-yellow-600 px-6 py-2 rounded-md text-white font-semibold'>
      Sign in with Github
    </button>
  );
}