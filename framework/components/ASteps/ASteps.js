import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import AIcon from "../AIcon";

import "./ASteps.scss";

const AStepTitle = forwardRef(
  ({className: propsClassName = "", children, ...rest}, ref) => {
    const containerClassName = " a-step__label";
    const className = propsClassName + containerClassName;
    return (
      <div {...rest} ref={ref} className={className}>
        <span className="a-step__title">{children}</span>
      </div>
    );
  }
);

AStepTitle.propTypes = {
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.bool
};
AStepTitle.displayName = "AStepTitle";

const AStepDescription = forwardRef(
  ({className: propsClassName = "", children, ...rest}, ref) => {
    const containerClassName = " a-step__hint";
    const className = propsClassName + containerClassName;

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

AStepDescription.propTypes = {
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.bool
};
AStepDescription.displayName = "AStepDescription";

const AStep = forwardRef(
  (
    {
      className: propsClassName = "",
      active,
      visited,
      disabled,
      showIconOnSisited,
      stepNumber,
      children,
      ...rest
    },
    ref
  ) => {
    const stepClassNamePrefix = " a-step";
    let className = propsClassName + stepClassNamePrefix;
    if (disabled) {
      className += ` disabled`;
    } else {
      if (visited) {
        className += ` visited`;
      }
      if (active) {
        className += ` active`;
      }
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <div className="a-step__icon">
          {!disabled && visited && showIconOnSisited ? (
            <AIcon size={15} className="icon-checkmark">
              checkmark
            </AIcon>
          ) : (
            stepNumber
          )}
        </div>
        <div className="a-step__content">{children}</div>
      </div>
    );
  }
);

AStep.propTypes = {
  /**
   * Mark step as active.
   */
  active: PropTypes.bool,
  /**
   * Mark step as visited.
   */
  visited: PropTypes.bool,
  /**
   * Mark step as disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Show 'marked' icon on visited steps
   */
  showIconOnSisited: PropTypes.bool,
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.string,
  /**
   * Step number.
   */
  stepNumber: PropTypes.number
};
AStep.displayName = "AStep";

const ASteps = forwardRef(
  (
    {
      className: propsClassName = "",
      children,
      orientation = "horizontal",
      ...rest
    },
    ref
  ) => {
    let className = "a-steps";
    if (orientation === "vertical") {
      className += " a-steps--orientation-vertical";
    }
    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

ASteps.propTypes = {
  /**
   *  Steps orientation - horizontal | vertical
   */
  orientation: PropTypes.string,
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.string
};

ASteps.displayName = "ASteps";

// export default ASteps;

export {ASteps, AStep, AStepTitle, AStepDescription};
