'use client';

import { routes } from "@/services/api/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export const useAuthentication = () => {

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const isAuthenticated = await routes.users.current();
            if (!isAuthenticated)
                router.push('/login');
        })();
    }, []);
}