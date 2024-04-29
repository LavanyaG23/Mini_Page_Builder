import React from "react"; // Importing React library
import PropTypes from "prop-types"; // Importing PropTypes for type-checking props

// Function component representing an element on the page
export default function Element({
  type, // Type of the element (e.g., "label", "input", "button")
  text, // Text content of the element
  x, // X-coordinate position of the element
  y, // Y-coordinate position of the element
  fontSize, // Font size of the element
  fontWeight, // Font weight of the element
  onClick, // Click event handler for the element
  focused, // Boolean indicating whether the element is focused or not
  onDragEnd, // Drag end event handler for the element
}) {
  // Common styles for all types of elements
  const commonStyles = {
    position: "absolute", // Positioning the element absolutely
    left: x + "px", // Setting the left position based on the x-coordinate
    top: y + "px", // Setting the top position based on the y-coordinate
    fontSize: fontSize + "px", // Setting the font size
    fontWeight: fontWeight, // Setting the font weight
  };

  // If the element is focused, apply additional styles
  if (focused) {
    // If the element type is "input", apply outline style, otherwise apply border style
    if (type === "input") {
      commonStyles.outline = "2px solid red"; // Red outline for input elements
    } else {
      commonStyles.border = "2px solid red"; // Red border for non-input elements
    }
  }

  // Common props shared by all types of elements
  const commonProps = {
    style: commonStyles, // Applying common styles
    draggable: "true", // Allowing the element to be draggable
    onClick, // Click event handler
    onDragEnd, // Drag end event handler
  };

  // Rendering different types of elements based on the "type" prop
  switch (type) {
    case "label":
      return <span {...commonProps}>{text}</span>; // Rendering a span element for labels
    case "input":
      return <input {...commonProps} type="text" placeholder={text} />;     // using the spread operator (...) to pass all the 
                                                                            // properties defined in the commonProps object as 
                                                                            // individual props to the input element.Rendering 
                                                                            // an input element for text input.
    case "button":
      // Rendering a button element for buttons with additional styles
      return (
        <button
          {...commonProps}
          style={{
            ...commonProps.style, // Applying common styles
            backgroundColor: "#0144c0", // Blue background color
            color: "#ffffff", // White text color
            padding: "8px", // Padding around the text
          }}
        >
          {text} {/* Text content of the button */}
        </button>
      );
  }
}

// PropTypes for Element component to specify the expected types of props
Element.propTypes = {
  type: PropTypes.string.isRequired, // Type prop is required and should be a string
  text: PropTypes.string, // Text prop is optional and should be a string
  x: PropTypes.number.isRequired, // X-coordinate prop is required and should be a number
  y: PropTypes.number.isRequired, // Y-coordinate prop is required and should be a number
  fontSize: PropTypes.number, // Font size prop is optional and should be a number
  fontWeight: PropTypes.string, // Font weight prop is optional and should be a string
  onClick: PropTypes.func, // Click event handler prop is optional and should be a function
  focused: PropTypes.bool, // Focused prop is optional and should be a boolean
  onDragEnd: PropTypes.func, // Drag end event handler prop is optional and should be a function
};
