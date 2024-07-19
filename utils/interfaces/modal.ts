export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  children?: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  handleConfirm?: () => void;
}
