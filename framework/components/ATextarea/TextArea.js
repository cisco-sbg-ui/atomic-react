import React, {forwardRef} from "react";

export default forwardRef((props, ref) => {
  const {
    id = "textarea",
    inputRef,
    label,
    helpTooltipContent,
    validationState = "success",
    rows = "3",
    ...other
  } = props;

  let className = "textarea";
  if (validationState !== "success") {
    className += " textarea--state-" + validationState;
  }

  return (
    <div ref={ref} className="form-group__text">
      <label htmlFor={id} className="label">
        {label}
        {helpTooltipContent && <HelpTooltip text={helpTooltipContent} />}
      </label>
      <textarea
        ref={inputRef}
        id={id}
        rows={rows}
        className={className}
        {...other}
      />
    </div>
  );
});
