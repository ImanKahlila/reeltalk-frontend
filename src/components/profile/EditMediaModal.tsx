import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';
import { setProfile } from '@/services/api';
import { fetchUserProfile } from '@/redux/userActions';
import { AppDispatch } from '@/redux/store';
import Header from '@/components/onboarding/shared/Header';
import useMediaSelection, { FloaterSelection } from '@/hooks/useMediaSelection';
import MediaSelection from '@/components/onboarding/shared/MediaSelection';
import { MediaTypes } from '@/components/commonInterfaces';

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  type: MediaTypes;
}

const EditMediaModal: React.FC<ModalProps> = ({ showModal, setShowModal ,type}) => {
  const dispatch: AppDispatch = useDispatch();
  const { idToken } = useUserContext();
  const userInfo = useSelector(selectUser);
  const [isChanged, setIsChanged] = useState(false);

  const {  floaterSelection, addSelectionHandler, removeSelectionHandler, setInitialSelections } =
    useMediaSelection(type);
  const isMovies=type===MediaTypes.MOVIES
  const initialData= isMovies?userInfo?.favoriteMovies:userInfo?.favoriteShows
  useEffect(() => {
    // Initialize floaterSelection with favoriteMovies if available
    if (userInfo?.favoriteMovies) {
      setInitialSelections(initialData);
    }
  }, []);

  async function handleChange() {
    const data= isMovies?{ favoriteMovies: floaterSelection }:{ favoriteShows: floaterSelection }
        await setProfile(data, idToken);
    if (userInfo?.uid) dispatch(fetchUserProfile(userInfo?.uid, idToken));
    setShowModal(false);
  }

  useEffect(() => {
    const hasChanged = floaterSelection.length !== initialData.length ||
      floaterSelection.some((movie, index) => movie.id !== initialData[index]?.id);
    setIsChanged(hasChanged);
  }, [floaterSelection]);


  // Placeholder tracker, tracks how many placeholders needed for selectionFloater
  const selectionPlaceholder: FloaterSelection = Array.from(
    { length: 5 - floaterSelection.length },
    (_, i) => ({
      id: i.toString(),
      title: '',
      poster: '',
      isApi: false,
    }),
  );
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="w-11/12 md:w-3/4 lg:w-3/5 mx-auto border-0 rounded-lg relative flex flex-col bg-third-surface p-6 justify-between items-center">
          <button
            className="absolute top-0 right-0 mt-2 mr-6 text-medium-emphasis text-2xl"
            onClick={() => setShowModal(false)}
          >
            x
          </button>
          <Header
            titleType={type}
            addSelectionHandler={addSelectionHandler}
            removeSelectionHandler={removeSelectionHandler}
            floaterSelection={floaterSelection}
            selectedLength={floaterSelection.length}
          />
          <div className="m-2 mt-4 bg-third-surface w-full p-4">
            <div className="flex flex-col gap-6">
              <h2 className="mx-auto font-semibold tracking-[0.08px] text-high-emphasis md:text-start md:text-xl md:font-medium md:tracking-[0.1px]">
                Your top 5 selections
              </h2>
              <div className="mx-auto mt-2 flex justify-between gap-3">
                {floaterSelection.map(media => (
                  <MediaSelection
                    key={media.id}
                    id={media.id}
                    poster={media.poster}
                    removeSelectionHandler={removeSelectionHandler}
                    isApi={media.isApi}
                  />
                ))}
                {selectionPlaceholder.map(media => (
                  <MediaSelection key={media.id} poster={''}
                                  isApi={media.isApi} />
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-1/3 m-6 px-3 py-2 rounded-md text-black ${isChanged ? 'bg-primary' : 'bg-gray cursor-not-allowed'}`}
            disabled={!isChanged}
            onClick={handleChange}
          >
            Done
          </button>
        </div>
      </div>
      {showModal &&
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
    </>
  );
};

export default EditMediaModal;
