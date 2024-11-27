import React, { useEffect } from "react";
import { PrimaryButton, Title } from "../../../router";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useRedirectLoggedOutUser } from "../../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductOfUser } from "../../../redux/features/productSlice";
import { Table } from "../../../components/Table";

export const ProductList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch=useDispatch();
  const {userProducts} =useSelector((state)=>state.product);

  useEffect(() =>
  {
    dispatch(getAllProductOfUser());
  },[dispatch]);

  const handleDeleteProduct = async (id) =>{
    await dispatch(deleteProduct(id));
    await dispatch(getAllProductOfUser());
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
        <Table products={userProducts} handleDeleteProduct={handleDeleteProduct} />
      </section>
    </>
  );
};
