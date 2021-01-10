import { Button, Typography } from "@solness/ui";
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";

export interface Props {
  title: string;
  open?: boolean;
  children: ReactNode;
  size?: "base" | "small";
  onClose?: () => void;
}

const Modal: FunctionComponent<Props> = ({
  children,
  title,
  open = false,
  size = "base",
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  const themeSize = size === "base" ? "sm:w-5/6 max-w-4xl" : "max-w-md";
  const defaultTheme = `bg-white mt-16 mb-16 p-6 rounded-lg shadow-sm mx-auto`;
  const theme = `${defaultTheme} ${themeSize}`;

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-300 bg-opacity-90 overflow-y-auto">
      <div className={theme}>
        <div className="mb-6 flex justify-between items-center">
          <Typography size="xsmall" weight="bold">
            {title.toUpperCase()}
          </Typography>

          <Button
            transparent
            icon="close"
            iconColor="black"
            onClick={handleClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
