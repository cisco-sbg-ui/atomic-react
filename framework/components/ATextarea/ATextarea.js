import PropTypes from "prop-types";
import React, {forwardRef, useEffect, useRef, useState} from "react";

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

    let className = "a-textarea";
    if (autoGrow) {
      className += " a-textarea--auto-grow";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let fieldClassName = "a-textarea__field";
    if (validationState !== "default") {
      fieldClassName += " a-textarea__field--state-" + validationState;
    }

    const additionalTextareaProps = {};
    if (disableGrammarly) {
      additionalTextareaProps["data-gramm"] = false;
    }

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

    const onChange = (e) => {
      if (autoGrow) {
        calculateInputHeight();
      }

      propsOnChange && propsOnChange(e);
    };

    return (
      <div {...rest} ref={combinedRef} className={className}>
        {label && (
          <label
            htmlFor={`a-textarea__field_${textareaId}`}
            className="a-textarea__label">
            {label}
          </label>
        )}
        <textarea
          {...additionalTextareaProps}
          id={`a-textarea__field_${textareaId}`}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={rows}
          className={fieldClassName}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onPaste={onPaste}
        />
      </div>
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
   * Sets the textarea label text.
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
