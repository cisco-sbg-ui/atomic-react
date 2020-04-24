import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";

import "./ATextInput.scss";
import {keyCodes} from "../../utils/helpers";
import AIcon from "../AIcon";

let textInputCounter = 0;

const ATextInput = forwardRef(
  (
    {
      appendIcon,
      autoComplete,
      className: propsClassName,
      disabled,
      inputRef,
      label,
      name,
      onBlur,
      onClickAppend,
      onClickPrepend,
      onChange,
      onFocus,
      onKeyUp,
      onPaste,
      placeholder,
      prependIcon,
      readOnly,
      type = "text",
      validationState = "default",
      value,
      ...rest
    },
    ref
  ) => {
    const [textInputId] = useState(textInputCounter++);

    const onClickPrependKeyDown = (e) => {
      if (
        onClickPrepend &&
        [keyCodes.enter, keyCodes.space].includes(e.keyCode)
      ) {
        e.preventDefault();
        onClickPrepend(e);
      }
    };

    const onClickAppendKeyDown = (e) => {
      if (
        onClickAppend &&
        [keyCodes.enter, keyCodes.space].includes(e.keyCode)
      ) {
        e.preventDefault();
        onClickAppend(e);
      }
    };

    let className = "a-text-input";
    if (disabled) {
      className += " a-text-input--disabled";
    }

    if (readOnly) {
      className += " a-text-input--readonly";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let inputClassName = "a-text-input__input";
    if (validationState !== "default") {
      inputClassName += ` a-text-input__input--state-${validationState}`;
    }

    const prependProps = {
      className: "a-text-input__prepend-icon"
    };

    if (!disabled && !readOnly && onClickPrepend) {
      prependProps.className += " interactable";
      prependProps.onClick = onClickPrepend;
      prependProps.onKeyDown = onClickPrependKeyDown;
      prependProps.tabIndex = 0;
      prependProps.role = "button";
    }

    const appendProps = {
      className: "a-text-input__append-icon"
    };

    if (!disabled && !readOnly && onClickAppend) {
      appendProps.className += " interactable";
      appendProps.onClick = onClickAppend;
      appendProps.onKeyDown = onClickAppendKeyDown;
      appendProps.tabIndex = 0;
      appendProps.role = "button";
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {label && (
          <label
            htmlFor={`a-text-input_${textInputId}`}
            className="a-text-input__label">
            {label}
          </label>
        )}
        {prependIcon && <AIcon {...prependProps}>{prependIcon}</AIcon>}
        <input
          ref={inputRef}
          autoComplete={autoComplete}
          className={inputClassName}
          disabled={disabled}
          id={`a-text-input_${textInputId}`}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onPaste={onPaste}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          value={value}
        />
        {appendIcon && <AIcon {...appendProps}>{appendIcon}</AIcon>}
      </div>
    );
  }
);

ATextInput.defaultProps = {
  type: "text",
  validationState: "default"
};

ATextInput.propTypes = {
  /**
   * Appends an icon inside the text input. The value should be an [icon name](/?path=/docs/components-icons--page).
   */
  appendIcon: PropTypes.string,
  /**
   * The input's `autocomplete` attribute.
   */
  autoComplete: PropTypes.string,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * React ref for the input element
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  /**
   * Sets the input label text.
   */
  label: PropTypes.node,
  /**
   * The input's `name` attribute.
   */
  name: PropTypes.string,
  /**
   * Handles the `blur` event
   */
  onBlur: PropTypes.func,
  /**
   * Handles the `click` event for an appended icon.
   */
  onClickAppend: PropTypes.func,
  /**
   * Handles the `click` event for a prepended icon.
   */
  onClickPrepend: PropTypes.func,
  /**
   * Handles the `change` event.
   */
  onChange: PropTypes.func,
  /**
   * Handles the `focus` event.
   */
  onFocus: PropTypes.func,
  /**
   * Handles the `keyUp` event.
   */
  onKeyUp: PropTypes.func,
  /**
   * Handles the `paste` event.
   */
  onPaste: PropTypes.func,
  /**
   * The input's `placeholder` attribute.
   */
  placeholder: PropTypes.string,
  /**
   * Prepends an icon inside the text input. The value should be an [icon name](/?path=/docs/components-icons--page).
   */
  prependIcon: PropTypes.string,
  /**
   * Toggles the `readOnly` state.
   */
  readOnly: PropTypes.bool,
  /**
   * Change the input type to take advantage of native behavior.
   */
  type: PropTypes.oneOf(["text", "password", "email"]),
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"]),
  /**
   * The input's `value` attribute.
   */
  value: PropTypes.string
};

ATextInput.displayName = "ATextInput";

export default ATextInput;
