import React, { useState, useEffect } from "react";
import { AutoCompleteProps } from "../types";

const AutoComplete = <T,>({ items, onSelect, getItemLabel, placeholder = "Search..." }: AutoCompleteProps<T>) => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => getItemLabel(item).toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, items, getItemLabel]);

  const handleSelect = (item: T) => {
    if (!selectedItems.includes(item)) {
      const updatedItems = [...selectedItems, item];
      setSelectedItems(updatedItems);
      onSelect(updatedItems);
    }
    setQuery("");
  };

  const handleRemove = (item: T) => {
    const updatedItems = selectedItems.filter((selected) => selected !== item);
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };

  return (
    <div className="autocomplete-container">
      <div className="selected-items">
        {selectedItems.map((item) => (
          <span key={getItemLabel(item)} className="selected-item">
            {getItemLabel(item)} <button className="autocomplete-x" onClick={() => handleRemove(item)}>×</button>
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-field"
      />

      {query && (
        <ul className="autocomplete-list">
          {filteredItems.map((item) => (
            <li key={getItemLabel(item)} onClick={() => handleSelect(item)}>
              {getItemLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
