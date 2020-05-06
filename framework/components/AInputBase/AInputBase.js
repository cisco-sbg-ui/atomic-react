import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AInputBase.scss";
import AIcon from "../AIcon";
import {keyCodes} from "../../utils/helpers";

const AInputBase = forwardRef(
  (
    {
      append,
      children,
      className: propsClassName,
      clearable,
      disabled,
      focused,
      hint,
      label,
      labelFor,
      labelId,
      onClear,
      prepend,
      readOnly,
      type = "text",
      validationState = "default",
      ...rest
    },
    ref
  ) => {
    let className = "a-input-base";
    if (focused) {
      className += " a-input-base--focused";
    }

    if (disabled) {
      className += " a-input-base--disabled";
    }

    if (readOnly) {
      className += " a-input-base--readonly";
    }

    if (validationState !== "default") {
      className += ` a-input-base--${validationState}`;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {label && (
          <label
            id={labelId}
            htmlFor={labelFor}
            className="a-input-base__label">
            {label}
          </label>
        )}
        <div className="a-input-base__surface">
          <div class="a-input-base__prepend">{prepend}</div>
          <div class="a-input-base__control">{children}</div>
          <div class="a-input-base__append">
            {clearable && !readOnly && !disabled && (
              <AIcon
                tabIndex={0}
                role="button"
                className="a-input-base__clear"
                size={10}
                onClick={onClear}
                onKeyDown={(e) => {
                  if ([keyCodes.enter, keyCodes.space].includes(e.keyCode)) {
                    e.preventDefault();
                    onClear(e);
                  }
                }}>
                close
              </AIcon>
            )}
            {append}
          </div>
        </div>
        {hint && <div class="a-input-base__hint">{hint}</div>}
      </div>
    );
  }
);

AInputBase.propTypes = {
  /**
   * Append content to the control.
   */
  append: PropTypes.node,
  /**
   * Toggles whether the clear button is rendered.
   */
  clearable: PropTypes.bool,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * Toggles the `focused` state.
   */
  focused: PropTypes.bool,
  /**
   * Sets the hint content.
   */
  hint: PropTypes.node,
  /**
   * Sets the label content.
   */
  label: PropTypes.node,
  /**
   * The label's `for` attribute.
   */
  labelFor: PropTypes.string,
  /**
   * The label's `id` attribute.
   */
  labelId: PropTypes.string,
  /**
   * Handles the `clear` event.
   */
  onClear: PropTypes.func,
  /**
   * Prepends content to the control.
   */
  prepend: PropTypes.node,
  /**
   * Toggles the `readOnly` state.
   */
  readOnly: PropTypes.bool,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"])
};

AInputBase.displayName = "AInputBase";

export default AInputBase;
