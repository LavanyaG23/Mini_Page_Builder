// Importing necessary modules from React library
import React, { useCallback } from "react";  // React hook used to memoize callback functions to prevent unnecessary re-renders.
import PropTypes from "prop-types";  //Imports the PropTypes library, which is used for type-checking props.
import Element from "./Element"; // Importing the Element component

// Page component representing the main page where elements are displayed
// This is a functional component.It receives props as an object and uses object destructuring to extract specific props
export default function Page({
  elements = {}, // Default empty object for elements
  focusedElement, // Currently focused element ID
  setFocusedElement, // Function to set the focused element ID
  handleDragAndDrop, // Function to handle drag and drop of elements
}) {
  console.log({elements}); // Logging elements to the console

  // Callback function for handling click on an element
  const handleElementClick = useCallback(
    (e, id) => {
      e.stopPropagation(); // Preventing bubbling of the event
      setFocusedElement(id); // Setting the focused element ID
    },
    [setFocusedElement] // Dependency array
  );

  // Render the Page component
  return (
    <div
      onClick={() => setFocusedElement(null)} // Resetting focused element when clicking on the page
      className="page"
      droppable="true" // Setting the page as droppable
    >
      {/* Mapping through elements and rendering Element component for each */}
      {Object.values(elements).map(({ id, ...config }) => (
        <Element
          key={id} // Unique key for React reconciliation
          {...config} // Passing element configuration as props to Element component
          focused={focusedElement === id} // Whether the element is focused or not
          onClick={(e) => handleElementClick(e, id)} // Click event handler for the element
          onDragEnd={(e) => handleDragAndDrop(id, e.clientX, e.clientY)} // Drag end event handler for the element
        />
      ))}
    </div>
  );
}

// PropTypes for Page component
Page.propTypes = {
  elements: PropTypes.object, // PropTypes for elements object
  focusedElement: PropTypes.string, // PropTypes for focusedElement string
  setFocusedElement: PropTypes.func, // PropTypes for setFocusedElement function
  handleDragAndDrop: PropTypes.func, // PropTypes for handleDragAndDrop function
};
