import React, { useCallback } from "react";
import { Button } from "../../components/buttons";
import { ArrowDropUp as ToTopIcon } from '@mui/icons-material'

export const BackToTopButton = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Button
      className="back-to-top-button"
      small
      onClick={ scrollToTop }
      style={{
        display: 'flex',
        justifyContent:'center',
        color: 'var(--color-blueberry-dark)',
        backgroundColor: 'var(--color-blueberry-light)',
      }}
    >
      <span>Back to Top</span>
      &nbsp;&nbsp;&nbsp;
      <ToTopIcon />
    </Button>
  );
};
