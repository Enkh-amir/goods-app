"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import { CreateModal } from "../ui/createModal";
import { EditModal } from "../ui/editModal";
import { BACKEND_ENDPOINT } from "@/constants/constant";

const Hero = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(BACKEND_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        console.log("", data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: event.target.name.value,
      category: event.target.category.value,
      price: parseFloat(event.target.price.value),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(BACKEND_ENDPOINT, options);
    const result = await response.json();
    console.log(result.user);
    if (result.success) {
      setProducts((prev) => [...prev, result.user]);
    }
  };

  const handleDelete = async (event, productId) => {
    event.preventDefault();

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/${productId}`, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete user");
      }

      console.log(result.message);
      if (result.success) {
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOnEdit = async (event, productId) => {
    event.preventDefault();

    const userData = {
      name: event.target.name,
      category: event.target.category,
      price: parseFloat(event.target.price),
    };
    console.log("usedatatat", userData);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/${productId}`, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update user");
      }

      console.log("result.user", result.user);
      if (result.success) {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId ? result.user : product
          )
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center mt-7">
      <div className="flex w-full justify-center">
        <button
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="btn w-max bg-green-400"
        >
          Бараа нэмэх
        </button>
      </div>
      <CreateModal handleOnSubmit={handleOnSubmit} />

      <div className="flex w-[1640px] justify-center flex-wrap gap-7">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
