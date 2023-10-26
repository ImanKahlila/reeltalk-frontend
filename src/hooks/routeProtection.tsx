import { useEffect } from 'react';
import app from '@/firebase/firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

export const useAuthRequired = () => {
    const router = useRouter();
    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                router.push('/login'); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe();
        //eslint-disable-next-line
    }, [auth]);

    return auth.currentUser;
};

export const useRedirectIfAuthenticated = () => {
    const router = useRouter();
    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/dashboard'); // Redirect to the dashboard if authenticated
            }
        });

        return () => unsubscribe();
        //eslint-disable-next-line
    }, [auth]);
};
