import React, { FC } from "react";
import size from "lodash/size";

import { Item } from "@/common/types";
import { ProductCard, EmptyCard } from "./cards";
import { cn } from "@/utils/functions";

interface ProductListProps {
  products: Item[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {size(products) > 0 ? (
        <div
          data-testid="product-list"
          className={cn("grid grid-cols-2 gap-4 sm:grid-cols-4")}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyCard
          title="Product is out of stock"
          description="Product data will later be displayed here"
        />
      )}
    </>
  );
};
