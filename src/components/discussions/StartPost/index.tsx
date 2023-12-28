import { useState, useRef, useEffect, useReducer } from 'react';
import EmojiPicker from './EmojiPicker';
import AddMediaButtions from './AddMediaButtons';
import ImagesUploadDisplay, { ImageState, imagesReducer } from './ImagesUploadDisplay';
import HeaderCommunitySelect from './HeaderCommunitySelect';

export default function StartPost() {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const textInputRef = useRef<HTMLTextAreaElement>(null!);
  const [images, dispatch] = useReducer(imagesReducer, []);

  //Click anywhere outside the text box to collapse (if nothing is typed)
  const inputFocus = useFocusStartPost(textInputRef, images);

  //resize the textarea to fit content (span workaround)
  //https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
  const spanRef = useRef<HTMLSpanElement>(null!);
  const [text, setText] = useState('');

  return (
    <>
      <div
        className={`${
          inputFocus ? 'h-[16rem] bg-second-surface' : 'h-[6.5rem] bg-first-surface'
        } start-post-container relative flex w-full flex-col overflow-hidden rounded-lg border-[1px] border-medium-emphasis transition-all`}
      >
        <HeaderCommunitySelect
          className={`${
            inputFocus ? 'min-h-[3.875rem] opacity-100' : 'h-0 min-h-0 opacity-0'
          } header-community-select flex w-full items-center pl-4 pr-2 transition-all`}
        />
        <div
          className={`${
            inputFocus ? 'overflow-x-hidden overflow-y-scroll' : 'overflow-hidden'
          } relative mb-[3.125rem] grow`}
        >
          <textarea
            className='w-full resize-none overflow-hidden bg-transparent px-4 pt-3 text-high-emphasis outline-none placeholder:text-disabled'
            placeholder='Start a post'
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
          <button className='h-[2.125rem] w-16 rounded bg-primary font-bold text-secondary'>
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



function useFocusStartPost(
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
        target.classList.contains("ignore-collapse") ||
        images.length > 0;
      setInputFocus(isFocused);
    }
    window.addEventListener('click', handleTextExpand);
    return () => window.removeEventListener('click', handleTextExpand);
  }, [images]);

  return inputFocus;
}
