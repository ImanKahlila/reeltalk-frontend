import Image from 'next/image';
import MinusIcon from '../../Icons/MinusIcon';

//reducer function for adding/removing images
export type ImageAction = { payload: string } & ({ type: 'add' } | { type: 'remove' });
export type ImageState = string[];
export const imagesReducer = (state: ImageState, action: ImageAction): ImageState => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(e => e !== action.payload);
    default:
      return state;
  }
};

type ImagesUploadDisplay = React.HTMLAttributes<HTMLDivElement> & {
  images: ImageState;
  dispatch: React.Dispatch<ImageAction>;
};

export default function ImagesUploadDisplay({ images, dispatch, ...props }: ImagesUploadDisplay) {
  return (
    <div {...props}>
      {images.map((src, i) => {
        return (
          <div key={i} className='discussions-user-image-upload relative h-[10rem]'>
            <MinusIcon
              onClick={() => dispatch({ type: 'remove', payload: src })}
              className='absolute right-[-6px] top-[-6px] cursor-pointer'
            />
            {/* <img src={src} alt='user uploaded image' className='h-full object-contain' /> */}
            <Image src={src} alt='user uploaded image' className='h-full object-contain' />
          </div>
        );
      })}
    </div>
  );
}
