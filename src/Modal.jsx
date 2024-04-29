import React, { useCallback, useState } from "react";  // Importing React and necessary hooks
import PropTypes from "prop-types";  // Importing PropTypes for type-checking props

// Modal component for editing element properties
const Modal = ({ setShowModal, element = {}, handleAddOrUpdateElement }) => {
  const { id } = element;  // Destructuring 'id' from the 'element' prop

  // State for form values, initialized with element data or empty object
  const [formValues, setFormValues] = useState(
    JSON.parse(JSON.stringify(element))
  );

  // Callback to close the modal
  const handleClose = useCallback(() => {
    setShowModal(false);   // Calling setShowModal to hide the modal
  }, [setShowModal]);   // Dependency array with setShowModal as a dependency


  // Callback to handle changes in form input fields
  const handleChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setFormValues((prevState) => ({ ...prevState, [id]: value }));
    },
    [setFormValues]
  );

  
  // Callback to handle form submission (saving changes)
  const handleSave = useCallback(
    (e) => {
      e.preventDefault();   // Preventing default form submission behavior
      const { text, x, y, fontSize, fontWeight } = formValues;
      // Checking if all required form fields are filled
      if (text && x && y && fontSize && fontWeight) {
        // Calling handleAddOrUpdateElement to update element data
        handleAddOrUpdateElement({ id, ...formValues });
        setShowModal(false);   // Closing the modal after saving changes
      }
    },
    [setShowModal, formValues, handleAddOrUpdateElement, id]
  );


  // Rendering the modal UI
  return (
    <div className="modal-background" onClick={handleClose}>
      <form
        id="modal-form"
        className="modal-box"
        onSubmit={handleSave}
        onClick={(e) => e.stopPropagation()}   // Preventing modal closure when clicking inside the form
      >
        <div className="close-button" onClick={handleClose}>
          X
        </div>
        <div className="modal-content">
          <h2 className="modal-heading">Edit Label</h2>
          <div className="input-label">Text</div>
          <input
            id="text"
            type="text"
            className="input-field"
            defaultValue={formValues.text}
            onChange={handleChange}
          />
          <div className="input-label">X</div>
          <input
            id="x"
            type="number"
            className="input-field"
            defaultValue={formValues.x}
            onChange={handleChange}
          />
          <div className="input-label">Y</div>
          <input
            id="y"
            type="number"
            className="input-field"
            defaultValue={formValues.y}
            onChange={handleChange}
          />
          <div className="input-label">Font Size</div>
          <input
            id="fontSize"
            type="number"
            className="input-field"
            defaultValue={formValues.fontSize}
            onChange={handleChange}
          />
          <div className="input-label">Font Weight</div>
          <input
            id="fontWeight"
            type="text"
            className="input-field"
            defaultValue={formValues.fontWeight}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Save Changes"
          onClick={handleSave}
          className="save-button"
        />
      </form>
    </div>
  );
};

export default Modal;   // Exporting the Modal component as default


// PropTypes for Modal component to specify the expected types of props
Modal.propTypes = {
  setShowModal: PropTypes.func.isRequired,   // Function to control modal visibility
  element: PropTypes.object,   // Element data to be edited (optional)
  handleAddOrUpdateElement: PropTypes.func.isRequired,    // Function to add/update element data
};