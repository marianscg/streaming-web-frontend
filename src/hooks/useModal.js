import { useState } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const changeToOpen = () => {
      setIsOpen(!isOpen);
    };
  
    return {
      isOpen,
      changeToOpen,
    };
}
