import EmoteIcon from '@/components/Icons/EmoteIcon';
import GifIcon from '@/components/Icons/GifIcon';
import ImageIcon from '@/components/Icons/ImageIcon';
import { ImageAction } from './ImagesUploadDisplay';

interface AddMediaButtons {
  emojiPickerOpen: boolean;
  setEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<ImageAction>;
}

export default function AddMediaButtions({
  setEmojiPickerOpen,
  emojiPickerOpen,
  dispatch,
}: AddMediaButtons) {

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files!.length === 0) return;
    dispatch({ type: 'add', payload: URL.createObjectURL(e.target.files![0]) });
    e.target.value = ""
  };

  return (
    <div className='relative flex h-full grow items-center gap-4'>
      <label htmlFor='discussions-image-upload'>
        <ImageIcon className='cursor-pointer' />
      </label>
      <input
        type='file'
        accept='.png, .jpeg, .jpg'
        id='discussions-image-upload'
        name='image upload'
        className='hidden'
        onChange={handleFileUpload}
      />
      <label htmlFor='discussions-gif-upload'>
        <GifIcon className='cursor-pointer' />
      </label>
      <input
        type='file'
        accept='.gif'
        id='discussions-gif-upload'
        name='gif upload'
        className='hidden'
        onChange={handleFileUpload}
      />
      <EmoteIcon
        className='emoji-button cursor-pointer'
        onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
      />
    </div>
  );
}
