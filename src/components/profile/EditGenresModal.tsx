import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context';
import Genres from '@/components/onboarding/top-genres/Genres';
import {
  useGetGenres
} from '@/components/onboarding/top-genres/TopGenres.hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';
import { getGenres, setProfile } from '@/services/api';
import { fetchUserProfile } from '@/redux/userActions';
import { AppDispatch } from '@/redux/store';

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
interface Genre {
  name: string;
  id: string;
  emoji: string;
}
type GenreArray = Genre[];


const EditGenreModal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const userInfo = useSelector(selectUser);
  const [initialGenres, setGenres] = useState([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { idToken } = useUserContext();

  const { top3Genres,filteredGenres, totalSelected, toggleSelectedGenre } =
    useGetGenres(initialGenres,userInfo?.favoriteGenres);

  const arraysHaveSameIds = (arr1: GenreArray, arr2: GenreArray): boolean => {
    const getIds = (arr: GenreArray) => arr.map((genre) => genre.id).sort();
    return JSON.stringify(getIds(arr1)) === JSON.stringify(getIds(arr2));
  };

  useEffect(() => {
    if (!arraysHaveSameIds(userInfo?.favoriteGenres || [], top3Genres)) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [filteredGenres, userInfo?.favoriteGenres, top3Genres]);
  useEffect(() => {
    const fetchPossibleGenres = async () => {
        setGenres(await getGenres(idToken));
    };
    fetchPossibleGenres();
  }, []);

  const handleChange=async () => {
    await setProfile({ favoriteGenres: top3Genres },idToken)
    if (userInfo?.uid)
      dispatch(fetchUserProfile(userInfo?.uid, idToken));
      }
  if (!showModal) return null;

  return (
    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative mx-auto max-w-4xl">
            <div
              className="border-0 rounded-lg relative flex flex-col bg-second-surface justify-between items-center ">
              <div className="flex flex-row mt-4 mb-4">
                <h1
                  className="mx-4 p-4 text-center text-2xl text-medium-emphasis">Edit
                  your top 3 genres</h1>
                <button
                  className="absolute top-0 right-0 mt-2 mr-2 text-medium-emphasis text-2xl"
                  onClick={() => setShowModal(false)}
                >
                  x
                </button>
              </div>
              <div
                className="bg-gray overflow-y-auto max-h-[54vh] max-w-full mx-10">
                <Genres
                  filteredGenres={filteredGenres}
                  toggleSelectedGenre={toggleSelectedGenre}
                  totalSelected={totalSelected}
                  isModalView={true}
                />
              </div>
              <button
                type="submit"
                className={`w-1/3 m-6 px-3 py-2 rounded-md text-white ${isChanged ? 'bg-primary' : 'bg-gray cursor-not-allowed'}`}
                disabled={!isChanged}
                onClick={handleChange}
              >Done</button>
            </div>
          </div>
        </div>
      {showModal &&
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
    </>
);
};

export default EditGenreModal;
