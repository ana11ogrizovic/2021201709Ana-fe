import Link from "next/link";

export default function UserList() {


    return (
        <>
            <h1>USER LIST PAGE</h1>
            <br/>
            <br/>
            <Link href="/user/create">Go to user create page</Link>
        </>
    );
}
