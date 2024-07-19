import React, { FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { cn } from "@/utils/functions";
import {
  addCartQuantity,
  removeCartItem,
  removeCartQuantity,
} from "@/store/entities";
import { CartItem } from "@/store/models";

interface QuantityControlProps {
  product: CartItem;
}

export const QuantityControl: FC<QuantityControlProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleDeleteCart = () => {
    dispatch(removeCartItem(product));
    toast.success("Product removed from cart");
  };

  const handleAddQuantity = () => {
    dispatch(addCartQuantity(product));
  };

  const handleRemoveQuantity = () => {
    if (product.quantity > 1) dispatch(removeCartQuantity(product));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      dispatch(removeCartItem(product));
      toast.success("Product removed from cart");
      return;
    }

    dispatch(
      addCartQuantity({
        ...product,
        quantity: parseInt(e.target.value),
      })
    );
  };

  return (
    <div className="flex items-center gap-3">
      <FaRegTrashAlt
        data-testid="btn-delete-cart"
        className="w-4 h-4 cursor-pointer text-coolGray-500"
        onClick={handleDeleteCart}
      />
      <div className="flex justify-between items-center w-fit ring-1 ring-gray-400 rounded px-2 py-1">
        <FaMinus
          data-testid="btn-subtract-quantity"
          className={cn(
            "text-gray-500 w-4 h-4 cursor-pointer",
            product?.quantity === 1 && "cursor-not-allowed text-gray-300"
          )}
          onClick={handleRemoveQuantity}
        />
        <input
          data-testid="input-quantity"
          type="number"
          className={cn(
            "w-8 text-center text-sm bg-white hover:outline-none focus-visible:outline-none"
          )}
          onChange={handleChange}
          value={product?.quantity || 1}
        />
        <FaPlus
          data-testid="btn-add-quantity"
          className={cn("text-gray-500 w-4 h-4 cursor-pointer")}
          onClick={handleAddQuantity}
        />
      </div>
    </div>
  );
};
