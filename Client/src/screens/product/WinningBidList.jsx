import React, { useEffect } from "react";
import { Title } from "../../router";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllWonedProductOfUser } from "../../redux/features/productSlice";
import { Table } from "../../components/Table";

export const WinningBidList = () => {
  useRedirectLoggedOutUser("/");

  const dispatch = useDispatch();
  const { wonproducts } = useSelector((state) => state.product);

  useEffect(() => {
    //console.log("Dispatching getAllWonedProductOfUser action");
    dispatch(getAllWonedProductOfUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched wonedproducts:", wonproducts);
  }, [wonproducts]);

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className="font-normal">
            Winning Product Lists
          </Title>
        </div>
        <br />

        {wonproducts && wonproducts.length > 0 ? (
          <Table products={wonproducts} isWon={true} />
        ) : (
          <div className="text-center py-5">
            <p className="text-gray-500">No products found. Start by creating a new product!</p>
          </div>
        )}
      </section>
    </>
  );
};
