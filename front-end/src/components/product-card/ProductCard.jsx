import LogoDelete from "../logoDeleteEdit/LogoDelete";
import LogoEdit from "../logoDeleteEdit/LogoEdit";
const ProductCard = ({ product }) => {
  return (
    <div className="flex">
      <div className="bg-slate-50 flex border rounded-2xl shadow-lg">
        <div className="w-[364px] h-[140px] flex flex-col gap-3 p-6">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-gray-800 font-semibold">${product.price}</p>
        </div>
        <div className="flex p-6 gap-5 items-center">
          <LogoDelete />
          <LogoEdit />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
