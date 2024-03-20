// DiscussionPage.tsx

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import StartPost from '@/components/discussions/StartPost';
import Post from '@/components/discussions/Post';
import Sidebar, { DiscussionsSearch } from '@/components/discussions/Sidebar';
import TabBar from '@/components/discussions/TabBar';
import ActiveDiscussion from '@/components/discussions/ActiveDiscussion';
import { useUserContext } from '@/lib/context';

//MY IMPORTS
import { useRouter } from 'next/router';

// Hooks
import {
  useCreateCommunity,
  useImageUpload,
  useRelatedMedia,
  useTags,
} from '@/components/community/create-community/CreateCommunity.hooks';

// Components
import CommunityImageUpload from '@/components/community/create-community/CommunityImageUpload';
import CommunityCoverUpload from '@/components/community/create-community/CommunityCoverUploads';
import CreateCommunityInputs from '@/components/community/create-community/CreateCommunityInputs';
import RelatedMediaSearchInput from '@/components/community/create-community/RelatedMediaSearchInput';
import RelatedMediaSelection from '@/components/community/create-community/RelatedMediaSelection';
import Tags from '@/components/community/create-community/Tags';
import Spinner from '@/components/shared/Spinner';

// Firebase
import { User } from 'firebase/auth';
//MY IMPORTS

interface Discussion {
  id: string;
//   content: string;
  userId: string;
  createAt: any; // Use 'any' for now; replace it with your specific type if needed
  likes: string[];
  comments: string[];
  communityBelonged: string;
  tagged: string[];
}

const DISCUSSIONS_TO_LOAD = 1;

export default function DiscussionPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [discussionsToDisplay, setDiscussionsToDisplay] = useState<Discussion[]>([]);
  const [loadCount, setLoadCount] = useState(0);
//   console.log(discussionsToDisplay)

  const { user, idToken } = useUserContext();

  //MY VARIABLES

  const initialFormState = {
    name: '',
    description: '',
    rules: '',
  };

  const {
    communityImage,
    setCommunityImage,
    communityImagePreview,
    coverImage,
    setCoverImage,
    coverImagePreview,
  } = useImageUpload();

  const {
    relatedTitlesSelection,
    selectionPlaceholder,
    addSelectionHandler,
    removeSelectionHandler,
  } = useRelatedMedia();

  const { tags, addTagHandler, removeTagHandler } = useTags();

  const [communityType, setCommunityType] = useState('public');
  function communityTypeChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCommunityType(e.target.value);
  }

  const [formValues, setFormValues] = useState(initialFormState);
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const router = useRouter();
  const [spinnerActive, setSpinnerActive] = useState(false);
  const CreateCommunityPage = async () => {
    setSpinnerActive(true);
    // Extracted request logic into seperate file
    await useCreateCommunity({
      user,
      nameValue: formValues.name,
      descriptionValue: formValues.description,
      rulesValue: formValues.rules,
      communityType,
      relatedTitlesSelection,
      tags,
      coverImage,
      communityImage,
      router,
    });

    setSpinnerActive(false);
  };

  const isValid =
    Object.values(formValues).every(value => value.trim() !== '') &&
    relatedTitlesSelection.length !== 0 &&
    communityImage instanceof File;
  //MY VARIABLES


  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get<Record<string, Discussion>>(
          'https://us-central1-reeltalk-app.cloudfunctions.net/backend/discussions/',
        //   'http://localhost:3000/discussions/',
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response.data)

        const discussionsArray = Object.values(response.data).map((discussionData: any) => {
          return {
            ...discussionData,
          };
        });

        setDiscussions(discussionsArray);
        setLoadCount(1);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    fetchDiscussions();
  }, [loadCount]);

  useEffect(() => {
    const startIndex = (loadCount - 1) * DISCUSSIONS_TO_LOAD;
    const endIndex = startIndex + DISCUSSIONS_TO_LOAD;

    setDiscussionsToDisplay((prevDiscussions) => [
      ...prevDiscussions,
      ...discussions.slice(startIndex, endIndex),
    ]);
  }, [loadCount, discussions]);

  const loadMoreDiscussions = () => {
    setLoadCount((prevCount) => prevCount + 1);
  };

  return (
//     <section className='my-[1.438rem] flex flex-col lg:flex-row justify-center lg:gap-8 gap-4 mx-4'>
//       <DiscussionsSearch className='relative lg:hidden flex h-[3.5rem] w-full items-center overflow-hidden rounded-lg bg-white/[0.02] px-6' />
//       <div className='flex flex-col gap-6 lg:w-[46rem]'>
//         <StartPost />
//         <TabBar />
//         {/* {discussionsToDisplay.map((discussion) => ( */}
//   <Post
//     // key={discussion.id}
//     // id={discussion.id}
//     // userId={discussion.userId}
//     // createAt={discussion.createAt}
//     // likes={discussion.likes}
//     // comments={discussion.comments}
//     // communityBelonged={discussion.communityBelonged}
//     // content={"In your opinion, what are the top 5 scenes of Suits?"}
//     // tagged={discussion.tagged}
//   />
// {/* ))} */}
//         {discussionsToDisplay.length < discussions.length && (
//           <button onClick={loadMoreDiscussions} className='text-primary'>
//             Load More
//           </button>
//         )}
//       </div>
//       {/* <Sidebar>
//         {discussionsToDisplay.map((discussion) => (
//           <ActiveDiscussion 
//             key={discussion.id} 
//             {...discussion} 
//             id={discussion.id}
//             comments={discussion.comments?.length}
//             communityBelonged={discussion.communityBelonged}
//             createAt={discussion.createAt}
//             likes={discussion.likes?.length}
//             tagged={discussion.tagged?.length}
//             content={"In your opinion, what are the top 5 scenes of Suits?"}
//           />
//         ))}
//       </Sidebar> */}
//       <Sidebar>
//          {/* SEARCH INPUT + COVER PHOTO + TAGS */}
//          <div className='max-w-[352px]'>
//           <div className='mb-8'>
//             <h2 className='mb-1 font-medium tracking-eight text-high-emphasis'>
//               Which movies/TV-shows is it about?
//             </h2>
//             <p className='mb-2 tracking-eight text-medium-emphasis'>
//               Attach a movie or TV show to make it easier for other users to discover and join your
//               community.
//             </p>

//             <RelatedMediaSearchInput
//               addSelectionHandler={addSelectionHandler}
//               selectedLength={relatedTitlesSelection.length}
//             />

//             <RelatedMediaSelection
//               relatedTitlesSelection={relatedTitlesSelection}
//               removeSelectionHandler={removeSelectionHandler}
//               selectionPlaceholder={selectionPlaceholder}
//             />
//           </div>

//           <CommunityCoverUpload
//             coverImagePreview={coverImagePreview}
//             setCoverImage={setCoverImage}
//           />

//           <Tags addTagHandler={addTagHandler} removeTagHandler={removeTagHandler} tags={tags} />
//         </div>
//       </Sidebar>
//       </section>
<>
Profile Page
</>
  );
}
