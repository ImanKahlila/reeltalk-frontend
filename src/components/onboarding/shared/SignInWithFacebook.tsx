import { useRouter } from 'next/router';

// Firebase Auth and Firestore
import {
    FacebookAuthProvider,
    getAuth,
    getAdditionalUserInfo,
    signInWithPopup,
} from 'firebase/auth';
import { collection, doc, setDoc, updateDoc, getFirestore } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

import FacebookIcon from '@/components/onboarding/FacebookIcon';

// Google Analytics
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../firebase/firebase-config';

// util
import toast from 'react-hot-toast';

// Variables
const auth = getAuth(app);

export const SignInWithFacebook = () => {
    const router = useRouter();
    const provider = new FacebookAuthProvider();

    //   async function signInWithFacebook() {
    //     try {
    //       const userCredential = await signInWithPopup(auth, provider);
    //       const additionalUserInfo = getAdditionalUserInfo(userCredential);

    //       if (additionalUserInfo?.isNewUser) {
    //         const db = getFirestore(app);
    //         const colRef = collection(db, 'users');
    //         const userId = userCredential.user.uid;
    //         const userDocRef = doc(colRef, userId);

    //         await setDoc(userDocRef, { displayName: userCredential.user.displayName }, { merge: true });

    //         // Google Analytics
    //         logEvent(analytics, 'signed_up', {
    //           method: 'facebook',
    //         });
    //         router.push('/onboarding/birthday');
    //       } else {
    //         logEvent(analytics, 'user_logged_in', { method: 'facebook' }); // Google Analytics
    //         router.push('/dashboard');
    //       }
    //     } catch (error: any) {
    //       let errorCode = error.code;
    //       if (errorCode == 'auth/popup-closed-by-user') {
    //         toast.error('Popup was closed by user', {
    //           position: 'bottom-right',
    //           ariaProps: { role: 'status', 'aria-live': 'polite' },
    //         });
    //       } else {
    //         toast.error(error.message);
    //       }
    //     }
    //   }
    async function signInWithFacebook() {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const additionalUserInfo = getAdditionalUserInfo(userCredential);
            console.log(userCredential, "additionalUserInfo", additionalUserInfo);

            const db = getFirestore(app);
            const colRef = collection(db, 'users');
            const userId = userCredential.user.uid;
            const userDocRef = doc(colRef, userId);
            
            let userInfo = {
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                imageUrl: "",
            };

            if (additionalUserInfo?.profile) {
                userInfo = { ...additionalUserInfo.profile, ...userInfo }
                if (additionalUserInfo.profile?.picture) {
                    userInfo.imageUrl = `${additionalUserInfo.profile.picture}`;
                    delete (userInfo as any).picture;
                }
            }

            if (additionalUserInfo?.isNewUser) {
                await setDoc(userDocRef, userInfo, { merge: true });

                // Google Analytics
                logEvent(analytics, 'signed_up', {
                    method: 'facebook',
                });
                router.push('/onboarding/birthday');
            } else {
                await updateDoc(userDocRef, userInfo);

                // Google Analytics
                logEvent(analytics, 'user_logged_in', { method: 'facebook' });
                router.push('/dashboard');
            }
        } catch (error: any) {
            let errorCode = error.code;
            if (errorCode == 'auth/popup-closed-by-user') {
                toast.error('Popup was closed by user', {
                    position: 'bottom-right',
                    ariaProps: { role: 'status', 'aria-live': 'polite' },
                });
            } else {
                toast.error(error.message);
            }
        }
    }
    return (
        <button
            onClick={signInWithFacebook}
            className='flex h-12 w-64 items-center justify-center gap-[10px] rounded-lg border-2 border-solid border-high-emphasis'
        >
            <FacebookIcon />
            Continue with Facebook
        </button>
    );
};
