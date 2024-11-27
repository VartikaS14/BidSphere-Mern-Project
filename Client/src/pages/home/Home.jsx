import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { Hero, CategorySlider,TopSeller,Process, Trust ,TopCollection} from "../../router";
import { ProductList } from "../../components/hero/ProductList";
import { useEffect } from "react";
import { getAllProduct } from "../../redux/features/productSlice";

export const Home = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch=useDispatch();
  const {products} =useSelector((state)=>state.product);

  useEffect(() =>
  {
    dispatch(getAllProduct());
  },[dispatch]);

  return (
    <>
      <Hero />
      <CategorySlider />
      <ProductList products={products} />
      <TopSeller />
      <Process />
      <Trust />
      <TopCollection />
    </>
  );
};

