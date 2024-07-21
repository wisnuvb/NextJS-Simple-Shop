import React from "react";
import { useDispatch } from "react-redux";
import size from "lodash/size";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import toast from "react-hot-toast";

import {
  cn,
  convertPriceToCurrentFormat,
  formattedCurrency,
} from "@/utils/functions";
import { ProductList } from "./list";
import { useCart, useCurrency } from "@/hooks";
import {
  bulkRemoveCartItem,
  removeAllSelectedCartItems,
  selectAllCartItems,
} from "@/store/entities";
import { EmptyCard } from "./cards";

export const Cart = () => {
  const { currencies, currentCurrency } = useCurrency();
  const { selectedCartItems, cartItems } = useCart();

  const dispatch = useDispatch();

  const isSelectProduct = size(cartItems) > 0;

  const totalCartPrice = cartItems.reduce((acc, item) => {
    const convertedPrice = convertPriceToCurrentFormat(
      currencies,
      item,
      currentCurrency
    );
    return acc + convertedPrice * item.quantity;
  }, 0);

  const handleBulkRemoveCartItem = () => {
    dispatch(bulkRemoveCartItem());
    toast.success("Successfully removed all products from cart");
  };

  return (
    <div className={cn("col-span-12 p-4 bg-gray-200 sm:col-span-4")}>
      <div className="sticky top-4 sm:h-[calc(100vh-115px)] flex flex-col justify-between gap-4">
        {isSelectProduct ? (
          <>
            <div className="space-y-1">
              <h3 className="text-xl text-gray-700 font-semibold pb-4 flex items-center gap-4">
                <FaCartShopping className="w-6 h-6" />
                <span data-testid="label-cart">Cart</span>
              </h3>
              <div className="bg-white px-4 py-2 rounded-t-lg flex items-center justify-between gap-4 text-base text-gray-600 font-semibold">
                <div className="flex items-center gap-4">
                  {size(selectedCartItems) === size(cartItems) ? (
                    <MdOutlineCheckBox
                      data-testid="deselect-all-cart"
                      className="w-6 h-6 cursor-pointer text-gray-500"
                      onClick={() => dispatch(removeAllSelectedCartItems())}
                    />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank
                      data-testid="select-all-cart"
                      className="w-6 h-6 cursor-pointer text-gray-500"
                      onClick={() => dispatch(selectAllCartItems())}
                    />
                  )}
                  <p className="flex items-center gap-1">
                    <span>Select All</span>
                    <span className="text-sm text-gray-500 font-normal">
                      ({cartItems?.length})
                    </span>
                  </p>
                </div>
                {size(selectedCartItems) > 0 && (
                  <button
                    className="font-medium text-gray-700 text-sm"
                    onClick={handleBulkRemoveCartItem}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="space-y-1 sm:overflow-y-auto sm:max-h-[calc(100vh-260px)]">
                {cartItems.map((item) => (
                  <ProductList product={item} key={item.id} />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl text-gray-500">Total</p>
              <p className="text-4xl font-semibold">
                {formattedCurrency(currentCurrency, totalCartPrice)}
              </p>
            </div>
          </>
        ) : (
          <EmptyCard
            title="Cart is empty"
            description="Looks like you haven't added anything to your cart yet!"
          />
        )}
      </div>
    </div>
  );
};
