// Importing necessary modules from React library
import React, { useState, useCallback } from "react";


// Importing custom components and styles
import Sidebar from "./Sidebar";
import Page from "./Page";
import Modal from "./Modal";
import "./App.css";

// Define the main App component
const App = () => {


  // State variables using the useState hook
  const [currentElementDetails, setCurrentElementDetails] = useState({});    //Stores the details of the currently selected or focused element.
  const [showModal, setShowModal] = useState(false);    //Controls the visibility of the modal for editing element details. Initially set to false.
  const [focusedElement, setFocusedElement] = useState(null);    //Stores the id of the currently focused element, if any.
  const [savedElements, setSavedElements] = useState(    
    JSON.parse(localStorage.getItem("elements")) || {}     // Stores the elements of the application. Initially populated from local storage or an empty object if no data exists.
  );


  // Callback function for handling drag-and-drop of elements
  // This function is responsible for updating the position (x, y coordinates) of an element when it's dragged and dropped. 
  // It takes three parameters: id (the unique identifier of the element), x (the new x-coordinate), and y (the new y-coordinate). 
  // It creates a copy of the current savedElements state, updates the position of the element with the given id, 
  // saves the updated elements to local storage, and then updates the savedElements state.
  const handleDragAndDrop = useCallback(
    (id, x, y) => {
      const updatedElements = JSON.parse(JSON.stringify(savedElements));
      updatedElements[id].x = x;
      updatedElements[id].y = y;
      localStorage.setItem("elements", JSON.stringify(updatedElements));
      setSavedElements(updatedElements);
    },
    [savedElements]
  );


  // Callback function for deleting an element
  // This function handles the deletion of an element. 
  // It takes the id of the element to be deleted as a parameter. 
  // Similar to handleDragAndDrop, it creates a copy of the current savedElements state, deletes the element with the given id, 
  // saves the updated elements to local storage, and updates the savedElements state accordingly.
  const handleElementDelete = useCallback(
    (id) => {
      const updatedElements = JSON.parse(JSON.stringify(savedElements));
      delete updatedElements[id];
      localStorage.setItem("elements", JSON.stringify(updatedElements));
      setSavedElements(updatedElements);
    },
    [savedElements]
  );


  // Callback function for updating an element
  // This function is called when an element needs to be updated. 
  // It takes the id of the element to be updated as a parameter. 
  // It sets the currentElementDetails state to the details of the element with the given id and sets showModal state to true, 
  // triggering the display of a modal for updating the element.
  const handleElementUpdate = useCallback(
    (id) => {
      setCurrentElementDetails(savedElements[id]);
      setShowModal(true);
    },
    [savedElements, setCurrentElementDetails, setShowModal]
  );


  // Callback function for handling key down events
  // This function is triggered on keydown events. It listens for specific key codes and performs actions accordingly. 
  // If there is a focused element and the modal is not shown, it checks if Enter key (keyCode 13) is pressed to 
  // update the element, or if Delete key for Mac (keyCode 8) or Delete key for Windows (keyCode 46) is pressed to delete the element.
  const handleKeyDown = useCallback(
    (event) => {
      if (focusedElement && !showModal) {
        if (event.keyCode === 13) {
          handleElementUpdate(focusedElement);
        } else if (event.keyCode === 8 || event.keyCode === 46) {
          handleElementDelete(focusedElement);
          setFocusedElement(null);
        }
      }
    },
    [focusedElement, handleElementDelete, handleElementUpdate, showModal]
  );


  // Callback function for adding or updating an element.
  // This function is responsible for adding a new element or updating an existing one. 
  // It takes an element object as a parameter. It creates a copy of the current savedElements state, 
  // adds or updates the element with the provided id, saves the updated elements to local storage, 
  // updates the savedElements state, and resets currentElementDetails to an empty object.
  const handleAddOrUpdateElement = useCallback(
    (element) => {
      const updatedElements = { ...savedElements, [element.id]: element };
      localStorage.setItem("elements", JSON.stringify(updatedElements));
      setSavedElements(updatedElements);
      setCurrentElementDetails({});
    },
    [savedElements, setSavedElements]
  );



  const exportPage = () => {
    const filename = "page_config.json"; // Set the filename
    const json = JSON.stringify(savedElements); // Convert the page configuration to JSON format
    const blob = new Blob([json], { type: "application/json" }); // Create a Blob object
    const url = URL.createObjectURL(blob); // Generate a URL for the Blob
    const link = document.createElement("a"); // Create a link element
    link.href = url; // Set the link's href attribute to the URL
    link.download = filename; // Set the download attribute to the filename
    document.body.appendChild(link); // Append the link to the document body
    link.click(); // Simulate a click on the link
    document.body.removeChild(link); // Remove the link from the document body
  };


  // Rendering the main App component
  return (

    // This <div> serves as the wrapper for the entire application.
    // It has a class name app for styling purposes.
    // It listens for onKeyDown events, triggering the handleKeyDown function when any key is pressed. 
    //This is essential for keyboard navigation and interaction within the application.
    // tabIndex={0} makes the <div> focusable, allowing it to receive keyboard events.
    <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>


      {/* Sidebar component */}
      <Sidebar
      // It receives two props: setCurrentElementDetails and setShowModal.
      // These props are functions passed down to allow the Sidebar to interact with the state of the App component.
        setCurrentElementDetails={setCurrentElementDetails}
        setShowModal={setShowModal}
        exportPage={exportPage} // Pass the exportPage function as a prop
      />


      {/* Page component */}
      <Page
      // It receives several props: elements, focusedElement, setFocusedElement, and handleDragAndDrop.
      // These props provide necessary data and functions to the Page component for rendering and interaction with elements 
      // on the page.
        elements={savedElements}
        focusedElement={focusedElement}
        setFocusedElement={setFocusedElement}
        handleDragAndDrop={handleDragAndDrop}
      />


      {/* Modal component */}
      {showModal && (
        <Modal
        // Conditional rendering: {showModal && ...} ensures that the Modal component is only rendered when 
        // showModal state is true.
        // If showModal is true, <Modal> component is rendered.
        // It receives props such as setShowModal, element, and handleAddOrUpdateElement to control its behavior and data flow.
          setShowModal={setShowModal}
          element={currentElementDetails}
          handleAddOrUpdateElement={handleAddOrUpdateElement}
        />
      )}
    </div>
  );
};

// Exporting the App component as the default export
export default App;
