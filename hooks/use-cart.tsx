import { useSelector } from "react-redux";

import { getCartItems, getSelectedCartItems } from "@/store/entities";

export const useCart = () => {
  const { cartItems } = useSelector(getCartItems);
  const { selectedCartItems } = useSelector(getSelectedCartItems);

  return { cartItems, selectedCartItems };
};
