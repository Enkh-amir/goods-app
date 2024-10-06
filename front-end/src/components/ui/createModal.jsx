import { BACKEND_ENDPOINT } from "@/constants/constant";
import { useState } from "react";

export const CreateModal = ({ setProducts }) => {
  const [product, setProduct] = useState({});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data.product]);
    } catch {
      console.log("error");
    }

    setProduct({
      productName: "",
      category: "",
      price: "",
    });
    document.getElementById("my_modal_3").close();
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
                value={product?.productName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Барааны ангилал</p>
              <select
                className="input select w-full bg-[#F4F4F4]"
                name="category"
                required
                onChange={handleInputChange}
                value={product?.category}
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
                onChange={handleInputChange}
                value={product?.price}
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
                onClick={handleSubmit}
                className="btn bg-green-400"
              >
                Үүсгэх
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
