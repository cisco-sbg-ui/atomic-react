import React, {useEffect, useState} from "react";

const ATargetHighlight = ({targetRef, padding = 10}) => {
  const calcStyles = (padding, targetRef) => {
    const elementRect = targetRef.current.getBoundingClientRect();
    return {
      height: Math.round(elementRect.height + padding * 2),
      left: Math.round(elementRect.left - padding),
      opacity: 1,
      pointerEvents: "auto",
      position: "absolute",
      top: Math.round(elementRect.top - padding),
      transition: "opacity 0.2s",
      width: Math.round(elementRect.width + padding * 2),
      borderRadius: 4,
      backgroundColor: "gray"
    };
  };

  const [styles, setStyles] = useState(calcStyles(padding, targetRef));

  useEffect(() => {
    const screenChangeHandler = () => setStyles(calcStyles(padding, targetRef));
    window.addEventListener("resize", screenChangeHandler);
    window.addEventListener("fullscreenchange", screenChangeHandler);

    return () => {
      window.removeEventListener("resize", screenChangeHandler);
      window.removeEventListener("fullscreenchange", screenChangeHandler);
    };
  }, [padding, targetRef]);

  return <div style={styles} />;
};

ATargetHighlight.displayName = "ATargetHighlight";

export default ATargetHighlight;
