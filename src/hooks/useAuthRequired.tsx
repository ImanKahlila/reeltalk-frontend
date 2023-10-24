import { useEffect } from 'react';
import app from '@/firebase/firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

// Pages where if user authenticated they should be redirected to the dashboard
const publicPages = [
    '/onboarding',
    '/login',
    '/login-email',
    '/onboarding/create-email',
];

export const useAuthRequired = () => {
    const router = useRouter();
    const auth = getAuth(app);
    useEffect(() => {
        // Check if user is authenticated
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                if (!publicPages.includes(router.asPath)) {
                    router.push('/login'); // Redirect to login page if not authenticated
                }
            } else if (publicPages.includes(router.asPath)) {
                // Redirect to the dashboard if the user is authenticated and on an authenticatedRedirectPage
                router.push('/dashboard');
            }
        });

        return () => unsubscribe(); // Unsubscribe from the auth state listener
        // eslint-disable-next-line
    }, [auth]);
};
