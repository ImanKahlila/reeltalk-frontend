import { useState, useEffect } from 'react';

export const useImageUpload = () => {
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [communityImagePreview, setCommunityImagePreview] = useState('/Pixel-160.png');

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');

  useEffect(() => {
    if (communityImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCommunityImagePreview(reader.result as string);
      };
      reader.readAsDataURL(communityImage);
    } else {
      setCommunityImagePreview('/Pixel-160.png');
    }
  }, [communityImage]);

  useEffect(() => {
    if (coverImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(coverImage);
    } else {
      setCoverImagePreview('');
    }
  }, [coverImage]);

  return {
    communityImage,
    setCommunityImage,
    communityImagePreview,
    coverImage,
    setCoverImage,
    coverImagePreview,
  };
};

//
//
//
//
//
//
//
import axios from 'axios';
import { User } from 'firebase/auth';
// const API_URL = 'http://localhost:8080/communities';
const API_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities';

import toast from 'react-hot-toast';

export interface IRelatedTitlesSelection {
  relatedTitles: {
    id: string | number;
    title: string;
    poster: string;
    isApi: boolean;
  }[];
}

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

export const useCreateCommunity = async ({
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
    formData.append('communityImage', communityImage as Blob);

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

//
//
//
//
//
export const useTags = () => {
  // Tags logic
  const [tags, setTags] = useState<string[]>([]);
  function addTagHandler(query: string) {
    setTags(prev => {
      let newState = [...prev];
      newState.push(query);
      return newState;
    });
  }
  function removeTagHandler(index: number) {
    setTags(prev => {
      let newState = [...prev];
      newState.splice(index, 1);
      return newState;
    });
  }

  return { tags, addTagHandler, removeTagHandler };
};

//
//
//
//
//
export const useRelatedMedia = () => {
  const [relatedTitlesSelection, setRelatedTitlesSelection] = useState<
    IRelatedTitlesSelection['relatedTitles']
  >([]);

  // Placeholder tracker, tracks how many placeholders needed for relatedTitlesSelections
  const selectionPlaceholder: { id: number; title: string; poster: string }[] = [];
  for (let i = 0; i < 4 - relatedTitlesSelection?.length; i++) {
    selectionPlaceholder.push({ id: i, title: '', poster: '' });
  }

  // Function to add media selection
  function addSelectionHandler(id: string | number, title: string, poster: string, isApi: boolean) {
    const selected = { id, title, poster, isApi };
    setRelatedTitlesSelection(prev => {
      let newState = [...prev];
      let movieIndex = newState.findIndex(el => el.id === id);
      if (movieIndex > -1) return newState;
      newState.push(selected);
      return newState;
    });
  }

  // Function to remove media selection
  function removeSelectionHandler(id: number | string) {
    setRelatedTitlesSelection(prev => {
      let newState = [...prev];
      let output = newState.filter(element => element.id !== id);
      return output;
    });
  }

  return {
    relatedTitlesSelection,
    selectionPlaceholder,
    addSelectionHandler,
    removeSelectionHandler,
  };
};
