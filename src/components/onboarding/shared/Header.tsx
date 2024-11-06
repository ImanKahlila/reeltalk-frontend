

import { FloaterSelection } from '@/hooks/useMediaSelection';
import { MediaTypes } from '@/components/commonInterfaces';
import SearchComboBox from '@/components/onboarding/shared/SearchComboBox';

interface HeaderProps {
  addSelectionHandler: (
    id: string,
    title: string,
    poster: string,
    isApi: boolean,
    newVal?: boolean,
  ) => void;
  selectedLength: number;
  removeSelectionHandler: (id: string, newVal: boolean, isApi: boolean) => void;
  floaterSelection: FloaterSelection;
  titleType: MediaTypes | null; // passing null will return movies and tvSeries
}

const Header = ({ addSelectionHandler, selectedLength, titleType, floaterSelection, removeSelectionHandler }: HeaderProps) => {

  return (
    <header className='mx-auto mt-1 max-w-[600px] px-4 text-center'>
      <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
        {`Select your top 5 ${titleType === 'movie' ? 'movies' : 'shows'}`}
      </h1>
      <p className='mt-2 text-base tracking-[0.08px] text-high-emphasis'>
        {`Selecting your top 5 ${
          titleType === 'movie' ? 'movies' : 'TV-shows'
        } will enable us to suggest like-minded users and nearby
        communities for exciting watch parties and movie premiere gatherings.`}
      </p>

      {/* SEARCH COMBOBOX */}
      <SearchComboBox titleType={titleType} floaterSelection={floaterSelection} addSelectionHandler={addSelectionHandler} removeSelectionHandler={removeSelectionHandler} selectedLength={selectedLength}/>
    </header>
  );
};

export default Header;
