import React from "react";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import get from "lodash/get";

import { useGetCurrenciesQuery, useGetProductsQuery } from "@/store/services";
import { Item } from "@/common/types";
import { Header, Pagination, ProductList, SearchBar } from "@/components";
import { usePagination } from "@/hooks";
import { Meta } from "@/components/seo";

const Cart = dynamic(() => import("@/components").then((mod) => mod.Cart), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components").then((mod) => mod.Footer), {
  ssr: false,
});

const Home: NextPage = () => {
  const [query, setQuery] = React.useState("");

  const { pagination } = usePagination();
  const { limit, offset } = pagination;

  useGetCurrenciesQuery({});

  const { data: resProducts } = useGetProductsQuery({ limit, offset, query });
  const total = get(resProducts, "total", 0);
  const products = get(resProducts, "items", [] as Item[]);

  return (
    <>
      <Meta title="Acme Online Store" />

      <div className="grid grid-cols-12">
        <div className="col-span-12 pb-28 sm:col-span-8">
          <Header />
          <main className="p-6 space-y-4 sm:space-y-6">
            <SearchBar setQuery={setQuery} />
            <ProductList products={products} />
            <Pagination pagination={pagination} total={total} />
          </main>
        </div>
        <Cart />
      </div>

      <Footer />
    </>
  );
};

export default Home;
