import axios from 'axios';
import { useState } from 'react';

export const useDocumentation = () => {
  const [content, setContent] = useState(null);

  return {
    content,
  };
};
