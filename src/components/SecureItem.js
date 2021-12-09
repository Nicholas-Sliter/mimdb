import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function SecureItem() {
    const [session] = useSession();
    const [secret, setSecret] = useState(); //eslint-disable-line no-unused-vars

    useEffect(() => {
        const getSecret = async () => {
            const response = await fetch("api/secret");
            if (response.ok) {
                const data = await response.json();
                setSecret(data.message);
            } else {
                setSecret(response.statusText);
            }
        }
        getSecret();
    }, [session]);

    return (
        <div>
            <p>{(session) ? `Welcome ${session.user.name}` : "You are not logged in"}</p>
            {/* <p>{`Server message: ${secret}`}</p> */}
        </div>
    )
}