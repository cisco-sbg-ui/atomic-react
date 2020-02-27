import React, {forwardRef} from "react";
import {Tippy} from "@cisco-ats/components";

export default forwardRef(
  (
    {
      label,
      icon,
      onClick,
      onClose,
      info,
      infoAlt,
      success,
      warning,
      warningAlt,
      danger,
      tippyText,
      link,
      closeTippyText,
      tooltip = true,
      linkClass
    },
    ref
  ) => {
    let className = "tag ";

    if (info) {
      className += "tag--state-info";
    } else if (infoAlt) {
      className += "tag--state-info-alt";
    } else if (success) {
      className += "tag--state-success";
    } else if (warning) {
      className += "tag--state-warning";
    } else if (warningAlt) {
      className += "tag--state-warning-alt";
    } else if (danger) {
      className += "tag--state-danger";
    }

    const innerContent = (
      <>
        {icon && <span className={`icon ${icon}`} />}
        {label}
      </>
    );

    let tagContent;
    if (linkClass && link) {
      const LinkClass = linkClass;
      tagContent = <LinkClass to={link}>{innerContent}</LinkClass>;
    } else {
      tagContent = innerContent;
    }

    return (
      <div ref={ref} className={className}>
        <Tippy content={tooltip && (tippyText || label)} duration={200} arrow>
          <span className="tag__title" onClick={onClick}>
            {tagContent}
          </span>
        </Tippy>
        {onClose && (
          <Tippy content={closeTippyText || "Remove"} duration={200} arrow>
            <span className="tag__icon icon-close" onClick={onClose} />
          </Tippy>
        )}
      </div>
    );
  }
);
