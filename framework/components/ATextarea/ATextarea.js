import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";

import "./ATextarea.scss";

let textareaCounter = 0;

const ATextarea = forwardRef(
  (
    {
      className: propsClassName,
      disabled,
      label,
      placeholder,
      readOnly,
      rows = "3",
      validationState = "default",
      ...rest
    },
    ref
  ) => {
    const [textareaId] = useState(textareaCounter++);

    let className = "a-textarea";
    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let fieldClassName = "a-textarea__field";
    if (validationState !== "default") {
      fieldClassName += " a-textarea__field--state-" + validationState;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {label && (
          <label
            htmlFor={`a-textarea__field_${textareaId}`}
            className="a-textarea__label">
            {label}
          </label>
        )}
        <textarea
          id={`a-textarea__field_${textareaId}`}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={rows}
          className={fieldClassName}
        />
      </div>
    );
  }
);

ATextarea.defaultProps = {
  validationState: "default"
};

ATextarea.propTypes = {
  /**
   * Sets the textarea label text.
   */
  label: PropTypes.node,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"])
};

ATextarea.displayName = "ATextarea";

export default ATextarea;
