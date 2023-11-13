import { useEffect } from 'react';
import app from '@/firebase/firebase-config';
import {
    getAuth,
    isSignInWithEmailLink,
    onAuthStateChanged,
} from 'firebase/auth';
import { useRouter } from 'next/router';

export const useAuthRequired = () => {
    const router = useRouter();
    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user && !isSignInWithEmailLink(auth, window.location.href)) {
                router.push('/login'); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe();
        //eslint-disable-next-line
    }, [auth]);

    return auth.currentUser;
};
