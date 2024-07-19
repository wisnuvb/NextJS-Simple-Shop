import React, { FC } from "react";

import { ModalProps } from "@/utils/interfaces";
import { cn } from "@/utils/functions";

export const Modal: FC<ModalProps> = ({ isOpen, children, title, size }) => {
  const sizeStyle = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[size ?? "md"];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            data-testid="modal"
            className={cn(
              "bg-white p-6 rounded-lg shadow-lg w-full",
              sizeStyle
            )}
          >
            <h2 className="text-lg font-bold shadow pb-3 -mx-6 px-6">
              {title ?? "Information"}
            </h2>
            <main className="mt-4">{children}</main>
          </div>
        </div>
      )}
    </>
  );
};
