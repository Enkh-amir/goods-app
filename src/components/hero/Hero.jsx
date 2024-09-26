import Sort from "../Angilal/Sort";
import ProductCard from "../product-card/ProductCard";

const Hero = () => {
  return (
    <div className="flex mt-[100px]">
      <Sort />
      <button className="btn bg-green-400">Plus</button>
      <ProductCard />
    </div>
  );
};
export default Hero;
