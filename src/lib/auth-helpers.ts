import { UserCredential, updateProfile } from 'firebase/auth';
import { DocumentData, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
import { NextRouter } from 'next/router';
import toast from 'react-hot-toast';
import { CustomAppleUserCredential } from '@/components/onboarding/shared/SignInWithApple';

// Google Analytics
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase/firebase-config';

export async function handleNewUser(
  userCredential: UserCredential,
  userDocRef: DocumentReference,
  push: NextRouter['push'],
  method: 'google' | 'email' | 'apple',
  responseToken?: CustomAppleUserCredential['_tokenResponse'],
) {
  let displayName;

  switch (method) {
    case 'email':
      displayName = userCredential.user.email?.split('@')[0];
      break;
    case 'google':
      displayName = userCredential.user.displayName;
      break;
    case 'apple':
      displayName = responseToken?.displayName;
      break;
    default:
      break;
  }

  // Email and apple auth profile displayName needs to be explicitly set
  if (method === 'apple' || method === 'email')
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });

  await setDoc(userDocRef, { displayName: displayName }, { merge: true });
  logEvent(analytics, 'signed_up', {
    method: method,
  });
  push('/onboarding/birthday');
}

export async function handleExistingUser(
  userDocRef: DocumentReference,
  push: NextRouter['push'],
  method: 'google' | 'email' | 'apple',
) {
  logEvent(analytics, 'user_logged_in', { method: method });
  const userData = (await getDoc(userDocRef)).data();
  if (!userData) {
    push('/login');
    return;
  }
  verifyOnboardingComplete(userData, push);
}

function verifyOnboardingComplete(userData: DocumentData, push: NextRouter['push']) {
  // Redirect to unfinished onboarding step as long as the user hasn't agreed to the guideline
  if (!userData['agreedToGuideline']) {
    if (!userData['birthday']) {
      push('/onboarding/birthday');
    } else if (!userData['topGenres']) {
      push('/onboarding/top-genres');
    } else if (!userData['top5Movies']) {
      push('/onboarding/top-movies');
    } else if (!userData['top5Shows']) {
      push('/onboarding/top-shows');
    } else {
      push('/onboarding/guideline-agreement');
    }
  } else {
    push('/community');
  }
}

export function handleSignInError(error: any) {
  if (error.code === 'auth/popup-closed-by-user') {
    toast.error('Popup was closed by user', {
      position: 'bottom-right',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
  } else {
    toast.error(error.message);
  }
}
