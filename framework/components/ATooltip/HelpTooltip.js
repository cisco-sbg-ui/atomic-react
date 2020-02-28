import React from "react";
import {Sprite, Tippy} from "@cisco-ats/components";

export default props => {
  if (!props.text && !props.tooltipKey) {
    return null;
  }

  let icon;
  if (props.info) {
    icon = (
      <Sprite
        name="ats-components-information"
        style={{vertialAlign: "text-top", height: "12px", width: "12px"}}
      />
    );
  } else {
    icon = (
      <Sprite
        name="ats-components-help"
        style={{height: "14px", width: "14px"}}
      />
    );
  }

  return (
    <Tippy
      content={props.text}
      duration={200}
      animateFill={false}
      arrow={true}
      placement={props.placement || "top"}
      boundary="viewport"
      animation="scale">
      {props.children ? (
        props.children
      ) : (
        <span className="mask-help-tooltip-icon">{icon}</span>
      )}
    </Tippy>
  );
};
