"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";

const Hero = () => {
  const BACKEND_ENDPOINT = "http://localhost:8000";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(BACKEND_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const products = data.map((item) => item.product);
        setProducts(products);
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
      name: event.target.name.value,
      category: event.target.category.value,
      price: parseFloat(event.target.price.value),
    };

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

      console.log(result.user);
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
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleOnSubmit} method="dialog" noValidate>
            <div className="flex justify-start gap-[130px]">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>
              <div className="text-[#161616] mb-4 font-bold text-2xl">
                Бараа үүсгэх
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p>Барааны нэр</p>
                <input
                  placeholder="Name of product"
                  className="input w-full bg-[#F4F4F4]"
                  name="name"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Барааны ангилал</p>
                <select
                  className="input select w-full bg-[#F4F4F4]"
                  name="category"
                  required
                >
                  <option value="t-shirt">T-shirt</option>
                  <option value="pants">Pants</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="sneakers">Sneakers</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 pb-4">
                <p>Үнэ</p>
                <input
                  placeholder="Price"
                  className="input w-full bg-[#F4F4F4]"
                  name="price"
                  type="number"
                  required
                />
              </div>
              <hr />
              <div className="flex justify-end gap-7">
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_3").close()}
                  className="btn-ghost p-2 border rounded-md"
                >
                  Буцах
                </button>
                <button
                  type="submit"
                  onClick={() => document.getElementById("my_modal_3").close()}
                  className="btn bg-green-400"
                >
                  Үүсгэх
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>

      <div className="flex w-[1640px] justify-center flex-wrap gap-7">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleOnEdit={handleOnEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
