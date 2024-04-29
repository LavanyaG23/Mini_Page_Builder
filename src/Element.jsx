import React from "react";
import PropTypes from "prop-types";

export default function Element({
  type,
  text,
  x,
  y,
  fontSize,
  fontWeight,
  onClick,
  focused,
  onDragEnd,
}) {
  const commonStyles = {
    position: "absolute",
    left: x + "px",
    top: y + "px",
    fontSize: fontSize + "px",
    fontWeight: fontWeight,
  };

  if (focused) {
    if (type === "input") {
      commonStyles.outline = "2px solid red";
    } else {
      commonStyles.border = "2px solid red";
    }
  }

  const commonProps = {
    style: commonStyles,
    draggable: "true",
    onClick,
    onDragEnd,
  };

  switch (type) {
    case "label":
      return <span {...commonProps}>{text}</span>;
    case "input":
      return <input {...commonProps} type="text" placeholder={text} />;
    case "button":
      return (
        <button
          {...commonProps}
          style={{
            ...commonProps.style,
            backgroundColor: "#0144c0",
            color: "#ffffff",
            padding: "8px",
          }}
        >
          {text}
        </button>
      );
  }
}

Element.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  onClick: PropTypes.func,
  focused: PropTypes.bool,
  onDragEnd: PropTypes.func,
};
