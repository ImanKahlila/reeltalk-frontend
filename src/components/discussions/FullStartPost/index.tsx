import { useState, useRef, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import Image from 'next/image';
import ImagesUploadDisplay, { ImageState, imagesReducer } from '../StartPost/ImagesUploadDisplay';
import AddMediaButtions from '../StartPost/AddMediaButtons';
import EmojiPicker from '../StartPost/EmojiPicker';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// // Discussion interface
// interface Comment {
//   userId: string;
//   comment: string;
//   replies: string[]
//   likes: string[];
//   discussionBelonged: any;
//   createdAt: Date;
//   taggedUsers: string[];
//   discussionId?: string;
//   replyTo: any
// //   content: string;
// }

// Discussion interface
interface Comment {
  uid: string;
  comment: string;
  taggedUsers: string[];
}

interface FullPostProps {
  discussionId: string;
  communityBelonged: string;
}

export default function FullStartPost({ discussionId, communityBelonged }: FullPostProps) {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const textInputRef = useRef<HTMLTextAreaElement>(null!);
  const [images, dispatch] = useReducer(imagesReducer, []);
  const spanRef = useRef<HTMLSpanElement>(null!);
  const [text, setText] = useState('');
  const { user, idToken } = useUserContext();
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

  const inputFocus = useFocusFullStartPost(textInputRef, images);

  const router = useRouter();

  const postComment = async () => {
    try {
      const commentData: Comment = {
        uid: user?.uid || '',
        comment: text,
        taggedUsers: [],
      };

      const response = await axios.post(
        `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityBelonged}/discussions/${discussionId}/comments`,
        // `http://localhost:8080/communities/${communityBelonged}/discussions/${discussionId}/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      console.log('Comment created:', response.data);
      toast.success('Comment Posted');

      setText('');
    } catch (error) {
      console.error('Error creating comment:', error);
      toast.error(`Error commenting`);
    }
  };

  return (
    <>
      <div
        className={`${
          inputFocus ? 'h-[16rem] bg-second-surface' : 'h-[6.5rem] bg-first-surface'
        } start-post-container relative flex w-full flex-col overflow-hidden rounded-lg border-[1px] border-medium-emphasis transition-all`}
      >
        <div
          className={`${
            inputFocus ? 'overflow-x-hidden overflow-y-scroll' : 'overflow-hidden'
          } relative mb-[3.125rem] grow`}
        >
          <textarea
            className='w-full resize-none overflow-hidden bg-transparent px-4 pt-3 text-high-emphasis outline-none placeholder:text-disabled'
            placeholder='What are your thoughts?'
            ref={textInputRef}
            onChange={e => setText(e.target.value)}
            style={{ height: spanRef.current?.offsetHeight + 'px' }}
          />
          <span
            ref={spanRef}
            className='absolute min-h-[4rem] w-full whitespace-pre-wrap break-words px-4 pt-3'
          >
            {text}
          </span>
          <ImagesUploadDisplay
            images={images}
            dispatch={dispatch}
            className={`${inputFocus ? 'block' : 'hidden'} my-2 flex w-full gap-4 px-4`}
          />
        </div>
        <div className='absolute bottom-0 flex h-[3.125rem] w-full items-center border-t-[1px] border-disabled px-4'>
          <AddMediaButtions
            setEmojiPickerOpen={setEmojiPickerOpen}
            emojiPickerOpen={emojiPickerOpen}
            dispatch={dispatch}
          />
          <button
            onClick={postComment}
            className='h-[2.125rem] w-16 rounded bg-primary font-bold text-secondary'
          >
            Post
          </button>
        </div>
      </div>
      <div className={`absolute top-[7rem] z-10 ${emojiPickerOpen ? 'block' : 'hidden'}`}>
        <EmojiPicker setEmojiPickerOpen={setEmojiPickerOpen} textInputRef={textInputRef} />
      </div>
    </>
  );
}

function useFocusFullStartPost(
  textInputRef: React.MutableRefObject<HTMLTextAreaElement>,
  images: ImageState,
) {
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    function handleTextExpand(e: MouseEvent) {
      const target = e.target as Element;
      const isFocused =
        !!target.closest('.start-post-container') ||
        textInputRef.current.value.length > 0 ||
        !!target.closest('.discussions-user-image-upload') ||
        target.classList.contains('ignore-collapse') ||
        images.length > 0;
      setInputFocus(isFocused);
    }
    window.addEventListener('click', handleTextExpand);
    return () => window.removeEventListener('click', handleTextExpand);
  }, [images, textInputRef]);

  return inputFocus;
}
