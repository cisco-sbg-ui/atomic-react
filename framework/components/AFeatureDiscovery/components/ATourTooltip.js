import React from "react";

import {AContainer, ARow, ACol} from "../../ALayout";
import AButton from "../../AButton";
import AIcon from "../../AIcon";

const ATourTooltip = ({
  index,
  step,
  isLastStep,
  onPrev,
  onClose,
  onNext
}) => {
  return (
    <div
      className="a-tour-tooltip">
      <AContainer fluid>
        <ARow noGutters>
          <ACol>
            <div className="a-tour-tooltip__header">
              {step.title && <div>{step.title}</div>}
            </div>
            {step.content && <div className="a-tour-tooltip__body">{step.content}</div>}
            <div className="a-tour-tooltip__footer">
              {index === 0 && (
                <AButton tertiary onClick={onClose} style={{float: "left"}}>
                  Skip Tour
                </AButton>
              )}
              <div className="a-tour-tooltip__footer__right-buttons">
                {index > 0 && (
                  <AButton onClick={onPrev} tertiary>
                    Back
                  </AButton>
                )}
                <AButton onClick={isLastStep ? onClose : onNext} secondary>
                  {isLastStep ? "Close" : "Next"}
                </AButton>
              </div>
            </div>
          </ACol>
          <ACol style={{maxWidth: 20}}>
            <AButton tertiaryAlt icon style={{padding: 5}} onClick={onClose}>
              <AIcon size={10}>close</AIcon>
            </AButton>
          </ACol>
        </ARow>
      </AContainer>
    </div>
  );
};

ATourTooltip.displayName = "ATourTooltip";

export default ATourTooltip;
