import { useRouter } from "next/router";

export default function Film() {
    const router = useRouter();
    const {id} = router.query;

    return <p>Film: {id}</p>
}