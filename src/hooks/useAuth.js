import {useSession} from "next-auth/react";
import {useRefreshToken} from "@/hooks/useRefreshToken";
import {useEffect} from "react";
import {AxiosAuth} from "@/core/httpClient";


const useAuth = () => {
    const {data: session} = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = AxiosAuth.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${session?.user?.token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = AxiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?.sent) {
                    prevRequest.sent = true;

                    const refreshTokenResponse = await refreshToken();

                    prevRequest.headers["Authorization"] = `Bearer ${refreshTokenResponse.token}`;
                    return AxiosAuth(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            AxiosAuth.interceptors.request.eject(requestIntercept);
            AxiosAuth.interceptors.response.eject(responseIntercept);
        };
    }, [session, refreshToken]);

    return AxiosAuth;
};

export default useAuth;