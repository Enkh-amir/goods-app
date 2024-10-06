import LogoDelete from "../logoDeleteEdit/LogoDelete";
import { EditModal } from "./editModal";
import { BACKEND_ENDPOINT } from "@/constants/constant";

export const Card = ({
  product,
  selectedProduct,
  setSelectedProduct,
  setProducts,
}) => {
  const { productName, category, price } = product;

  const handleDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);
      const data = await response.json();

      setProducts((prevProducts) =>
        prevProducts.filter((product) => data?.product?.id !== product?.id)
      );
    } catch {
      console.log("error");
    }
    document.getElementById("my_modal_2").close();
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProduct),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);
      const data = await response.json(response);
      setProducts(data.products);
    } catch {
      console.log("error");
    }
    document.getElementById("my_modal_2").close();
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSelectedProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  return (
    <form onSubmit={handleOnEdit} method="dialog" noValidate>
      <div className="flex">
        <div className="bg-slate-50 flex border rounded-2xl shadow-lg">
          <div className="w-[364px] h-[140px] flex flex-col gap-3 p-6">
            <h3 className="font-bold text-lg">{productName}</h3>
            <p className="text-gray-600">{category}</p>
            <p className="text-gray-800 font-semibold">${price}</p>
          </div>
          <div className="flex p-6 gap-5 items-center">
            <EditModal
              product={product}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
            />
            <button onClick={() => handleDelete(product?.id)} className="btn">
              <LogoDelete />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
