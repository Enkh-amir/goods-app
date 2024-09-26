import Sort from "../Angilal/Sort";
import ProductCard from "../product-card/ProductCard";

const Hero = () => {
  return (
    <div className="flex mt-[100px]">
      <div className="flex">
        <ProductCard />
      </div>
      <button className="btn bg-green-400">Plus</button>
    </div>
  );
};
export default Hero;
