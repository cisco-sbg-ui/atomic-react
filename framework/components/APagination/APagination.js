import PropTypes from "prop-types";
import React, {forwardRef, useEffect, useState} from "react";

import {keyCodes} from "../../utils/helpers";
import AButton from "../AButton";
import AButtonGroup from "../AButtonGroup";
import ATextInput from "../ATextInput";
import AIcon from "../AIcon";
import "./APagination.scss";

const APagination = forwardRef(
  (
    {
      children,
      className: propsClassName,
      onNext,
      onPageChange,
      onPrevious,
      onResultsPerPageChange,
      page = 1,
      resultsPerPage,
      showText,
      total,
      ...rest
    },
    ref
  ) => {
    const [workingResultsPerPage, setWorkingResultsPerPage] = useState(
      resultsPerPage
    );

    const [workingPage, setWorkingPage] = useState(page);

    useEffect(() => {
      setWorkingResultsPerPage(resultsPerPage);
    }, [resultsPerPage]);

    useEffect(() => {
      setWorkingPage(page);
    }, [page]);

    const getNewPage = (newResultsPerPage) => {
      const currentResult = (page - 1) * resultsPerPage + 1;
      const newPage = (currentResult - 1) / newResultsPerPage + 1;
      return Math.floor(newPage);
    };

    let className = `a-pagination`;
    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const content = () => {
      if (total && resultsPerPage) {
        const pages = Math.ceil(total / resultsPerPage);
        return (
          <>
            <div className="a-pagination__results-per-page">
              <ATextInput
                spinner={false}
                onBlur={() => {
                  if (!workingResultsPerPage) {
                    setWorkingResultsPerPage(1);
                    onResultsPerPageChange && onResultsPerPageChange(1);
                    onPageChange && onPageChange(getNewPage(1));
                    return;
                  }

                  onResultsPerPageChange &&
                    onResultsPerPageChange(workingResultsPerPage);
                  onPageChange &&
                    onPageChange(getNewPage(workingResultsPerPage));
                }}
                onChange={(e) =>
                  setWorkingResultsPerPage(
                    Math.min(Math.max(parseInt(e.target.value), 1), total)
                  )
                }
                onKeyDown={(e) => {
                  if (onResultsPerPageChange && e.keyCode === keyCodes.enter) {
                    e.preventDefault();
                    if (!workingResultsPerPage) {
                      setWorkingResultsPerPage(1);
                      onResultsPerPageChange && onResultsPerPageChange(1);
                      onPageChange && onPageChange(getNewPage(1));
                      return;
                    }

                    onResultsPerPageChange(workingResultsPerPage);
                    onPageChange &&
                      onPageChange(getNewPage(workingResultsPerPage));
                  }
                }}
                value={workingResultsPerPage || ""}
                type="number"
              />
              per page
            </div>
            <div className="a-pagination__results">
              {(page - 1) * resultsPerPage + 1}-
              {Math.min(total, (page - 1) * resultsPerPage + resultsPerPage)} of{" "}
              {total}
            </div>
            <AButton
              className="a-pagination__first"
              disabled={page === 1}
              tertiaryAlt
              icon
              onClick={(e) => onPageChange(1)}
              aria-label="First">
              <AIcon left>first-page</AIcon>
            </AButton>
            <AButton
              className="a-pagination__previous"
              disabled={page === 1}
              tertiaryAlt
              icon
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous">
              <AIcon left>chevron-left</AIcon>
            </AButton>
            <div className="a-pagination__page-selection">
              <ATextInput
                spinner={false}
                onBlur={() => {
                  if (!workingPage) {
                    setWorkingPage(1);
                    onPageChange && onPageChange(1);
                    return;
                  }

                  onPageChange && onPageChange(workingPage);
                }}
                onChange={(e) =>
                  setWorkingPage(
                    Math.min(Math.max(parseInt(e.target.value), 1), pages)
                  )
                }
                onKeyDown={(e) => {
                  if (onPageChange && e.keyCode === keyCodes.enter) {
                    e.preventDefault();
                    if (!workingPage) {
                      setWorkingPage(1);
                      onPageChange && onPageChange(1);
                      return;
                    }

                    onPageChange && onPageChange(workingPage);
                  }
                }}
                value={workingPage || ""}
                type="number"
              />
              /{pages}
            </div>
            <AButton
              className="a-pagination__next"
              disabled={page === pages}
              tertiaryAlt
              icon
              onClick={() => onPageChange(page + 1)}
              aria-label="Next">
              <AIcon right>chevron-right</AIcon>
            </AButton>
            <AButton
              className="a-pagination__last"
              disabled={page === pages}
              tertiaryAlt
              icon
              onClick={() => onPageChange(pages)}
              aria-label="Last">
              <AIcon right>last-page</AIcon>
            </AButton>
          </>
        );
      }

      if (total) {
        const startPages = page > 6 ? [1, 2, 3] : [];
        const midPages = [4, 5, 6].includes(page)
          ? Array.from(Array(page + 2), (_, x) => x + 1).filter(
              (x) => x > 0 && x <= total
            )
          : [total - 3, total - 4, total - 5].includes(page)
          ? Array.from(
              Array(total - (page - 3)),
              (_, x) => page - 2 + x
            ).filter((x) => x > 0 && x <= total)
          : Array.from(Array(5), (_, x) => page - 2 + x).filter(
              (x) => x > 0 && x <= total
            );
        const endPages = page < total - 5 ? [total - 2, total - 1, total] : [];

        return (
          <>
            <AButton
              className="a-pagination__previous"
              disabled={page === 1}
              tertiary={showText}
              tertiaryAlt={!showText}
              icon={!showText}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous">
              <AIcon left>chevron-left</AIcon>
              {showText && "Previous"}
            </AButton>
            {!!startPages.length && (
              <>
                <AButtonGroup
                  selectedValues={[page]}
                  onChange={(selectedValue) => onPageChange(selectedValue)}>
                  {startPages.map((x) => (
                    <AButton value={x} key={x}>
                      {x}
                    </AButton>
                  ))}
                </AButtonGroup>
                &hellip;
              </>
            )}
            {midPages.length && (
              <AButtonGroup
                selectedValues={[page]}
                onChange={(selectedValue) => onPageChange(selectedValue)}>
                {midPages.map((x) => (
                  <AButton value={x} key={x}>
                    {x}
                  </AButton>
                ))}
              </AButtonGroup>
            )}
            {!!endPages.length && (
              <>
                &hellip;
                <AButtonGroup
                  selectedValues={[page]}
                  onChange={(selectedValue) => onPageChange(selectedValue)}>
                  {endPages.map((x) => (
                    <AButton value={x} key={x}>
                      {x}
                    </AButton>
                  ))}
                </AButtonGroup>
              </>
            )}
            <AButton
              className="a-pagination__next"
              disabled={page === total}
              tertiary={showText}
              tertiaryAlt={!showText}
              icon={!showText}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next">
              {showText && "Next"}
              <AIcon right>chevron-right</AIcon>
            </AButton>
          </>
        );
      }

      return (
        <>
          <AButton
            className="a-pagination__previous"
            disabled={!onPrevious}
            onClick={(e) => onPrevious(e)}
            aria-label="Previous">
            <AIcon left>chevron-left</AIcon>Previous
          </AButton>
          <AButton
            className="a-pagination__next"
            disabled={!onNext}
            onClick={(e) => onNext(e)}
            aria-label="Next">
            Next<AIcon right>chevron-right</AIcon>
          </AButton>
        </>
      );
    };

    return (
      <div {...rest} ref={ref} className={className}>
        {content()}
      </div>
    );
  }
);

APagination.propTypes = {
  /**
   * Handles the activation of the `Next` button when the number of pages isn't determined.
   */
  onNext: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   * Handles updates to the current page.
   */
  onPageChange: PropTypes.func,
  /**
   * Handes the activation of the `Previous` button when the number of pages isn't determined.
   */
  onPrevious: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   * Handles the submission of results per page values.
   */
  onResultsPerPageChange: PropTypes.func,
  /**
   * Sets the current page.
   */
  page: PropTypes.number,
  /**
   * Sets the results per page.
   */
  resultsPerPage: PropTypes.number,
  /**
   * Toggles whether text is shown on the Previous/Next buttons in the button group view.
   */
  showText: PropTypes.bool,
  /**
   * Sets the total number or results if `resultsPerPage` is defined, otherwise sets the total number of pages.
   */
  total: PropTypes.number
};

APagination.displayName = "APagination";

export default APagination;
