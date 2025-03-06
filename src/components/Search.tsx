import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react'
import { fetchOptions, fetchContent } from '../helpers'
import { SearchProps } from '../types'
import AutoComplete from './AutoComplete'

const Search: React.FC<SearchProps> = ({ 
    updateDogIds, 
    setTotalResults, 
    setNext, 
    returnedBreedIds, 
    setReturnedBreedIds, 
    setNumberOfResults
}) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [breeds, setBreeds] = useState<string[]>([])
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
    const [formData, setFormData] = useState({zipCode: '', numResults: '', minAge: '', maxAge: '', sortBy: ''})

    const { zipCode, numResults, minAge, maxAge, sortBy } = formData

    const numbersRegex = /[^0-9]/g

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const numericValue = value.replace(numbersRegex, '')
        const truncatedValue = name === 'zipCode' ? numericValue.slice(0, 5) : numericValue.slice(0,2)
        setFormData(prevData => ({
            ...prevData,
            [name]: truncatedValue.toString()
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await fetchContent(
            selectedBreeds, 
            zipCode, 
            numResults, 
            minAge, 
            maxAge, 
            sortBy, 
            setReturnedBreedIds, 
            setTotalResults, 
            setNext,
            setNumberOfResults)
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setFormData((prevData) => ({
          ...prevData,
          sortBy: value,
        }))
    }

    const fetchBreedsCallback = useCallback(() => {
        fetchOptions('breeds', setBreeds, setLoading)
    }, [])

    useEffect(() => {
        fetchBreedsCallback()
    }, [setBreeds, setLoading, fetchBreedsCallback])

    useEffect(() => {
        if (returnedBreedIds.length > 0) {
            updateDogIds(returnedBreedIds)
        }
    }, [returnedBreedIds, updateDogIds])

    if (loading) {
        return <p>loading</p>
    }
    return (
        <div className="search-container">
            <div className="search-interface-container">
                <form onSubmit={handleSubmit}>
                    <AutoComplete items={breeds} getItemLabel={(item) => item} onSelect={setSelectedBreeds} placeholder="Search by Breeds" />
                    <input 
                        name="zipCode"
                        value={formData.zipCode || ''}
                        onChange={handleChange} 
                        className="search-field" 
                        placeholder="Zip Code" />
                    <input 
                        name="numResults"
                        value={formData.numResults || ''}
                        onChange={handleChange}
                        className="search-field" 
                        placeholder="Results per page (up to 99)" 
                    />
                    <input 
                        name="minAge"
                        value={formData.minAge || ''}
                        onChange={handleChange} 
                        className="search-field" 
                        placeholder="Minimum Age" />
                    <input 
                        name="maxAge"
                        value={formData.maxAge || ''}
                        onChange={handleChange} 
                        className="search-field" 
                        placeholder="Maximum Age" />
                    <select className="search-field" id="sort" value={formData.sortBy} onChange={handleSelect}>
                        <option value="">Sort By (optional)</option>
                        <option value="breed:asc">Sort Ascending by Breed</option>
                        <option value="breed:desc">Sort Descending by Breed</option>
                        <option value="age:asc">Sort Ascending by Age</option>
                        <option value="age:desc">Sort Descending by Age</option>
                    </select>
                    <button className="form-button">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Search