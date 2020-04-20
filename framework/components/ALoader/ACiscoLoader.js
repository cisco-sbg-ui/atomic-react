import React, {forwardRef} from "react";

import "./ALoader.scss";

const ACiscoLoader = forwardRef(({className: propsClassName, ...rest}, ref) => {
  let className = "a-cisco-loader";

  if (propsClassName) {
    className += ` ${propsClassName}`;
  }

  return (
    <div
      {...rest}
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      ref={ref}
      className={className}>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-1"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-2"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-3"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-4"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-5"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-6"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-7"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-8"></div>
      <div class="a-cisco-loader__bar a-cisco-loader__bar--index-9"></div>
    </div>
  );
});

export default ACiscoLoader;
