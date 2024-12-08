import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { Hero, CategorySlider,TopSeller,Process, Trust ,TopCollection} from "../../router";
import { ProductList } from "../../components/hero/ProductList";


export const Home = () => {
 

 

  return (
    <>
      <Hero />
      <CategorySlider />
      <ProductList  />
      <TopSeller />
      <Process />
      <Trust />
      <TopCollection />
    </>
  );
};

