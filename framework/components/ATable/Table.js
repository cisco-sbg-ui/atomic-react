import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const Table = ({children, type, ...rest}) => {
  return (
    <table
      className={classnames("table", type && `table--type-${type}`)}
      {...rest}>
      {children}
    </table>
  );
};

export const TableRow = ({children, header = false, ...rest}) => (
  <tr
    className={classnames(header ? "table__header-row" : "table__row")}
    {...rest}>
    {children}
  </tr>
);

export const TableCell = ({align, children, header = false, ...rest}) => {
  const Component = header ? "th" : "td";
  return (
    <Component
      className={classnames({
        table__cell: !header,
        "table__header-cell": !!header,
        [`table__cell--align-${align}`]: !!align && !header,
        [`table__header-cell--align-${align}`]: !!align && !!header
      })}
      {...rest}>
      {children}
    </Component>
  );
};

Table.propTypes = {
  type: PropTypes.oneOf(["striped", "tight"])
};

TableRow.propTypes = {
  header: PropTypes.bool
};

TableCell.propTypes = {
  align: PropTypes.oneOf(["center", "left", "right"]),
  header: PropTypes.bool
};
