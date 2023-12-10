import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getAuth, onIdTokenChanged } from 'firebase/auth';

import { setCookie, destroyCookie } from 'nookies';

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
    const unsubscribe = onIdTokenChanged(auth, async user => {
      if (user) {
        const token = await user.getIdToken();
        // Yes, it is okay for javascript running on the client side to access the ID token issued by Firebase Authentication.
        // The ID token is specifically designed to be used on the client side for authenication and authorization purposes.
        setUser(user);
        setCookie(undefined, 'idToken', token, { path: '/', secure: true });
      } else {
        setUser(null);
        destroyCookie(undefined, 'idToken', { path: '/', secure: true });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
