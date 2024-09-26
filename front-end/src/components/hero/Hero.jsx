import ProductCard from "../product-card/ProductCard";

const Hero = () => {
  return (
    <div className="flex flex-col gap-6 items-center mt-7">
      <div className="flex w-full justify-center">
        <button className="btn w-max bg-green-400">Бараа нэмэх</button>
      </div>
      <div className="flex w-[1640px] justify-center flex-wrap gap-7">
        <ProductCard />
      </div>
    </div>
  );
};
export default Hero;
