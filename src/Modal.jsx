import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ setShowModal, element = {}, handleAddOrUpdateElement }) => {
  const { id } = element;

  const [formValues, setFormValues] = useState(
    JSON.parse(JSON.stringify(element))
  );

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setFormValues((prevState) => ({ ...prevState, [id]: value }));
    },
    [setFormValues]
  );

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      const { text, x, y, fontSize, fontWeight } = formValues;
      if (text && x && y && fontSize && fontWeight) {
        handleAddOrUpdateElement({ id, ...formValues });
        setShowModal(false);
      }
    },
    [setShowModal, formValues, handleAddOrUpdateElement, id]
  );

  return (
    <div className="modal-background" onClick={handleClose}>
      <form
        id="modal-form"
        className="modal-box"
        onSubmit={handleSave}
        onClick={(e) => e.stopPropagation()}
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

export default Modal;

Modal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  element: PropTypes.object,
  handleAddOrUpdateElement: PropTypes.func.isRequired,
};