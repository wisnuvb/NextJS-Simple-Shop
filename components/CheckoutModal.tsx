import React, { FC } from "react";
import size from "lodash/size";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { Modal } from "./modal";
import { ModalProps } from "@/utils/interfaces";
import { useCart, useCurrency } from "@/hooks";
import { ProductList } from "./list";
import {
  convertPriceToCurrentFormat,
  formattedCurrency,
} from "@/utils/functions";
import {
  removeAllCartItems,
  removeAllSelectedCartItems,
} from "@/store/entities";

interface CheckoutModalProps {
  modal: ModalProps;
}

export const CheckoutModal: FC<CheckoutModalProps> = ({ modal }) => {
  const [isConfirm, setIsConfirm] = React.useState(false);

  React.useEffect(() => {
    return () => setIsConfirm(false);
  }, [modal.isOpen]);

  const { cartItems } = useCart();
  const { currencies, currentCurrency } = useCurrency();

  const totalCartPrice = cartItems.reduce((acc, item) => {
    const convertedPrice = convertPriceToCurrentFormat(
      currencies,
      item,
      currentCurrency
    );
    return acc + convertedPrice * item.quantity;
  }, 0);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    setIsConfirm(true);
    dispatch(removeAllCartItems());
    dispatch(removeAllSelectedCartItems());
  };

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      title="Checkout"
      size="xl"
      handleConfirm={handleConfirm}
    >
      {isConfirm ? (
        <div className="flex flex-col items-center justify-center gap-2 min-h-40">
          <Image src="/thanks.png" alt="Thanks" width={100} height={100} />
          <p className="text-base text-gray-600">
            Thank you for taking the time to review my{" "}
            <b>Technical Assignment</b>.
          </p>
          <p>Your feedback is greatly appreciated.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <ProductList key={item.id} product={item} isCheckout />
          ))}
          <div className="flex items-center justify-between border-y border-gray-400 py-4">
            <p className="text-gray-500 text-lg">
              Total Price ({size(cartItems)} Items)
            </p>
            <p className="text-2xl text-gray-600 font-semibold">
              {formattedCurrency(currentCurrency, totalCartPrice)}
            </p>
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="border border-gray-200 py-2 px-4 rounded text-sm text-gray-600 font-semibold"
          onClick={modal.onClose}
        >
          Close
        </button>
        {handleConfirm && !isConfirm && (
          <button
            className="bg-Primary text-white py-2 px-4 rounded text-sm font-semibold"
            onClick={handleConfirm}
          >
            Submit
          </button>
        )}
      </div>
    </Modal>
  );
};
