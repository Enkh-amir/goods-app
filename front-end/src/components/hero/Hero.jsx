"use client";

import ProductCard from "../product-card/ProductCard";

const Hero = () => {
  const BACKEND_ENDPOINT = "http://localhost:8000";


  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: event.target.name.value,
      category: event.target.category.value,
      price: event.target.category.value,
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
      {/* {modal && (
        <div className="absolute w-60 bg-slate-400 pad top-full ">
          <div className="w-full flex justify-start">
            <button onClick={toggleAddModal}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 10L10 22M10 10L22 22"
                  stroke="#161616"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleOnSubmit} className="flex flex-col p-6 gap-4">
            <input
              placeholder="Name of product"
              className="input input-bordered w-full max-w-xs"
              name="name"
              type="text"
            />
            <select onSubmit={handleOnSubmit} name="category" id="">
              <option value="t-shirt">t-shirt</option>
              <option value="pants">pants</option>
              <option value="hoodie">hoodie</option>
              <option value="sneakers">sneakers</option>
            </select>
            <input
              placeholder="Price"
              className="input input-bordered w-full max-w-xs"
              name="price"
              type="number"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )} */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleOnSubmit} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <input
              placeholder="Name of product"
              className="input input-bordered w-full max-w-xs"
              name="name"
              type="text"
            />
            <select name="category" id="">
              <option value="t-shirt">t-shirt</option>
              <option value="pants">pants</option>
              <option value="hoodie">hoodie</option>
              <option value="sneakers">sneakers</option>
            </select>
            <input
              placeholder="Price"
              className="input input-bordered w-full max-w-xs"
              name="price"
              type="number"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </dialog>

      <div className="flex w-[1640px] justify-center flex-wrap gap-7">
        <ProductCard />
      </div>
    </div>
  );
};
export default Hero;
