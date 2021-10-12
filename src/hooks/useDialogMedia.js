import { useState } from "react";

export const useDialogMedia = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOnDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleOnDialogClose() {
    isDialogOpen && setIsDialogOpen(false);
  }

  return {
    isDialogOpen,
    handleOnDialogOpen,
    handleOnDialogClose
  };
};
