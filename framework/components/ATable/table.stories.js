import React from "react";

import {storiesOf} from "@storybook/react";

import {Table, TableCell, TableRow} from "./Table";

const EXAMPLE = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"];
const EXAMPLE_COMPOSED = [
  {
    name: "Norbert Rath",
    role: "JavaScript Ninja"
  },
  {
    name: "Lafayette Thiel",
    role: "UX Rockstar"
  },
  {
    name: "Isaias Purdy",
    role: "CSS Wizard"
  },
  {
    name: "Toy Rau",
    role: "HTML Viking"
  },
  {
    name: "Alfreda Swaniawski IV",
    role: "Scrum Conquistador"
  }
];

storiesOf("Table")
  .add("configurable", () => {
    const rows = number("row count", 10);
    const type = select("type", ["(none)", "tight", "striped"], "(none)");

    return (
      <Table type={type}>
        <TableRow header>
          {EXAMPLE.map((ex, cell) => (
            <TableCell header key={cell}>
              {ex}
            </TableCell>
          ))}
        </TableRow>

        {new Array(rows).fill(true).map((_, row) => (
          <TableRow key={row}>
            {EXAMPLE.map((ex, cell) => (
              <TableCell key={cell}>{ex}</TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    );
  })
  .add("composed", () => {
    const MyComposedTable = ({data}) => {
      if (!data || !data.length) return null;
      return (
        <Table>
          <TableRow header>
            {Object.keys(data[0]).map((header, headerIndex) => (
              <TableCell
                header
                key={headerIndex}
                style={{textTransform: "capitalize"}}>
                {header}
              </TableCell>
            ))}
          </TableRow>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </Table>
      );
    };
    return <MyComposedTable data={EXAMPLE_COMPOSED} />;
  });
