"use server"
import { createAuthClient } from "better-auth/client";
import { redirect } from "next/navigation";
const authClient = createAuthClient();

export async function socialLogin(formData) {
  const {data} = await authClient.signIn.social({
    provider:formData.get("provider") ,
    callbackURL: "/", 
    disableRedirect: true,
  });
  redirect(data.url)
}
