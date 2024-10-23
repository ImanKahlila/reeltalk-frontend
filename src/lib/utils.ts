import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string | null): string {
  if (!name) {
    return 'User';
  }

  const firstName = name.split(' ')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

export const formatTimeAgo = (createAt:any) => {
  // Convert createAt to a Date object
  const dateObject = new Date(createAt?._seconds * 1000 + createAt?._nanoseconds / 1000000);
  const isDateValid = !isNaN(dateObject.getTime());

  if (isDateValid) {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - dateObject.getTime();

    let formattedDate;

    if (timeDifference < 60000) { // Less than a minute
      formattedDate = `${Math.floor(timeDifference / 1000)}s ago`;
    } else if (timeDifference < 3600000) { // Less than an hour
      formattedDate = `${Math.floor(timeDifference / 60000)}m ago`;
    } else if (timeDifference < 86400000) { // Less than a day
      formattedDate = `${Math.floor(timeDifference / 3600000)}h ago`;
    } else if (timeDifference < 2592000000) { // Less than a month (30 days)
      formattedDate = `${Math.floor(timeDifference / 86400000)}d ago`;
    } else if (timeDifference < 31536000000) { // Less than a year (365 days)
      const months = Math.floor(timeDifference / 2592000000);
      formattedDate = `${months === 1 ? '1 month' : `${months} months`} ago`;
    } else { // More than a year
      formattedDate = `${Math.floor(timeDifference / 31536000000)}y ago`;
    }

    return formattedDate;
  } else {
    return 'Invalid date';
  }
};


