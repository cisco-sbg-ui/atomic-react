import React, {forwardRef} from "react";
import HelpTooltip from "./HelpTooltip";

const ASearch = forwardRef((props, ref) => {
  const {
    inputRef,
    id = "input",
    label,
    helpTooltipContent,
    helpText,
    type = "text",
    validationState = "success",
    className: inputClassName,
    isSearch = false,
    onChange,
    ...other
  } = props;

  let className = "input";
  if (validationState !== "success") {
    className += " input--state-" + validationState;
  }

  if (inputClassName) {
    className += ` ${inputClassName}`;
  }

  let input = (
    <input
      ref={inputRef}
      id={id}
      type={type}
      className={className}
      onChange={onChange}
      {...other}
    />
  );
  if (isSearch) {
    input = (
      <div className="search">
        <span className="search__icon icon-search" />
        {input}
        <span
          className="search__icon icon-close"
          onClick={(e) => {
            e.stopPropagation();
            onChange({target: {value: ""}});
          }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="form-group__text">
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {helpTooltipContent && <HelpTooltip text={helpTooltipContent} />}
        </label>
      )}
      {input}
      {helpText && (
        <div className="help-block">
          <span className="help-block__text" style={{wordBreak: "break-word"}}>
            {helpText}
          </span>
        </div>
      )}
    </div>
  );
});

ASearch.displayName = "ASearch";

export default ASearch;
