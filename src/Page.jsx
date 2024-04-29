import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Element from "./Element";

export default function Page({
  elements = {},
  focusedElement,
  setFocusedElement,
  handleDragAndDrop,
}) {
  console.log({elements})
  // const [focusedElement, setFocusedElement] = useState(null);

  const handleElementClick = useCallback(
    (e, id) => {
      e.stopPropagation();
      setFocusedElement(id);
    },
    [setFocusedElement]
  );

  return (
    <div
      onClick={() => setFocusedElement(null)}
      className="page"
      droppable="true"
    >
      {Object.values(elements).map(({ id, ...config }) => (
        <Element
          key={id}
          {...config}
          focused={focusedElement === id}
          onClick={(e) => handleElementClick(e, id)}
          onDragEnd={(e) => handleDragAndDrop(id, e.clientX, e.clientY)}
        />
      ))}
    </div>
  );
}

Page.propTypes = {
  elements: PropTypes.object,
  focusedElement: PropTypes.string,
  setFocusedElement: PropTypes.func,
  handleDragAndDrop: PropTypes.func,
};