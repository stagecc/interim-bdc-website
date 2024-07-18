import React, { useState } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFellows } from "../../hooks"
import { FellowsProfile, FellowsLinkList, FellowsLinkListItem } from "./";
import { useDialog } from "../../hooks";

const Container = styled.div`
  padding: 0 20px;
`;

export const FellowsGrid = () => {
  const { allFellows } = useFellows()
  const [selectedPerson, setSelectedPerson] = useState(allFellows[0].node.frontmatter);
  const dialog = useDialog();

  const handleClick = (person) => { 
    setSelectedPerson(person);

    dialog.setContents(
      <FellowsProfile
        key={selectedPerson.name}
        fellow={selectedPerson}
      />
    );
    dialog.open();
    setSelectedPerson(null);
  };

  return (
    <Container>
      <FellowsLinkList>
        {allFellows.map((item, index) => (
            <FellowsLinkListItem key={index} onClick={()=>(handleClick(item.node.frontmatter))}>
              {item.node.frontmatter.name}
            </FellowsLinkListItem>
        ))}
      </FellowsLinkList>
    </Container>
  )
}