import { useState } from "react";
import LogoEdit from "../logoDeleteEdit/LogoEdit";
import { BACKEND_ENDPOINT } from "@/constants/constant";

export const EditModal = ({ product: productProps }) => {
  const [product, setProduct] = useState(productProps);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    await fetch(`${BACKEND_ENDPOINT}/product`, options);
    document.getElementById("my_modal_2").close();
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <LogoEdit />
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog" noValidate>
            <div className="flex justify-start gap-[130px]">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => document.getElementById("my_modal_2").close()}
              >
                ✕
              </button>
              <div className="text-[#161616] mb-4 font-bold text-2xl">
                Бараа засах
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
                  value={product?.name}
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Барааны ангилал</p>
                <select
                  className="input select w-full bg-[#F4F4F4]"
                  name="category"
                  value={product?.category}
                  onChange={handleInputChange}
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
                  min="0"
                  value={product?.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <hr />
              <div className="flex justify-end gap-7">
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_2").close()}
                  className="btn-ghost p-2 border rounded-md"
                >
                  Буцах
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn bg-green-400"
                >
                  Үүсгэх
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
