import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { Item } from "@/common/types";
import { addCartItem } from "@/store/entities";
import {
  cn,
  convertPriceToCurrentFormat,
  formattedCurrency,
} from "@/utils/functions";
import { useCart, useCurrency } from "@/hooks";
import { QuantityControl } from "../list";

interface ProductCardProps {
  product: Item;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const { cartItems } = useCart();
  const { currencies, currentCurrency } = useCurrency();

  const cart = cartItems.find((item) => item.id === product.id);

  const handleSelectProduct = () => {
    if (!cart) {
      dispatch(addCartItem({ ...product, quantity: 1 }));
    }
  };

  const formattedPrice = +convertPriceToCurrentFormat(
    currencies,
    product,
    currentCurrency
  ).toFixed(2);

  return (
    <div className="shadow-sm ring-1 ring-gray-200 rounded-lg bg-white hover:shadow-lg transition-all duration-300">
      <figure>
        <Image
          src={product.imageSrc}
          alt={product.title}
          width={300}
          height={200}
          className="rounded-t-lg object-cover"
          blurDataURL="/no-product.webp"
          placeholder="blur"
        />
      </figure>
      <div className="px-4 pt-2 pb-3">
        <div className="space-y-2 mb-4">
          <h2 className="text-base text-gray-700 font-medium">
            {product.title}
          </h2>
          <p className="text-xs text-gray-500">{product.description}</p>
          <p className="text-lg text-slate-600 font-bold">
            {formattedCurrency(currentCurrency, formattedPrice)}
          </p>
        </div>
        {cart ? (
          <QuantityControl product={cart} />
        ) : (
          <button
            data-testid="btn-add-to-cart"
            type="button"
            className={cn(
              "bg-Primary hover:bg-Primary/85 text-white flex items-center justify-center gap-2 py-2 px-4 rounded text-sm font-semibold w-full disabled:bg-Primary/45 disabled:cursor-not-allowed transition-all duration-300"
            )}
            disabled={!!cart}
            onClick={handleSelectProduct}
          >
            <FaCartShopping /> Add
          </button>
        )}
      </div>
    </div>
  );
};
