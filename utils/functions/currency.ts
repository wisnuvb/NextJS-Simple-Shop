import { Currency, Item } from "@/common/types";

export const getCurrencyProduct = (currencies: Currency[], product: Item) => {
  return currencies.find((currency) => currency.key === product.priceCurrency);
};

export const formattedNumber = (number: number | string) => {
  if (!number) return "0.00";
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getActiveCurrency = (currencies: Currency[], currentCurrency: string) => {
  return currencies.find((currency) => currency.key === currentCurrency);
};

export const convertPriceToCurrentFormat = (
  currencies: Currency[],
  product: Item,
  currentCurrency: string
) => {
  const price = product?.price ?? 0;
  const usdCoef = getCurrencyProduct(currencies, product)?.usdCoef ?? 0;
  const usdPrice = price / usdCoef;

  const activeCurrency = getActiveCurrency(currencies, currentCurrency);

  const currentCoefToUSD = activeCurrency?.usdCoef ?? 0;
  return usdPrice * currentCoefToUSD;
};

export const formattedCurrency = (currentCurrency: string, price: number) => {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: currentCurrency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(+price.toFixed(2));
};
