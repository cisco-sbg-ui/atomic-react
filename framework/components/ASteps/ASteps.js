import PropTypes from "prop-types";
import React, {forwardRef} from "react";
import AIcon from "../AIcon";
// import ADivider from "../ADivider";
import "./ASteps.scss";

const AStepTitle = forwardRef(
  ({className: propsClassName, title, ...rest}, ref) => {
    const containerClassName = " step__label";
    const className = propsClassName + containerClassName;
    return (
      <div {...rest} ref={ref} className={className}>
        <span className="step__title">{title}</span>
      </div>
    );
  }
);

AStepTitle.propTypes = {
  /**
   * Sets numeric displays to be locale formatted.
   */
  className: PropTypes.bool,
  /**
   * Set active step.
   */
  title: PropTypes.number
};
AStepTitle.displayName = "AStepTitle";

const AStepDescription = forwardRef(
  ({className: propsClassName, description, ...rest}, ref) => {
    const containerClassName = " step__hint";
    const className = propsClassName + containerClassName;

    return (
      <div {...rest} ref={ref} className={className}>
        {description}
      </div>
    );
  }
);

AStepDescription.propTypes = {
  /**
   * Sets numeric displays to be locale formatted.
   */
  className: PropTypes.bool,
  /**
   * Set active step.
   */
  description: PropTypes.number
};
AStepDescription.displayName = "AStepDescription";

const AStep = forwardRef(
  (
    {
      className: propsClassName,
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
    const stepClassNamePrefix = " step";
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
        <div className="step__icon">
          {visited && showIconOnSisited ? (
            <AIcon size={15} className="icon-checkmark">
              checkmark
            </AIcon>
          ) : (
            stepNumber
          )}
        </div>
        <div className="step__content">{children}</div>
      </div>
    );
  }
);

AStep.propTypes = {
  /**
   * Sets numeric displays to be locale formatted.
   */
  localeFormatting: PropTypes.bool,
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
   * Set number.
   */
  stepNumber: PropTypes.bool
};
AStep.displayName = "AStep";

const ASteps = forwardRef(
  ({className: propsClassName, children, orientation, ...rest}, ref) => {
    let className = "steps";
    if (orientation === "vertical") {
      className += " steps--orientation-vertical";
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
