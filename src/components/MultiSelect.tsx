import React, { ChangeEvent, useState } from "react"
import { MultiSelectProps } from "../types"

const MultiSelect: React.FC<MultiSelectProps> = ({ onSelect, inputType, inputLength, placeholder = "Enter items..." }) => {
  const [query, setQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  //validation
  const numbersRegex = /[^0-9]/g
  const disabled = inputType === 'zipcode'

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(numbersRegex, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, inputLength); // Limit to 5 characters
    setQuery(truncatedValue);
  }

  const handleAddItem = () => {
    if (query.trim() && !selectedItems.includes(query.trim())) {
      const updatedItems = [...selectedItems, query.trim()]
      setSelectedItems(updatedItems)
      onSelect(updatedItems)
      setQuery("")
    }
  }

  const handleRemove = (item: string) => {
    const updatedItems = selectedItems.filter((selected) => selected !== item)
    setSelectedItems(updatedItems)
    onSelect(updatedItems)
  }

  return (
    <div className="multi-select-container">
      <div className="selected-items">
        {selectedItems.map((item) => (
          <span key={item} className="selected-item">
            {item} <button onClick={() => handleRemove(item)}>×</button>
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="search-field"
        onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
      />
      {/* <button disabled={disabled} onClick={handleAddItem} className="plus-button">Add</button> */}
    </div>
  )
}

export default MultiSelect
