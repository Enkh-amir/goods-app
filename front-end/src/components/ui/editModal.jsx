export const EditModal = ({
  selectedProduct,
  handleSubmit,
  handleInputChange,
  setSelectedProduct,
  product,
}) => {
  const handleModalClick = () => {
    document.getElementById("my_modal_2").showModal();
    setSelectedProduct(product);
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
                  value={selectedProduct?.productName}
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
                  value={selectedProduct?.category}
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
                  value={selectedProduct?.price}
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
