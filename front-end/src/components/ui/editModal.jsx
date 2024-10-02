import { useState } from "react";
import LogoEdit from "../logoDeleteEdit/LogoEdit";
import { BACKEND_ENDPOINT } from "@/constants/constant";

export const EditModal = ({ product: productProps, setProducts }) => {
  const [product, setProduct] = useState(productProps);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleOnEdit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset any previous error messages

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };

    try {
      const response = await fetch(BACKEND_ENDPOINT, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update product");
      }

      console.log("result.product", result.product);
      if (result.success) {
        setProducts((prev) =>
          prev.map((prod) => (prod.id === product.id ? result.product : prod))
        );
        document.getElementById("my_modal_2").close(); // Close modal on success
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage(error.message); // Set error message to display
    }
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
          <form method="dialog" onSubmit={handleOnEdit} noValidate>
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
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
                  min="0" // Ensures price cannot be negative
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
                <button type="submit" className="btn bg-green-400">
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
