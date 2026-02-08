
import { headers } from "next/headers";
import { auth } from "../lib/auth";



export default async function ServerCom() {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    console.log("session from server component", session)
    return (
        <div>ServerCom</div>
    )
}
