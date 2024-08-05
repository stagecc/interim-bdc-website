import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f6f3;
  & th {
    border: 1px solid #ccd;
    padding: 0.5rem 1rem;
    background-color: #ddd;
  }
  & td {
    padding: 1rem;
    margin: 0;
    vertical-align: top;
    border: 1px solid #ddd;
  }
  & tr {
    border: 1px solid #ccd;
  }
  & tr:nth-child(2n) {
    // background-color: var(--color-grey)33;
  }
`;
