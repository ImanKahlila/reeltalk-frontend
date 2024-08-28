import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';

export const useUserInfo = () => {
  const userInfo = useSelector(selectUser);
  return {
    imageUrl: userInfo?.imageUrl,
    badge: userInfo?.badge,
    displayName: userInfo?.displayName,
    premiumStatus: userInfo?.premiumStatus,
    gems: userInfo?.gems,
  };
};