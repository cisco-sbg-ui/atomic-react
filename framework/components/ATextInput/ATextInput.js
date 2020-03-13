import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ATextInput.scss";

const ATextInput = forwardRef(
  (
    {
      className: propsClassName,
      type = "text",
      validationState = "default",
      ...rest
    },
    ref
  ) => {
    let className = "a-text-input";
    if (validationState !== "default") {
      className += " a-text-input--state-" + validationState;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
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
