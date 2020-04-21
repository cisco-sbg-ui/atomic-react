import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ACheckbox.scss";
import {isStockColor, isValidColor} from "../../utils/helpers";

const Icons = {
  checked:
    "M2.25 0C1.051-.01.029.966 0 2.25v10.5c0 .597.237 1.17.66 1.592l.035.035.186.158.039.03c.386.282.852.434 1.33.433h1.91l8.588.002a2.266 2.266 0 002.25-2.256V3.625L15 2.254A2.268 2.268 0 0012.744 0zm9.906 3.81h.008c.257-.004.505.082.705.243l.94.82-.99 1.041-6.423 6.736-3.5-3.502a1.7 1.7 0 01-.36-.927 1.12 1.12 0 01.343-.73 1.165 1.165 0 011.66.013L6.377 9.36l4.883-5.18c.33-.275.63-.366.896-.37z",
  unchecked:
    "M2.256 0A2.245 2.245 0 000 2.254V12.75A2.22 2.22 0 002.256 15h10.492C13.992 15 15 13.96 15 12.75V2.254A2.245 2.245 0 0012.744 0zm1.26 2.531h7.968c.568 0 .985.417.985.985v7.968a.956.956 0 01-.985.985H3.516a.956.956 0 01-.985-.985V3.516c0-.568.417-.985.985-.985z",
  indeterminate:
    "M2.254 0A2.268 2.268 0 000 2.254v10.49A2.268 2.268 0 002.254 15h10.49A2.267 2.267 0 0015 12.744V7.693l-2.348-.104a1.23 1.23 0 01-.37.858c-.241.209-.534.395-.892.41H3.828c-.447-.04-.74-.202-.942-.406l-.002-.002-.003-.003a1.14 1.14 0 01-.35-.855V7.59c0-.335.133-.653.37-.89v-.002c.23-.23.539-.37.895-.37h7.591c.36 0 .7.192.895.37.229.207.375.536.37.892L15 7.693v-5.44A2.268 2.268 0 0012.744 0z"
};

const ACheckbox = forwardRef(
  (
    {
      checked = false,
      children,
      className: propsClassName,
      color = "cisco-blue",
      disabled = false,
      indeterminate = false,
      name,
      onClick,
      value,
      wrap,
      ...rest
    },
    ref
  ) => {
    let className = "a-checkbox";

    if (disabled) {
      className += " a-checkbox--disabled";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const boxProps = {
      "aria-hidden": "true",
      className: "a-checkbox__box"
    };

    if (!disabled) {
      if (isStockColor(color)) {
        boxProps.className += ` ${color}--text`;
      } else {
        boxProps.style = {
          color
        };
      }
    }

    let currentPath = Icons.unchecked;
    if (indeterminate) {
      currentPath = Icons.indeterminate;
    } else if (checked) {
      currentPath = Icons.checked;
    }

    return (
      <label {...rest} ref={ref} className={className}>
        <input
          type="checkbox"
          className="a-checkbox__input"
          name={name}
          value={value}
          aria-checked={indeterminate ? "mixed" : checked}
          disabled={disabled}
          onChange={() => {}}
          onClick={onClick}
          role="checkbox"
          ref={(el) =>
            el && ((el.indeterminate = indeterminate) || (el.checked = checked))
          }
        />
        <span {...boxProps}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15">
            <path d={currentPath} />
          </svg>
        </span>
        <span
          className={`a-checkbox__label${
            wrap ? " a-checkbox__label--wrap" : ""
          }`}>
          {children}
        </span>
      </label>
    );
  }
);

ACheckbox.defaultProps = {
  checked: false,
  disabled: false,
  indeterminate: false
};

ACheckbox.propTypes = {
  /**
   * Toggles the `checked` state.
   */
  checked: PropTypes.bool,
  /**
   * Specify the checkbox color. Accepts any stock color or CSS color value.
   */
  color: isValidColor,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * Toggles the `indeterminate` state.
   */
  indeterminate: PropTypes.bool,
  /**
   * The input's name.
   */
  name: PropTypes.string,
  /**
   * A callback for handling the click event.
   */
  onClick: PropTypes.func,
  /**
   * The input's value.
   */
  value: PropTypes.string,
  /**
   * Toggles wrapping of long text in the label.
   */
  wrap: PropTypes.bool
};

ACheckbox.displayName = "ACheckbox";

export default ACheckbox;
