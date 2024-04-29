// Importing necessary modules from React library
import React, { useCallback } from "react";
import PropTypes from "prop-types"; // Importing PropTypes for type checking props
import { nanoid } from "nanoid"; // Importing nanoid for generating unique IDs

// Default text for different types of menu items
const defaultText = {
  label: "This is a label.",
  input: "Input Field",
  button: "Button",
};

// Icon for indicating draggable item
const DragIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="18"
    fill="currentColor"
    className="bi bi-six-dots"
    viewBox="0 0 16 16"
  >
    {/* Six dots icon */}
    <rect x="3" y="3" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="9" y="3" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="3" y="8" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="9" y="8" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="3" y="13" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="9" y="13" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
  </svg>
);

// MenuItem component representing each draggable menu item
const MenuItem = ({ type, setCurrentElementDetails, setShowModal }) => {
  
  // Callback function for handling drag end event
  const handleDragEnd = useCallback(
    (e) => {
      // Set details of the current element
      setCurrentElementDetails({
        id: nanoid(), // Generate unique id
        x: e.clientX, // X coordinate of drop location
        y: e.clientY, // Y coordinate of drop location
        text: defaultText[type], // Default text based on type
        type, // Type of menu item
        fontSize: 14, // Default font size
        fontWeight: "normal", // Default font weight
      });
      // Show modal for customizing element details
      setShowModal(true);
    },
    [setCurrentElementDetails, type, setShowModal]
  );

  // Render the draggable menu item
  return (
    <div
      className="draggable-element"
      draggable="true"
      onDragEnd={handleDragEnd}
    >
      {/* Drag icon */}
      <DragIcon />
      {/* Display type of menu item */}
      {type}
    </div>
  );
};

// Sidebar component displaying menu items
const Sidebar = ({ setCurrentElementDetails, setShowModal }) => (
  <div className="sidebar">
    {/* Sidebar header */}
    <div className="sidebar-header">BLOCKS</div>
    {/* Map through menu item types and render MenuItem component */}
    {["label", "input", "button"].map((e) => (
      <MenuItem
        key={e}
        type={e}
        setCurrentElementDetails={setCurrentElementDetails}
        setShowModal={setShowModal}
      />
    ))}
  </div>
);

// PropTypes for Sidebar component
Sidebar.propTypes = {
  setCurrentElementDetails: PropTypes.func.isRequired, // Function to set current element details
  setShowModal: PropTypes.func.isRequired, // Function to control modal visibility
};

// PropTypes for MenuItem component
MenuItem.propTypes = {
  type: PropTypes.string.isRequired, // Type of menu item
  setCurrentElementDetails: PropTypes.func.isRequired, // Function to set current element details
  setShowModal: PropTypes.func.isRequired, // Function to control modal visibility
};

export default Sidebar;
