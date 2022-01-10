import PropTypes from "prop-types";
import React, {
  forwardRef,
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef
} from "react";
import ReactDOM from "react-dom";

import {useCombinedRefs} from "../../utils/hooks";
import ATourStep from "./components/ATourStep";
import AAppContext from "../AApp/AAppContext";
import ATargetHighlight from "./components/ATargetHighlight";
import {keyCodes} from "../../utils/helpers";
import "./AFeatureDiscovery.scss";

const ScrollListener = (onScroll, onScrollStop) => {
  let handle = null;
  const onScrollHandler = () => {
    onScroll();
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(onScrollStop, 200); // 200 ms
  };
  window.addEventListener("scroll", onScrollHandler);
  return () => {
    clearTimeout(handle);
    window.removeEventListener("scroll", onScrollHandler);
  };
};

const AFeatureDiscovery = forwardRef(
  (
    {
      children,
      disableScrollIntoView = false,
      steps,
      currentStep = 0,
      className: propsClassName,
      open = false,
      onPrev,
      onNext,
      onClose,
      role = "alertdialog",
      ...rest
    },
    ref
  ) => {
    let className = `a-feature-discovery`;
    if (propsClassName) {
      className += ` ${propsClassName}`;
    }
    let backdropClassName = "a-feature-discovery-backdrop";
    if (open) {
      backdropClassName += " a-feature-discovery-backdrop--active";
      className += " a-feature-discovery--active";
    }
    const step = steps[currentStep];

    const {appRef} = useContext(AAppContext);
    const {targetSelector, placement} = step;
    const targetRef = useRef();
    targetRef.current =
      appRef.current?.querySelector(targetSelector) || appRef.current;
    const [scrolling, setScrolling] = useState();
    const [scrollingSettled, setScrollingSettled] = useState(
      !disableScrollIntoView
    );

    const stepRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, stepRef);

    const keyDownEscHandler = useCallback(
      (e) => {
        if (e.keyCode === keyCodes.esc) {
          onClose && onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      const mountEl = appRef.current;
      if (!mountEl) return;
      mountEl.addEventListener("keydown", keyDownEscHandler);

      return () => mountEl.removeEventListener("keydown", keyDownEscHandler);
    }, [appRef, keyDownEscHandler]);

    const scrollingSettledtimeout = useRef(),
      scrollIntoViewTimeout = useRef();
    useEffect(() => {
      if (disableScrollIntoView || !targetRef.current || !open) {
        return;
      }
      const clearTimeouts = () => {
        if (scrollingSettledtimeout.current) {
          clearTimeout(scrollingSettledtimeout.current);
        }
        if (scrollIntoViewTimeout.current) {
          clearTimeout(scrollIntoViewTimeout.current);
        }
      };
      clearTimeouts();
      setScrollingSettled(false);
      scrollingSettledtimeout.current = setTimeout(
        () => setScrollingSettled(true),
        200
      );
      scrollIntoViewTimeout.current = setTimeout(
        () =>
          targetRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }),
        10
      );

      return () => clearTimeouts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetRef.current, disableScrollIntoView, open]);

    useEffect(() => {
      if (disableScrollIntoView) {
        return;
      }
      const destroyListener = ScrollListener(
        () => setScrolling(true),
        () => setScrolling(false)
      );
      return () => destroyListener();
    }, [disableScrollIntoView]);

    useEffect(() => {
      if (!open || disableScrollIntoView || scrolling || !scrollingSettled) {
        return;
      }
      targetRef.current?.scrollIntoView({
        block: "center"
      });
    }, [disableScrollIntoView, open, scrolling, scrollingSettled]);

    if (
      !appRef.current ||
      !targetRef.current ||
      currentStep < 0 ||
      currentStep > steps.length - 1 ||
      !open ||
      scrolling ||
      !scrollingSettled
    ) {
      return null;
    }

    return ReactDOM.createPortal(
      <>
        <div className={backdropClassName}>
          {placement !== "center" && <ATargetHighlight targetRef={targetRef} />}
        </div>
        <ATourStep
          ref={combinedRef}
          rootRef={appRef}
          open={open}
          index={currentStep}
          isLastStep={currentStep === steps.length - 1}
          step={steps[currentStep]}
          role={role}
          onNext={onNext}
          onPrev={onPrev}
          onClose={onClose}
          className={className}
          {...rest}>
          {children}
        </ATourStep>
      </>,
      appRef.current
    );
  }
);
AFeatureDiscovery.propTypes = {
  /**
   * step array, each step has configuration for popover generated.
   */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * querySelector for anchor.
       */
      targetSelector: PropTypes.string,
      /**
       * content of pop-over.
       */
      content: PropTypes.node,
      /**
       * The placement of the pop-over.
       */
      placement: PropTypes.oneOf([
        "top",
        "top-right",
        "right-top",
        "right",
        "right-bottom",
        "bottom-right",
        "bottom",
        "bottom-left",
        "left-bottom",
        "left",
        "left-top",
        "top-left",
        "center" //target anchor is set to body
      ])
    })
  ).isRequired,
  /**
   * Index of step to use for pop-over
   */
  currentStep: PropTypes.number.isRequired,
  /**
   * Toggles the `open` state.
   */
  open: PropTypes.bool,
  /**
   * Toggles scroll into view for target node.
   */
  disableScrollIntoView: PropTypes.bool,
  /**
   * Event handler for `prev` button on tooltip component
   */
  onPrev: PropTypes.func,
  /**
   * Event handler for `next` button on tooltip component
   */
  onNext: PropTypes.func,
  /**
   * Event handler for `close/skip` button on tooltip component
   */
  onClose: PropTypes.func,
  /**
   * Sets the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role.
   */
  role: PropTypes.string
};

AFeatureDiscovery.displayName = "AFeatureDiscovery";

export default AFeatureDiscovery;
