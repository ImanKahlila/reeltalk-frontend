import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';
import { PLATINUM, PREMIERE } from '@/components/profile/Constants';

export const useUserInfo = () => {
  const userInfo = useSelector(selectUser);
  return {
    imageUrl: userInfo?.imageUrl,
    badge: userInfo?.badge,
    displayName: userInfo?.displayName,
    premiumStatus: userInfo?.premiumStatus,
    gems: userInfo?.gems,
    isBadgeAllowed: userInfo?.premiumStatus === PREMIERE || userInfo?.premiumStatus === PLATINUM
  };
};