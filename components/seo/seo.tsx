import React, { FC } from "react";
import { NextSeo } from "next-seo";

interface SEOProps {
  title: string;
  description?: string;
}

export const Meta: FC<SEOProps> = ({ title, description }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      titleTemplate="%s | Acme Store"
    />
  );
};
