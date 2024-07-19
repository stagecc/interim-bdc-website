import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { Heading } from "../components/typography";
import { Button, IconButton } from "../components/buttons";
import { CloseIcon } from "../components/icons";
import { animated, useSpring } from "react-spring";
import { Overlay, Wrapper, Header, Title, Body, Actions } from "../components/dialog"

const Dialog = ({ onContinue }) => {
  const dialog = useContext(DialogContext);
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
        // esc
        dialog.close();
      }
      if (
        event.keyCode === 9 &&
        !event.shiftKey &&
        document.activeElement ===
          focusableElements[focusableElements.length - 1]
      ) {
        // tab
        focusableElements[0].focus();
        event.preventDefault();
      }
      if (
        event.keyCode === 9 &&
        event.shiftKey &&
        document.activeElement === focusableElements[0]
      ) {
        // shift + tab
        focusableElements[focusableElements.length - 1].focus();
        event.preventDefault();
      }
    },
    [dialog, focusableElements]
  );

  useEffect(() => {
    if (dialog.isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.position = "fixed";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.position = "static";
    };
  }, [dialog.isOpen, handleKeyDown]);

  return (
    <Fragment>
      <Overlay onClick={dialog.close} />
      <Wrapper onKeyDown={handleKeyDown} ref={dialogRef} style={animation}>
        <Header>
          <Title>{dialog.title}</Title>
          <IconButton onClick={dialog.close}>
            <CloseIcon size={24} fill="var(--color-crimson)" />
          </IconButton>
        </Header>
        <Body>{dialog.contents}</Body>
        <Actions>
          <Button onClick={dialog.close} light >
            Cancel
          </Button>
          <Button onClick={onContinue}>Continue</Button>
        </Actions>
      </Wrapper>
    </Fragment>
  );
};

export const DialogContext = React.createContext({});

export const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState();
  const [continueHandler, setContinueHandler] = useState(() => () => {
  });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onContinue = () => {
    continueHandler();
    close();
  };

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        open,
        close,
        title,
        setTitle,
        contents,
        setContents,
        continueHandler,
        setContinueHandler
      }}
    >
      {children}
      {isOpen && <Dialog onContinue={onContinue} />}
    </DialogContext.Provider>
  );
};