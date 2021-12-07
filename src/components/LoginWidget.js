import {
    signIn,
    signOut,
    useSession
} from "next-auth/client"

export default function LoginWidget() {
    const [session] = useSession();


    if (session) {
        return (<div>
            <p>Signed in as {session.user.email} <button onClick={signOut}>Sign out</button> </p>
        </div>);
    } else {
        return (<div>
            <button onClick={signIn}>Sign in</button>
        </div>);
    }
}