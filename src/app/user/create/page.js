'use client'

import Link from "next/link";
import {useEffect, useState} from "react";
import {get} from "@/core/httpClient";

export default function UserCreate() {
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();


    const getFirstName = async () => {
        setLoading(true);

        let result = await get("/user/get-first-name");
        console.log(result)
        setData(result.data);
        setLoading(false);
    }

    useEffect(() => {
        getFirstName();
    }, [counter]);

    return (
        <>
            {loading === true ? <h1>Loading...</h1> : (
                <>
                    <h1>{data}</h1>

                    /* {<h1>{counter}</h1>}
                    {<h1>{counter}</h1>}
                    {<h1>{counter}</h1>}
                    {<h1>{counter}</h1>} */



                    <button onClick={() => {
                        setCounter(counter + 1);
                    }}>Add + 1
                    </button>

                </>
            )}
        </>
    );
}