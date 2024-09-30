"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";

const Hero = () => {
  const BACKEND_ENDPOINT = "http://localhost:8000";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(BACKEND_ENDPOINT);
      const data = await response.json();

      const users = data.map((item) => item.user);
      setProducts(users);
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
