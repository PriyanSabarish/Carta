// SearchComponent.js
import React, { useState } from 'react';
import './search_comp.css'
const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search">
     
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search articles"
      />
      <button className="search-button" onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchComponent;