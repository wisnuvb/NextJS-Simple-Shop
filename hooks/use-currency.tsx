import { useSelector } from "react-redux";

import { getCurrencies, getCurrentCurrency } from "@/store/entities";

export const useCurrency = () => {
  const { currencies } = useSelector(getCurrencies);
  const { currentCurrency } = useSelector(getCurrentCurrency);

  const getActiveCurrency = () => {
    return currencies.find((currency) => currency.key === currentCurrency);
  };

  return { currencies, currentCurrency, getActiveCurrency };
};
