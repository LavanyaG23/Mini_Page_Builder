import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

const defaultText = {
  label: "This is a label.",
  input: "Input Field",
  button: "Button",
};

const DragIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="18"
    fill="currentColor"
    className="bi bi-six-dots"
    viewBox="0 0 16 16"
  >
    <rect x="3" y="3" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="9" y="3" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="3" y="8" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="9" y="8" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="3" y="13" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
    <rect x="9" y="13" width="4" height="4" rx="1" ry="1" fill="#d4d4d4" />
  </svg>
);

const MenuItem = ({ type, setCurrentElementDetails, setShowModal }) => {
  const handleDragEnd = useCallback(
    (e) => {
      setCurrentElementDetails({
        id: nanoid(),
        x: e.clientX,
        y: e.clientY,
        text: defaultText[type],
        type,
        fontSize: 14,
        fontWeight: "normal",
      });
      setShowModal(true);
    },
    [setCurrentElementDetails, type, setShowModal]
  );

  return (
    <div
      className="draggable-element"
      draggable="true"
      onDragEnd={handleDragEnd}
    >
      <DragIcon />
      {type}
    </div>
  );
};

const Sidebar = ({ setCurrentElementDetails, setShowModal }) => (
  <div className="sidebar">
    <div className="sidebar-header">BLOCKS</div>
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

export default Sidebar;

Sidebar.propTypes = {
  setCurrentElementDetails: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  setCurrentElementDetails: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
