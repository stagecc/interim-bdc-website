import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { useFellows } from "../../hooks"
import { FellowsProfile, FellowsLinkList, FellowsLinkListItem } from "./";
import { IconButton } from "../buttons";
import { CloseIcon } from "../icons";
import { Overlay, Wrapper, FellowsHeader, Body } from "../dialog"
import { useSpring } from "react-spring";

const Container = styled.div`
  padding: 0 20px;
`;

const Dialog = ({ isOpen, closeDialog, contents }) => {
  const dialogRef = useRef();
  const [focusableElements, setFocusableElements] = useState([]);

  const animation = useSpring({
    from: {
      transform: "translate(-50%, -100%)",
      opacity: 0
    },
    to: {
      opacity: 1,
      transform: "translate(-50%, -50%)"
    }
  });

  useEffect(() => {
    if (dialogRef.current) {
      setFocusableElements(dialogRef.current.querySelectorAll("button"));
    }
  }, [dialogRef]);

  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 27) {
        closeDialog();
      }
      if (
        event.keyCode === 9 &&
        !event.shiftKey &&
        document.activeElement ===
          focusableElements[focusableElements.length - 1]
      ) {
        focusableElements[0].focus();
        event.preventDefault();
      }
      if (
        event.keyCode === 9 &&
        event.shiftKey &&
        document.activeElement === focusableElements[0]
      ) {
        focusableElements[focusableElements.length - 1].focus();
        event.preventDefault();
      }
    },
    [closeDialog, focusableElements]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.position = "fixed";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.position = "static";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <Fragment>
      <Overlay onClick={closeDialog} />
      <Wrapper onKeyDown={handleKeyDown} ref={dialogRef} style={animation}>
        <FellowsHeader>
          <IconButton onClick={closeDialog}>
            <CloseIcon size={24} fill="var(--color-crimson)" />
          </IconButton>
        </FellowsHeader>
        <Body>{contents}</Body>
      </Wrapper>
    </Fragment>
  );
};


export const FellowsGrid = () => {
  const { allFellows } = useFellows();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setSelectedPerson(null);
    setIsOpen(false)
  };

  const handleClick = (person) => {
    setSelectedPerson(person);
  };

  useEffect(() => {
    if (selectedPerson) {
      setDialogContent(
        <FellowsProfile
          key={selectedPerson.name}
          fellow={selectedPerson}
        />
      );
      openDialog();
    }
  }, [selectedPerson]);

  return (
    <Container>
      <FellowsLinkList>
        {allFellows.map((item, index) => (
          <FellowsLinkListItem key={index} onClick={() => handleClick(item.node.frontmatter)}>
            {item.node.frontmatter.name}
          </FellowsLinkListItem>
        ))}
      </FellowsLinkList>

      <Dialog
        isOpen={isOpen}
        closeDialog={closeDialog}
        contents={dialogContent}
      />
    </Container>
  );
};
