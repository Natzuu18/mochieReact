import { useState, useEffect } from "react";
import { getCurrentUser } from "../infrastructure/api/user.service";

type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>;

export const useGetCurrentUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<CurrentUser | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await getCurrentUser();
                setUser(result);

            } catch (err: any) {
                setError(err.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []); 

    return { user, loading, error };
};