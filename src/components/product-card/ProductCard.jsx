import LogoDelete from "../logoDeleteEdit/LogoDelete";
import LogoEdit from "../logoDeleteEdit/LogoEdit";

const ProductCard = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-slate-50 flex border rounded-2xl">
        <div className="w-[364px] h-[140px] flex flex-col gap-3 p-6">
          <p>dfghjk</p>
          <p>dfghj</p>
          <p>dfghj</p>
        </div>
        <div className="flex p-6 gap-5">
          <LogoDelete />
          <LogoEdit />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
