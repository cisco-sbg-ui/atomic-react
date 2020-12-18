import PropTypes from "prop-types";
import React, {forwardRef, useRef, useState} from "react";

import AButton from "../AButton";
import AIcon from "../AIcon";
import ATabContext from "./ATabContext";
import {getRoundedBoundedClientRect} from "../../utils/helpers";
import {useCombinedRefs} from "../../utils/hooks";
import "./ATabs.scss";

const ATabGroup = forwardRef(
  (
    {className: propsClassName, children, oversized, scrolling, tall, ...rest},
    ref
  ) => {
    const [tabChanged, setTabChanged] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const tabGroupRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, tabGroupRef);

    let className = "a-tab-group";

    if (oversized) {
      className += " a-tab-group--size-oversized";
    } else if (tall) {
      className += " a-tab-group--size-tall";
    }

    if (scrolling) {
      className += " a-tab-group--scrolling";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let maxTranslateValue = -1;
    let showScrolling = false;
    if (scrolling && combinedRef && combinedRef.current) {
      const wrapper = combinedRef.current.querySelector(
        ".a-tab-group__tab-wrapper"
      );
      maxTranslateValue = wrapper.scrollWidth - wrapper.clientWidth - 1;
      showScrolling = scrolling && wrapper.scrollWidth > wrapper.clientWidth;
    }

    const tabContext = {
      tabChanged,
      setTabChanged,
      translateX,
      scrollToMe: (meRef) => {
        if (!scrolling) return;

        const tabWrapper = combinedRef.current.querySelector(
          ".a-tab-group__tab-wrapper"
        );

        tabWrapper.scrollLeft = 0;

        const selectedTabBounds = getRoundedBoundedClientRect(meRef.current);
        const tabWrapperBounds = getRoundedBoundedClientRect(tabWrapper);

        const translateValue =
          selectedTabBounds.left -
          tabWrapperBounds.left -
          tabWrapperBounds.width / 2 +
          selectedTabBounds.width / 2;

        setTranslateX(
          (current) =>
            -Math.max(
              Math.min(translateValue - 1 - current, maxTranslateValue),
              0
            )
        );
      }
    };

    return (
      <div {...rest} role="tablist" ref={combinedRef} className={className}>
        {showScrolling && (
          <AButton
            tertiaryAlt
            icon
            className="a-tab-group__scroll-left"
            disabled={translateX >= 0}
            onClick={() => {
              const wrapperBounds = getRoundedBoundedClientRect(
                combinedRef.current.querySelector(".a-tab-group__tab-wrapper")
              );

              const tabs = [
                ...combinedRef.current.querySelectorAll(".a-tab-group__tab")
              ].map(getRoundedBoundedClientRect);

              const translateValue =
                Math.max(
                  wrapperBounds.left + translateX,
                  ...tabs
                    .filter((x) => x.left < wrapperBounds.left)
                    .map((x) => x.right)
                ) -
                wrapperBounds.width -
                wrapperBounds.left -
                translateX +
                1;

              const finalTranslateValue = Math.max(translateValue, 0);
              setTranslateX(-finalTranslateValue);
            }}>
            <AIcon>chevron-left</AIcon>
          </AButton>
        )}
        <div className="a-tab-group__tab-wrapper">
          <ATabContext.Provider value={tabContext}>
            {children}
          </ATabContext.Provider>
        </div>
        {showScrolling && (
          <AButton
            tertiaryAlt
            icon
            className="a-tab-group__scroll-right"
            disabled={translateX <= -maxTranslateValue}
            onClick={() => {
              const wrapperBounds = getRoundedBoundedClientRect(
                combinedRef.current.querySelector(".a-tab-group__tab-wrapper")
              );

              const tabs = [
                ...combinedRef.current.querySelectorAll(".a-tab-group__tab")
              ].map(getRoundedBoundedClientRect);

              const translateValue =
                Math.min(
                  ...tabs
                    .filter((x) => x.right > wrapperBounds.right)
                    .map((x) => x.left)
                ) -
                wrapperBounds.left -
                translateX;

              const finalTranslateValue = Math.min(
                translateValue - 1,
                maxTranslateValue
              );
              setTranslateX(-finalTranslateValue);
            }}>
            <AIcon>chevron-right</AIcon>
          </AButton>
        )}
      </div>
    );
  }
);

ATabGroup.propTypes = {
  /**
   * Toggle the oversized style variant.
   */
  oversized: PropTypes.bool,
  /**
   * Toggles scrolling behavior.
   */
  scrolling: PropTypes.bool,
  /**
   * Toggle the tall style variant.
   */
  tall: PropTypes.bool
};

ATabGroup.displayName = "ATabGroup";

export default ATabGroup;
