import React, {forwardRef} from "react";

export default forwardRef((props, ref) => {
  const {inline} = props;

  return (
    <div ref={ref} className={"loader" + (inline ? " inline" : "")}>
      <div className="loader__dot" />
      <div className="loader__dot" />
      <div className="loader__dot" />
    </div>
  );
});
