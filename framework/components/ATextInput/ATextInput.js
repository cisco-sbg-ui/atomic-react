import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ATextInput.scss";

const ATextInput = forwardRef(
  (
    {
      className: inputClassName,
      type = "text",
      validationState = "success",
      ...rest
    },
    ref
  ) => {
    let className = "a-text-input";
    if (validationState !== "success") {
      className += " a-text-input--state-" + validationState;
    }

    if (inputClassName) {
      className += ` ${inputClassName}`;
    }

    return <input {...rest} ref={ref} type={type} className={className} />;
  }
);

ATextInput.defaultProps = {
  type: "text",
  validationState: "default"
};

ATextInput.propTypes = {
  /**
   * Change the input type to take advantage of native behavior.
   */
  type: PropTypes.oneOf(["text", "password", "email"]),
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"])
};

export default ATextInput;
