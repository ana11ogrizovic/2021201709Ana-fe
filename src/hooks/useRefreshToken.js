import {signIn, useSession} from "next-auth/react";
import {post} from "@/core/httpClient";

export const useRefreshToken = () => {
    const {data: session, update} = useSession();

    const headers = {
        Authorization: `Bearer ${session?.user?.refreshToken}`,
    };

    const refreshToken = async () => {
        const resp = await post("/auth/refresh-token", {}, {headers});

        if (session && resp && resp.status === 200 && resp.data) {
            await update({
                ...session,
                user: {
                    ...session?.user,
                    token: resp.data.token,
                    refreshToken: resp.data.refreshToken
                },
            });

            return {token: resp.data.token};
        } else {
            await signIn();
        }
    }

    return refreshToken;
}