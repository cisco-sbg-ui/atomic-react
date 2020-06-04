import PropTypes from "prop-types";
import React, {forwardRef, useEffect, useRef, useState} from "react";

import AInputBase from "../AInputBase";
import {useCombinedRefs} from "../../utils/hooks";
import "./ATextarea.scss";

let textareaCounter = 0;

const ATextarea = forwardRef(
  (
    {
      autoGrow,
      className: propsClassName,
      disabled,
      disableGrammarly,
      hint,
      label,
      onBlur,
      onChange: propsOnChange,
      onFocus,
      onKeyUp,
      onPaste,
      placeholder,
      readOnly,
      rows = 3,
      validationState = "default",
      value,
      ...rest
    },
    ref
  ) => {
    const textareaRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, textareaRef);
    const [isFocused, setIsFocused] = useState(false);
    const [textareaId] = useState(textareaCounter++);

    useEffect(() => {
      if (autoGrow) {
        calculateInputHeight();
      } else {
        const input =
          combinedRef.current &&
          combinedRef.current.querySelector(".a-textarea__field");
        if (!input) return;

        input.style.height = "auto";
      }
    }, [autoGrow]); // eslint-disable-line react-hooks/exhaustive-deps

    const calculateInputHeight = () => {
      const input =
        combinedRef.current &&
        combinedRef.current.querySelector(".a-textarea__field");
      if (!input) return;

      input.style.height = "0";
      const height = input.scrollHeight;
      const minHeight = rows * 18.4; /* <- row height */
      input.style.height = Math.max(minHeight, height) + "px";
    };

    const inputBaseProps = {
      ...rest,
      ref: combinedRef,
      className: "a-textarea",
      focused: isFocused,
      hint,
      label,
      labelFor: `a-textarea__field_${textareaId}`,
      disabled,
      readOnly,
      validationState
    };

    if (autoGrow) {
      inputBaseProps.className += " a-textarea--auto-grow";
    }

    if (propsClassName) {
      inputBaseProps.className += ` ${propsClassName}`;
    }

    const fieldProps = {
      className: "a-textarea__field",
      id: `a-textarea__field_${textareaId}`,
      disabled,
      placeholder,
      readOnly,
      rows,
      value,
      onBlur: (e) => {
        setIsFocused(false);
        onBlur && onBlur(e);
      },
      onChange: (e) => {
        if (autoGrow) {
          calculateInputHeight();
        }

        propsOnChange && propsOnChange(e);
      },
      onFocus: (e) => {
        setIsFocused(true);
        onFocus && onFocus(e);
      },
      onKeyUp,
      onPaste
    };

    if (disableGrammarly) {
      fieldProps["data-gramm"] = false;
    }

    return (
      <AInputBase {...inputBaseProps}>
        <textarea {...fieldProps} />
      </AInputBase>
    );
  }
);

ATextarea.propTypes = {
  /**
   * Toggles height resize behavior based on content length.
   */
  autoGrow: PropTypes.bool,
  /**
   * Toggles the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * Toggles whether to disable the Grammarly browser extension.
   */
  disableGrammarly: PropTypes.bool,
  /**
   * Sets the hint content.
   */
  hint: PropTypes.node,
  /**
   * Sets the label content.
   */
  label: PropTypes.node,
  /**
   * Handles the `blur` event
   */
  onBlur: PropTypes.func,
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
   * Sets the textarea placeholder text.
   */
  placeholder: PropTypes.string,
  /**
   * Toggles the read-only state.
   */
  readOnly: PropTypes.bool,
  /**
   * Sets the default number of rows for the textarea.
   */
  rows: PropTypes.number,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"]),
  /**
   * Sets the textarea value.
   */
  value: PropTypes.string
};

ATextarea.displayName = "ATextarea";

export default ATextarea;
