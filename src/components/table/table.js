import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  & th {
    border: 1px solid #ccd;
    padding: 0.5rem 1rem;
    background-color: #ccc;
  }
  & td {
    padding: 0.5rem;
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
