import React from "react";
import styled from "styled-components";

export const Table = ({
  columns,
  rows,
}) => {
  return (
    <StyledTable>
      <THead>
        <tr>
          {columns.map(({ headerCell, key }) => (
            <Th key={String(key)}>{headerCell}</Th>
          ))}
        </tr>
      </THead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(({ key, render, width }) => (
              <Td
                style={{ width }}
                title={!render ? row[key] : undefined}
                key={String(key)}
              >
                {render ? render(row) : row[key]}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  all: unset;
  display: table;
  width: 100%;
`

const THead = styled.thead`
  background-color: var(--color-lightgrey);
  text-align: left;
  position: sticky;
  top: 0;
`

const Th = styled.th`
  padding: 10px;
  border-bottom: 1px solid var(--color-grey);
`

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--color-grey);
  display: table-cell;
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`