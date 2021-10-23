import PropTypes from "prop-types";
import React, {forwardRef} from "react";
import AIcon from "../AIcon";
import "./ASteps.scss";

const ASteps = forwardRef(
  (
    {
      className: propsClassName,
      localeFormatting,
      active = 1,
      data = [],
      orientation,
      showIconOnSisited,
      ...rest
    },
    ref
  ) => {
    let className = "steps";
    if (orientation === "vertical") {
      className += " steps--orientation-vertical";
    }
    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const content = () => {
      return data.map(({title, description}, index) => {
        const stepNumber = index + 1;
        let stepClassNames = "step";
        let isVisited;

        if (active > stepNumber) {
          isVisited = true;
          stepClassNames += " visited";
        } else if (active === stepNumber) {
          stepClassNames += " active";
        }

        return (
          <div key={title} className={stepClassNames}>
            <div className="step__icon">
              {isVisited && showIconOnSisited ? (
                <AIcon size={15} className="icon-checkmark">
                  checkmark
                </AIcon>
              ) : localeFormatting ? (
                stepNumber.toLocaleString()
              ) : (
                stepNumber
              )}
            </div>
            <div className="step__content">
              <div className="step__label">
                <span className="step__title">{title}</span>
              </div>
              <div className="step__hint">{description}</div>
            </div>
          </div>
        );
      });
    };

    return (
      <div {...rest} ref={ref} className={className}>
        {content()}
      </div>
    );
  }
);

ASteps.propTypes = {
  /**
   * Sets numeric displays to be locale formatted.
   */
  localeFormatting: PropTypes.bool,
  /**
   * Set active step.
   */
  active: PropTypes.number,
  /**
   * Steps list, with title and descripsion
   */
  data: PropTypes.array,
  /**
   * When truw, Steps orientation will be vertical
   */
  vertical: PropTypes.bool,
  /**
   * Show 'marked' icon on visited steps
   */
  showIconOnSisited: PropTypes.bool,
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.string
};

ASteps.displayName = "ASteps";

export default ASteps;
