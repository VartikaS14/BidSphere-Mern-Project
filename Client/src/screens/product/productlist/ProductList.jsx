import React, { useEffect } from "react";
import { Loader, PrimaryButton, Title } from "../../../router";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useRedirectLoggedOutUser } from "../../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductOfUser } from "../../../redux/features/productSlice";
import { Table } from "../../../components/Table";
import { sellProductsByUser } from "../../../redux/features/biddingSlice";

export const ProductList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch=useDispatch();
  const {userProducts,isLoading} =useSelector((state)=>state.product);

  useEffect(() =>
  {
    dispatch(getAllProductOfUser());
  },[dispatch]);

  const handleDeleteProduct = async (id) =>{
    await dispatch(deleteProduct(id));
    await dispatch(getAllProductOfUser());
  };
  const handleSellProduct = async (productId) =>{
    await dispatch(sellProductsByUser({productId:productId}));
    await dispatch(getAllProductOfUser());
  };
  if(isLoading) {
    return <Loader />;
  }
  if(userProducts?.length ===0)
  {
    return (
      <div className="flex justify-center item-center h-auto w-auto bg-gray-100">
        <h2 className="text-3xl text-gray-700">No Products Found!</h2>
      </div>
    );
  }
  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Product Lists
          </Title>
          <NavLink to="/add">
            <PrimaryButton className="flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105">
              <AiOutlinePlus size={20} />
              <span>Create Product</span>
            </PrimaryButton>
          </NavLink>
        </div>
        <hr className="my-5" />
        <Table products={userProducts} handleDeleteProduct={handleDeleteProduct} handleSellProduct = {handleSellProduct}/>
      </section>
    </>
  );
};
