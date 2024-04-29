import React, { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Page from "./Page";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [currentElementDetails, setCurrentElementDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [focusedElement, setFocusedElement] = useState(null);
  const [savedElements, setSavedElements] = useState(
    JSON.parse(localStorage.getItem("elements")) || {}
  );

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

  const handleElementDelete = useCallback(
    (id) => {
      const updatedElements = JSON.parse(JSON.stringify(savedElements));
      delete updatedElements[id];
      console.log({ updatedElements });
      localStorage.setItem("elements", JSON.stringify(updatedElements));
      setSavedElements(updatedElements);
    },
    [savedElements]
  );

  const handleElementUpdate = useCallback(
    (id) => {
      setCurrentElementDetails(savedElements[id]);
      setShowModal(true);
    },
    [savedElements, setCurrentElementDetails, setShowModal]
  );

  const handleKeyDown = useCallback(
    (event) => {
      console.log(event.keyCode);
      if (focusedElement && !showModal) {
        if (event.keyCode === 13) {
          handleElementUpdate(focusedElement);
        } else if (event.keyCode === 8 || event.keyCode == 46) {
          handleElementDelete(focusedElement);
          setFocusedElement(null);
        }
      }
    },
    [focusedElement, handleElementDelete, handleElementUpdate, showModal]
  );

  const handleAddOrUpdateElement = useCallback(
    (element) => {
      const updatedElements = { ...savedElements, [element.id]: element };
      localStorage.setItem("elements", JSON.stringify(updatedElements));
      setSavedElements(updatedElements);
      setCurrentElementDetails({});
    },
    [savedElements, setSavedElements]
  );

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
      <Sidebar
        setCurrentElementDetails={setCurrentElementDetails}
        setShowModal={setShowModal}
      />
      <Page
        elements={savedElements}
        focusedElement={focusedElement}
        setFocusedElement={setFocusedElement}
        handleDragAndDrop={handleDragAndDrop}
      />
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          element={currentElementDetails}
          handleAddOrUpdateElement={handleAddOrUpdateElement}
        />
      )}
    </div>
  );
};

export default App;
