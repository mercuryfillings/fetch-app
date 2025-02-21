import { useState, useEffect, useCallback, FormEvent } from 'react'
import { fetchBreeds, fetchContentByBreed } from '../helpers'
import { SearchProps } from '../types'
import AutoComplete from './Autocomplete'




const Search: React.FC<SearchProps> = (props) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [breeds, setBreeds] = useState<string[]>([])
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
    const [returnedBreedIds, setReturnedBreedIds] = useState<string[]>([])

    const { updateDogIds } = props



    const handleClick = async () => {
        if (selectedBreeds.length === 0) {
          console.warn("No breeds selected");
          return;
        }
      
        await fetchContentByBreed(selectedBreeds, setReturnedBreedIds);
      
      };

    const fetchBreedsCallback = useCallback(() => {
      fetchBreeds(setBreeds, setLoading);
    }, []);

    useEffect(() => {
        fetchBreedsCallback()
  }, [setBreeds, setLoading, fetchBreedsCallback])

  useEffect(() => {
    if (returnedBreedIds.length > 0) {
      updateDogIds(returnedBreedIds);
    }
  }, [returnedBreedIds, updateDogIds]);

    
  return (
    loading ? 
    <p>loading</p>
    :
    <div className="search-container">
        <h2 className="search-headline">Find a Dog for Adoption</h2>
        <div className="search-interface-container">
            <AutoComplete breeds={breeds} onSelectBreeds={setSelectedBreeds} />
            <button className="form-button" onClick={handleClick}>Search</button>
        </div>
    </div>
  )
}

export default Search