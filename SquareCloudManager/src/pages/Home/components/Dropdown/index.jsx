import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import "./dropdown.scss";

function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        onClick={toggleDropdown}
        className={`dropdown-button ${isOpen ? "active" : ""}`}
      >
        {title}
        <RiArrowDropDownLine size={30} className="custom-icon" />
      </button>
      {isOpen && (
        <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
