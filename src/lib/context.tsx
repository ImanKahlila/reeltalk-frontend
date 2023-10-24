import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

import app from '@/firebase/firebase-config';

export const UserContext = createContext<{ user: User | null }>({
    user: null,
});

export const useUserContext = () => {
    return useContext(UserContext);
};

interface ComponentProps {
    children: React.ReactNode;
}

export const UserContextProvider = ({ children }: ComponentProps) => {
    const auth = getAuth(app);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authUser => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
