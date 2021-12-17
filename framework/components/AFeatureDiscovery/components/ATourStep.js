import React, {useEffect, useRef, forwardRef} from "react";

import APopover from "../../APopover";
import ATourTooltip from "./ATourTooltip";

import ADialog from "../../ADialog";

const ATourStep = forwardRef(({
  children,
  rootRef,
  isLastStep,
  index,
  step,
  role,
  onNext,
  onPrev,
  onClose,
  ...rest
}, ref) => {
  const {placement, targetSelector} = step;

  const target = rootRef.current.querySelector(targetSelector);
  const anchorRef = useRef();
  anchorRef.current = target;

  useEffect(() => {
    document.querySelector("html").style.overflow = "hidden";
    return () => (document.querySelector("html").style.overflow = "unset");
  }, []);

  const tooltipProps = {
    index,
    step,
    isLastStep,
    onNext,
    onPrev,
    onClose
  };
  const tooltipComponent = children ? (
    children(tooltipProps)
  ) : (
    <ATourTooltip {...tooltipProps}></ATourTooltip>
  );
  
  if (placement === "center") {
    return (
      <ADialog ref={ref} open={true} {...rest}>
        {tooltipComponent}
      </ADialog>
    );
  }

  return (
    <APopover
      {...rest}
      ref={ref}
      role={role}
      open={true}
      placement={placement}
      anchorRef={anchorRef.current ? anchorRef : rootRef}
      pointer={true}
      type="dialog"
      tabIndex={-1}>
      {tooltipComponent}
    </APopover>
  );
});

ATourStep.displayName = "ATourStep";

export default ATourStep;
