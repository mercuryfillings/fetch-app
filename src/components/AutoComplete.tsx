import React, { useState } from "react"
import { BreedSearchProps } from "../types"

const AutoComplete: React.FC<BreedSearchProps> = ({ breeds, onSelectBreeds }) => {
  const [query, setQuery] = useState("")
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>(breeds)
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    setFilteredBreeds(
      breeds.filter((breed) => breed.toLowerCase().includes(value.toLowerCase()))
    )
  }

  const handleSelect = (breed: string) => {
    if (!selectedBreeds.includes(breed)) {
      const updatedBreeds = [...selectedBreeds, breed]
      setSelectedBreeds(updatedBreeds)
      onSelectBreeds(updatedBreeds)
    }
    setQuery("")
  }

  const handleRemove = (breed: string) => {
    const updatedBreeds = selectedBreeds.filter((b) => b !== breed)
    setSelectedBreeds(updatedBreeds)
    onSelectBreeds(updatedBreeds)
  }

  return (
    <div className="autocomplete-container">
      <div className="selected-breeds">
        {selectedBreeds.map((breed) => (
          <span key={breed} className="selected-breed">
            {breed} <button onClick={() => handleRemove(breed)}>×</button>
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search breeds..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />

      {query && (
        <ul className="autocomplete-list">
          {filteredBreeds.map((breed) => (
            <li key={breed} onClick={() => handleSelect(breed)}>
              {breed}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AutoComplete
