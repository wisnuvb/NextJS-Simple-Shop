import React from "react";
import Image from "next/image";

interface EmptyCardProps {
  title: string;
  description: string;
}

export const EmptyCard: React.FC<EmptyCardProps> = ({ description, title }) => {
  return (
    <div className="ring-1 ring-white shadow bg-white rounded p-8 text-center flex flex-col items-center justify-center h-full">
      <Image
        src="/cart-empty.webp"
        alt="Cart is empty"
        width={200}
        height={300}
        className="object-contain"
      />
      <h3
        data-testid="empty-card-title"
        className="text-xl text-gray-700 font-bold"
      >
        {title}
      </h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};
