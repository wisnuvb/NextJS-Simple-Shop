import { Item } from "@/common/types";

export interface CartItem extends Item {
  quantity: number;
}
