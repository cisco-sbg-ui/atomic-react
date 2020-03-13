import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ATextarea.scss";

const ATextarea = forwardRef(
  (
    {
      className: propsClassName,
      rows = "3",
      validationState = "default",
      ...rest
    },
    ref
  ) => {
    let className = "a-textarea";
    if (validationState !== "default") {
      className += " a-textarea--state-" + validationState;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return <textarea {...rest} ref={ref} rows={rows} className={className} />;
  }
);

ATextarea.defaultProps = {
  validationState: "default"
};

ATextarea.propTypes = {
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"])
};

export default ATextarea;
