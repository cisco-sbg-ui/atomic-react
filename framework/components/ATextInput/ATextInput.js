import PropTypes from "prop-types";
import React, {forwardRef, useEffect, useRef, useState} from "react";

import "./ATextInput.scss";
import AInputBase from "../AInputBase";
import AIcon from "../AIcon";
import {useCombinedRefs} from "../../utils/hooks";
import {keyCodes} from "../../utils/helpers";

let textInputCounter = 0;

const ATextInput = forwardRef(
  (
    {
      appendIcon,
      autoComplete,
      autoFocus,
      className: propsClassName,
      clearable,
      disabled,
      hint,
      label,
      name,
      onBlur,
      onChange,
      onClear,
      onClick,
      onClickAppend,
      onClickPrepend,
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
    const textInputRef = useRef(null);
    const [textInputId] = useState(textInputCounter++);
    const [isFocused, setIsFocused] = useState(false);
    const combinedRef = useCombinedRefs(ref, textInputRef);
    useEffect(() => {
      if (
        !autoFocus ||
        typeof document === "undefined" ||
        !combinedRef ||
        !combinedRef.current ||
        document.activeElement ===
          combinedRef.current.querySelector(".a-text-input__input")
      )
        return;

      combinedRef.current.querySelector(".a-text-input__input").focus();
    }, [autoFocus, combinedRef]);

    const prependProps = {
      className: "a-text-input__prepend-icon"
    };

    if (!disabled && !readOnly && onClickPrepend) {
      prependProps.className += " interactable";
      prependProps.onClick = onClickPrepend;
      prependProps.onKeyDown = (e) => {
        if (
          onClickPrepend &&
          [keyCodes.enter, keyCodes.space].includes(e.keyCode)
        ) {
          e.preventDefault();
          onClickPrepend(e);
        }
      };
      prependProps.tabIndex = 0;
      prependProps.role = "button";
    }

    const appendProps = {
      className: "a-text-input__append-icon"
    };

    if (!disabled && !readOnly && onClickAppend) {
      appendProps.className += " interactable";
      appendProps.onClick = onClickAppend;
      appendProps.onKeyDown = (e) => {
        if (
          onClickAppend &&
          [keyCodes.enter, keyCodes.space].includes(e.keyCode)
        ) {
          e.preventDefault();
          onClickAppend(e);
        }
      };
      appendProps.tabIndex = 0;
      appendProps.role = "button";
    }

    const inputBaseProps = {
      ...rest,
      ref: combinedRef,
      className: "a-text-input",
      clearable,
      hint,
      label,
      labelFor: `a-text-input_${textInputId}`,
      disabled,
      focused: isFocused,
      append: appendIcon && <AIcon {...appendProps}>{appendIcon}</AIcon>,
      prepend: prependIcon && <AIcon {...prependProps}>{prependIcon}</AIcon>,
      readOnly,
      validationState,
      onClear: () => {
        const e = combinedRef.current.querySelector(".a-text-input__input");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        nativeInputValueSetter.call(e, "");
        var event = new Event("input", {bubbles: true});
        e.dispatchEvent(event);
        onClear && onClear(e);
      }
    };

    if (propsClassName) {
      inputBaseProps.className += ` ${propsClassName}`;
    }

    const inputProps = {
      autoComplete,
      className: "a-text-input__input",
      disabled,
      id: `a-text-input_${textInputId}`,
      name,
      onBlur: (e) => {
        setIsFocused(false);
        onBlur && onBlur(e);
      },
      onChange,
      onClick,
      onFocus: (e) => {
        setIsFocused(true);
        onFocus && onFocus(e);
      },
      onKeyUp,
      onPaste,
      placeholder,
      readOnly,
      type,
      value
    };

    return (
      <AInputBase {...inputBaseProps}>
        <input {...inputProps} />
      </AInputBase>
    );
  }
);

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
   * Toggles whether the input auto-focuses on mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Toggles whether to display a clearable icon.
   */
  clearable: PropTypes.bool,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the hint content.
   */
  hint: PropTypes.node,
  /**
   * Sets the label content.
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
   * Handles the `change` event.
   */
  onChange: PropTypes.func,
  /**
   * Handles the `clear` event (for supplemental handling).
   */
  onClear: PropTypes.func,
  /**
   * Handles the `click` event for the input.
   */
  onClick: PropTypes.func,
  /**
   * Handles the `click` event for an appended icon.
   */
  onClickAppend: PropTypes.func,
  /**
   * Handles the `click` event for a prepended icon.
   */
  onClickPrepend: PropTypes.func,
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
  type: PropTypes.oneOf(["text", "password", "email", "number"]),
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
