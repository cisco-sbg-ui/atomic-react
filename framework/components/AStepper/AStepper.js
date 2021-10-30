import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import AIcon from "../AIcon";

import "./AStepper.scss";

const AStepTitle = forwardRef(
  ({className: propsClassName = "", children, ...rest}, ref) => {
    const className = `a-step__label ${propsClassName}`.trim();
    return (
      <div {...rest} ref={ref} className={className}>
        <span className="a-step__title">{children}</span>
        <hr role="separator" className="a-step__divider" />
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
      showIconOnVisited,
      stepNumber,
      children,
      ...rest
    },
    ref
  ) => {
    let className = `a-step ${propsClassName}`.trim();
    if (disabled) {
      className += ` a-step__disabled`;
    } else {
      if (visited) {
        className += ` a-step__visited`;
      }
      if (active) {
        className += ` a-step__active`;
      }
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <div className="a-step__icon">
          {!disabled && visited && showIconOnVisited ? (
            <AIcon size={15} className="a-step__icon__checkmark">
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
  showIconOnVisited: PropTypes.bool,
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

const AStepper = forwardRef(
  ({className: propsClassName = "", children, vertical, ...rest}, ref) => {
    let className = "a-steps";
    if (vertical) {
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

AStepper.propTypes = {
  /**
   *  When true, stepper orientation will be vertical
   */
  vertical: PropTypes.bool,
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.string
};

AStepper.displayName = "AStepper";

// export default AStepper;

export {AStepper, AStep, AStepTitle, AStepDescription};
