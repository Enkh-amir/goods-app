import LogoDelete from "../logoDeleteEdit/LogoDelete";
import LogoEdit from "../logoDeleteEdit/LogoEdit";
const ProductCard = ({ product, handleDelete, handleOnEdit, handleModal }) => {
  return (
    <form onSubmit={handleOnEdit} method="dialog" noValidate>
      <div className="flex">
        <div className="bg-slate-50 flex border rounded-2xl shadow-lg">
          <div className="w-[364px] h-[140px] flex flex-col gap-3 p-6">
            <h3 className="font-bold text-lg">{product?.name}</h3>
            <p className="text-gray-600">{product?.category}</p>
            <p className="text-gray-800 font-semibold">${product?.price}</p>
          </div>
          <div className="flex p-6 gap-5 items-center">
            <button onClick={handleDelete}>
              <LogoDelete />
            </button>
            <button type="submit" onClick={handleModal}>
              <LogoEdit />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductCard;
