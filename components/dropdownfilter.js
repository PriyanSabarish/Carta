// DropdownFilter.js
import React, { useState } from 'react';
import './dropdown-fil.css';

const DropdownFilter = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      onSelect(selectedValue);
    };
  
    return (
      <div className="dropdown">
        <div className="select-wrapper">
          <select id="filterDropdown" value={selectedOption} onChange={handleSelectChange}>
            <option value="">All</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default DropdownFilter;