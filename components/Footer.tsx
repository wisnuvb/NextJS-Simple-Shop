import React from "react";
import { useDispatch } from "react-redux";
import size from "lodash/size";

import { setCurrentCurrency } from "@/store/entities/currency";
import { cn } from "@/utils/functions";
import { useCart, useCurrency, useModal } from "@/hooks";
import { CheckoutModal } from ".";

export const Footer = () => {
  const { currencies, currentCurrency } = useCurrency();
  const { cartItems } = useCart();

  const { modal } = useModal();

  const isSelectProduct = size(cartItems) > 0;

  const dispatch = useDispatch();

  const handleSelectCurrency = (currency: string) => {
    dispatch(setCurrentCurrency(currency));
  };

  return (
    <footer
      className={cn(
        "bg-[#f8f8f8] py-3 px-6 fixed bottom-0 left-0 right-0 flex items-center justify-between ring-1 ring-[#f8f8f8] shadow-top"
      )}
    >
      <div className="space-y-1">
        <p data-testid="label-footer">Currency</p>
        <select
          data-testid="select-currency"
          className="bg-white border border-gray-400 rounded px-2 py-1 w-24 text-lg font-medium focus-visible:outline-none cursor-pointer"
          onChange={(e) => handleSelectCurrency(e.target.value)}
          value={currentCurrency}
        >
          {currencies.map((currency) => (
            <option key={currency.key} value={currency.key}>
              {currency.key?.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className={cn(
          "bg-black disabled:bg-black/45 disabled:cursor-not-allowed text-gray-200 text-lg py-2 px-6 rounded"
        )}
        disabled={!isSelectProduct}
        onClick={modal.onOpen}
      >
        Checkout
      </button>

      <CheckoutModal modal={modal} />
    </footer>
  );
};
