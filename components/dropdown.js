import React, { useState } from 'react';
import './Dropdown.css'; // Import your CSS file for styling

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Filter
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div className="vertical-items">
            <p>Filter 1</p>
            <p>Filter 2</p>
            <p>Filter 3</p>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Dropdown;
