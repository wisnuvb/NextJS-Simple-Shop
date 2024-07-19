import React from "react";
import { ModalProps } from "@/utils/interfaces";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const modal: ModalProps = {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  };

  return { modal };
};
