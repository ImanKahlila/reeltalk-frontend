import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

//ensures the emoji picker is only rendered client side
const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false },
);

interface EmojiPicker {
  setEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  textInputRef: React.MutableRefObject<HTMLTextAreaElement>;
}

export default function EmojiPicker({ setEmojiPickerOpen, textInputRef }: EmojiPicker) {
  const handleOnEmojiClick = (e: EmojiClickData) => {
    setEmojiPickerOpen(false);
    textInputRef.current.value += e.emoji;
  };

  //Click anywhere outside the popup to close
  useEffect(() => {
    function handleEmojiClose(e: MouseEvent) {
      const target = e.target as Element;
      if (target.closest('.emoji-button') || target.closest('.emoji-picker')) return;
      setEmojiPickerOpen(false);
    }
    window.addEventListener('click', handleEmojiClose);
    return () => window.removeEventListener('click', handleEmojiClose);
  }, []);

  return (
    <Picker
      className='emoji-picker'
      previewConfig={{ showPreview: false }}
      skinTonesDisabled
      onEmojiClick={handleOnEmojiClick}
      emojiVersion={'1.0'}
      emojiStyle={EmojiStyle.NATIVE}
    />
  );
}
