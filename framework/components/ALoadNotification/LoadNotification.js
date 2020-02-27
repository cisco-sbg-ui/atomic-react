import React, {forwardRef} from "react";

export default forwardRef((props, ref) => {
  const {
    level = "warning",
    message = "There was not enough data to render this chart.",
    icon = false
  } = props;

  return (
    <div ref={ref} className="load">
      {icon && <div className={`load__icon icon-${level}`} />}
      <div className="load__body">{message}</div>
    </div>
  );
});
