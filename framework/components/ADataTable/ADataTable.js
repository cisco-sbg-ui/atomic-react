import PropTypes from "prop-types";
import React, {forwardRef, useRef, useState} from "react";

import AInView from "../AInView";
import AIcon from "../AIcon";
import ASimpleTable from "../ASimpleTable";
import ACheckbox from "../ACheckbox";
import "./ADataTable.scss";

/**
 * Used inside ADataTable to enable proper styling
 * for infinite scrolling
 */
const ADataTableWrapper = React.forwardRef(
  ({shouldWrap, maxHeight, style, children, ...rest}, ref) => {
    if (!shouldWrap) {
      return children;
    }

    return (
      <div
        ref={ref}
        data-testid="table-wrapper"
        style={{
          ...style,
          overflowY: "scroll",
          maxHeight
        }}
        {...rest}>
        {children}
      </div>
    );
  }
);

ADataTableWrapper.displayName = "ADataTableWrapper";

const ADataTable = forwardRef(
  (
    {
      className: propsClassName,
      headers,
      items,
      maxHeight,
      onSort,
      sort,
      onScrollToEnd,
      selectable,
      selectedRowIds: propsSelectedRowIds = [],
      onRowSelected,
      ...rest
    },
    ref
  ) => {
    const tableWrapperRef = useRef();
    const [selectedRowIds, setSelectedRowIds] = useState(propsSelectedRowIds);

    const selectAll = (e) => {
      const toggled = items
        .filter((item, index) => {
          const indexOf = selectedRowIds.indexOf(item.rowId || index);
          return selectedRowIds.length === items.length
            ? indexOf !== -1
            : indexOf === -1;
        })
        .map((item, index) => item.rowId || index);

      const newSelection =
        selectedRowIds.length === items.length
          ? []
          : items.map((item, index) => item.rowId || index);

      setSelectedRowIds(newSelection);
      onRowSelected && onRowSelected(toggled, newSelection);
    };

    const selectRow = (id, selected) => {
      const newSelection = [...selectedRowIds];
      if (selected) {
        const selectedIndex = newSelection.indexOf(id);
        newSelection.splice(selectedIndex, 1);
      } else {
        newSelection.push(id);
      }
      setSelectedRowIds(newSelection);
      onRowSelected && onRowSelected(id, newSelection);
    };

    const getRowSelectionCheckBox = (row, index) => {
      const id = row.rowId || index;
      const isRowSelected = selectedRowIds.indexOf(id) !== -1;

      return (
        <td>
          <ACheckbox
            checked={isRowSelected}
            onClick={() => {
              selectRow(id, isRowSelected);
            }}></ACheckbox>
        </td>
      );
    };

    let className = "a-data-table";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let sortedItems = items;
    if (sort) {
      const sortDir = sort.direction === "desc" ? -1 : 1;
      const targetHeader = Object.values(headers).find(
        (x) => x.key === sort.key
      );

      let sortFunc = (a, b) => (a === b ? 0 : a < b ? -1 : 1);

      if (targetHeader && typeof targetHeader.sort === "function") {
        sortFunc = targetHeader.sort;
      }

      if (!targetHeader || targetHeader.sort !== false) {
        sortedItems.sort(
          (a, b) => sortDir * sortFunc(a[sort.key], b[sort.key])
        );
      }
    }
    return (
      headers &&
      items && (
        <ADataTableWrapper
          ref={tableWrapperRef}
          shouldWrap={typeof onScrollToEnd === "function" || maxHeight}
          maxHeight={maxHeight}>
          <ASimpleTable {...rest} ref={ref} className={className}>
            {headers && (
              <thead>
                <tr>
                  {selectable && (
                    <th
                      className="a-data-table__header"
                      role="columnheader"
                      scope="col">
                      <ACheckbox
                        checked={selectedRowIds.length === items.length}
                        onClick={selectAll}
                        indeterminate={
                          !!(
                            selectedRowIds.length &&
                            selectedRowIds.length < items.length
                          )
                        }></ACheckbox>
                    </th>
                  )}
                  {headers.map((x, i) => {
                    const headerProps = {
                      className: `a-data-table__header ${
                        x.sortable ? "a-data-table__header--sortable" : ""
                      } text-${x.align || "start"} ${x.className || ""}`
                        .replace("  ", " ")
                        .trim(),
                      role: "columnheader",
                      scope: "col",
                      "aria-label": x.name
                    };

                    if (x.sortable) {
                      if (!sort || x.key !== sort.key) {
                        headerProps["aria-label"] +=
                          ": Not sorted. Activate to sort ascending.";
                        headerProps["aria-sort"] = "none";
                      } else if (sort && sort.direction === "asc") {
                        headerProps["aria-label"] +=
                          ": Sorted ascending. Activate to sort descending.";
                        headerProps["aria-sort"] = "ascending";
                      } else {
                        headerProps["aria-label"] +=
                          ": Sorted descending. Activate to remove sorting.";
                        headerProps["aria-sort"] = "descending";
                      }

                      headerProps.onClick = () => {
                        onSort &&
                          onSort(
                            sort &&
                              sort.key === x.key &&
                              sort.direction === "desc"
                              ? null
                              : {
                                  key: x.key,
                                  direction:
                                    sort &&
                                    x.key === sort.key &&
                                    sort.direction === "asc"
                                      ? "desc"
                                      : "asc"
                                }
                          );
                      };
                    }

                    return (
                      <th {...headerProps} key={`a-data-table_header_${i}`}>
                        {x.align !== "end" ? x.name : ""}
                        {x.sortable && (
                          <AIcon
                            left={x.align === "end"}
                            right={x.align !== "end"}
                            className={`a-data-table__header__sort ${
                              sort && x.key === sort.key
                                ? "a-data-table__header__sort--active"
                                : ""
                            }`}>
                            {sort &&
                            x.key === sort.key &&
                            sort.direction === "desc"
                              ? "chevron-down"
                              : "chevron-up"}
                          </AIcon>
                        )}
                        {x.align === "end" ? x.name : ""}
                      </th>
                    );
                  })}
                </tr>
              </thead>
            )}
            <tbody>
              {sortedItems.map((x, i) => {
                const isLastRow = i == items.length - 1;
                const isInfiniteScrollTarget =
                  isLastRow && typeof onScrollToEnd === "function";
                const key = `a-data-table_row_${i}`;
                const rowContent = (
                  <tr key={key}>
                    {selectable && getRowSelectionCheckBox(x, i)}
                    {headers.map((y, j) => (
                      <td
                        key={`a-data-table_cell_${j}`}
                        className={`text-${y.align || "start"} ${
                          y.cell?.className || ""
                        }`.trim()}>
                        {y.cell && y.cell.component
                          ? y.cell.component(x)
                          : x[y.key]}
                      </td>
                    ))}
                  </tr>
                );

                if (!isInfiniteScrollTarget) {
                  return rowContent;
                }

                return (
                  <AInView
                    key={key}
                    triggerOnce
                    onChange={({inView, entry}) => {
                      if (inView) {
                        onScrollToEnd(entry);
                      }
                    }}>
                    {rowContent}
                  </AInView>
                );
              })}
            </tbody>
          </ASimpleTable>
        </ADataTableWrapper>
      )
    );
  }
);

