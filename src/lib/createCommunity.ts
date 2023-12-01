import axios from 'axios';
import { User } from 'firebase/auth';
const API_URL = 'http://localhost:8080/communities';

import toast from 'react-hot-toast';

import { IRelatedTitlesSelection } from '@/pages/community/create-community';
import { NextRouter } from 'next/router';

interface ICreateCommunityParams {
  user: User | null;
  nameValue: string;
  descriptionValue: string;
  rulesValue: string;
  communityType: string;
  relatedTitlesSelection: IRelatedTitlesSelection['relatedTitles'];
  tags: string[];
  coverImage: File | null | undefined;
  communityImage: File | null | undefined;
  router: NextRouter;
}

const createCommunity = async ({
  user,
  nameValue,
  descriptionValue,
  rulesValue,
  communityType,
  relatedTitlesSelection,
  tags,
  coverImage,
  communityImage,
  router,
}: ICreateCommunityParams): Promise<void> => {
  if (!user) return;

  try {
    const data = {
      name: nameValue,
      description: descriptionValue,
      rules: rulesValue,
      isPublic: communityType === 'public',
      content: relatedTitlesSelection,
      tags: tags,
      userId: user.uid,
    };
    const formData = new FormData();
    formData.append('coverPhoto', coverImage as Blob); // Add images to FormData instance
    formData.append('image', communityImage as Blob);

    // map data to FormData instance
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
    });

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    const communityId = response.data.communityId;

    setTimeout(() => {
      router.push(`/community/${communityId}`);
    }, 200);
  } catch (error: any) {
    toast.error(error.message);
  }
};

export default createCommunity;
