"use client";

import { useEffect, useState, useCallback } from "react";
import { CreateModal } from "@/components/ui/createModal";
import { BACKEND_ENDPOINT } from "@/constants/constant";
import { Card } from "@/components/ui/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/product`);
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const responseData = await response.json();
      setProducts(responseData?.products || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex flex-col gap-6 items-center mt-7">
      <CreateModal setProducts={setProducts} />
      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!isLoading && !error && products.length === 0 && (
        <p>No products available.</p>
      )}
      {!isLoading && !error && products.length > 0 && (
        <div className="w-[1640px] grid grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <Card
              key={product.id} // Assuming each product has a unique `id`
              product={product}
              setProducts={setProducts}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