ADataTable.propTypes = {
  /**
   * Toggles the `altLinks` display variant. If the table has many links, use this to display them in the base text color.
   */
  altLinks: PropTypes.bool,
  /**
   * Sets the table headers.
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string,
      className: PropTypes.string,
      align: PropTypes.oneOf(["start", "center", "end"]),
      sortable: PropTypes.bool,
      sort: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      cell: PropTypes.shape({
        className: PropTypes.string,
        component: PropTypes.func
      })
    })
  ).isRequired,
  /**
   * Sets the table data.
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Called when the user reaches the bottom of the data table for the first time.
   */
  onScrollToEnd: PropTypes.func,
  /**
   * Handles the `sort` event.
   */
  onSort: PropTypes.func,
  /**
   * Sets the sort.
   */
  sort: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["asc", "desc"])
  }),
  /**
   * Toggles the `striped` display variant. Darkened backgrounds for alternate rows.
   */
  striped: PropTypes.bool,
  /**
   * Toggles the `tight` display variant. Smaller row heights.
   */
  tight: PropTypes.bool,
  /**
   * Toggles the `selectable` display variant.
   * The `selectable` prop will render a checkbox in the header to toggle all rows, and a checkbox for each row.
   */
  selectable: PropTypes.bool,
  /**
   * List of row ids for default selected rows.
   */
  selectedRowIds: PropTypes.array,
  /**
   * Handles the 'toggle selection' event.
   */
  onRowSelected: PropTypes.func
};

ADataTable.displayName = "ADataTable";

export default ADataTable;
