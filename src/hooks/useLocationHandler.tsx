import { useState } from 'react';
import useLocationSearch from '@/hooks/useLocationSearch';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';

const useLocationHandler = () => {
  const userInfo = useSelector(selectUser);
  const initialLocation=userInfo?.location;
  const [searchKey, setSearchKey] = useState<string>(initialLocation || '');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(initialLocation || '');
  const { locations, errorFetching, clearSuggestions } = useLocationSearch(searchKey);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchKey(value);
    setSelectedLocation(null); // Reset selected location when input changes
  };

  const handleLocationSelect = (location: string) => {
    setSearchKey(location);
    setSelectedLocation(location);
    clearSuggestions();
  };

  return {
    searchKey,
    selectedLocation,
    locations,
    errorFetching,
    handleInputChange,
    handleLocationSelect,
  };
};

export default useLocationHandler;
