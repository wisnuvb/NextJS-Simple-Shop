import React from "react";
import Image from "next/image";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useDispatch } from "react-redux";

import { useCart, useCurrency } from "@/hooks";
import {
  cn,
  convertPriceToCurrentFormat,
  formattedCurrency,
  formattedNumber,
} from "@/utils/functions";
import { QuantityControl } from ".";
import { addSelectedCartItem, removeSelectedCartItem } from "@/store/entities";
import { CartItem } from "@/store/models";

interface ProductListProps {
  product: CartItem;
  isCheckout?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  product,
  isCheckout,
}) => {
  const { currencies, currentCurrency } = useCurrency();
  const { selectedCartItems, cartItems } = useCart();

  const dispatch = useDispatch();

  const isCartSelected = selectedCartItems?.some(
    (item) => item?.id === product.id
  );

  const selectedCard = cartItems.find((item) => item.id === product.id);

  const totalCartPrice = convertPriceToCurrentFormat(
    currencies,
    product,
    currentCurrency
  );

  const handleDeleteCartItem = () => {
    dispatch(removeSelectedCartItem(product));
  };

  const handleSelectProduct = () => {
    dispatch(addSelectedCartItem(product));
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-4",
        isCheckout ? "" : "ring-1 ring-gray-200 bg-white p-4 rounded shadow"
      )}
    >
      {!isCheckout && (
        <>
          {isCartSelected ? (
            <MdOutlineCheckBox
              data-testid="unselect-product"
              className="w-6 h-6 cursor-pointer text-gray-500"
              onClick={handleDeleteCartItem}
            />
          ) : (
            <MdOutlineCheckBoxOutlineBlank
              data-testid="select-product"
              className="w-6 h-6 cursor-pointer text-gray-500"
              onClick={handleSelectProduct}
            />
          )}
        </>
      )}
      <Image
        src={product.imageSrc}
        alt={product.title}
        width={65}
        height={65}
        className="rounded"
        blurDataURL="/no-product.webp"
        placeholder="blur"
      />
      <div className="space-y-2">
        <p className="text-base text-gray-700 font-normal">{product.title}</p>
        <p className="text-gray-600 text-sm font-semibold">
          {formattedCurrency(currentCurrency, totalCartPrice)}
        </p>
      </div>
      {isCheckout ? (
        <div className="absolute right-4 bottom-4">
          <h3>x {formattedNumber(product?.quantity)}</h3>
        </div>
      ) : (
        <div className="absolute right-4 bottom-4">
          <QuantityControl product={selectedCard as CartItem} />
        </div>
      )}
    </div>
  );
};
