import React, { useCallback } from "react";
import { Button } from "../../components/buttons";

export const BackToTopButton = ({ href, heading }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Button
      fullWidth
      small
      onClick={ scrollToTop }
      style={{
        backgroundColor: 'var(--color-blueberry-light)',
        color: 'var(--color-blueberry-dark)',
      }}
    >Back to Top</Button>
  );
};
