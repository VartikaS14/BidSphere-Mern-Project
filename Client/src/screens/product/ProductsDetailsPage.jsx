import { Body, Caption, Container, Loader, Title } from "../../router";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { commonClassNameOfInput } from "../../components/common/Design";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/features/productSlice";
import { useParams } from "react-router-dom";
import { DateFormatter } from "../../utils/DateFormatter";
import { fetchBiddingHistory, placeBid } from "../../redux/features/biddingSlice";

export const ProductsDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.product);
  const { history } = useSelector((state) => state.bidding);
  const [activeTab, setActiveTab] = useState("description");
  const [rate, setRate] = useState(0);


  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    //if(product && !product.isSoldout){
    dispatch(fetchBiddingHistory(id));
    //}
  }, [dispatch, id, product]);

  useEffect(()=>{
    if(history && history.length >0)
    {
      const highestBid=Math.max(...history.map((bid)=>bid.price))
      setRate(highestBid)
    }
    else if(product)
    {
      setRate(product.price)
    }
  },[history,product]);
  // console.log("h",history);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  const incrementBid= ()=>{
    setRate((prevRate) => prevRate+1);
  };

  const save= async(e) =>{
    e.preventDefault()

    if(product.price > rate)
    {
      return toast.error("Your bid must be equal or higher than the product price");
    }

    const formData={
      price:rate,
      productId:id
    };
    try{
      await dispatch(placeBid(formData)).unwrap();
      dispatch(fetchBiddingHistory(id))
    }
    catch(error){
      return toast.error("An error occurred while placing bid ");
    }
  };
  if(isLoading) {return <Loader/>}


  return (
    <>
      <section className="pt-24 px-8">
        <Container>
          <div className="flex justify-between gap-8">
            <div className="w-1/2">
              <div className="h-[70vh] p-2">
                <img
                  src={`http://localhost:5000/${product?.image?.filePath}`}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="w-1/2">
              <Title level={2} className="capitalize">
                {product?.title}
              </Title>
              <div className="flex gap-5">
                <div className="flex text-green ">
                  <IoIosStar size={20} />
                  <IoIosStar size={20} />
                  <IoIosStar size={20} />
                  <IoIosStarHalf size={20} />
                  <IoIosStarOutline size={20} />
                </div>
                <Caption>(2 customer reviews)</Caption>
              </div>
              <br />
              <Body>{product?.description.slice(0, 150)}</Body>
              <br />
              <Caption>Item condition: New</Caption>
              <br />
              <Caption>
                Item Verifed: {product?.isverify ? "YES" : "NO"}
              </Caption>
              <br />
              <Caption>Time left:</Caption>
              <br />
              <div className="flex gap-8 text-center">
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>149</Title>
                  <Caption>Days</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>12</Title>
                  <Caption>Hours</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>36</Title>
                  <Caption>Minutes</Caption>
                </div>
                <div className="p-5 px-10 shadow-s1">
                  <Title level={4}>51</Title>
                  <Caption>Seconds</Caption>
                </div>
              </div>
              <br />
              <Title className="flex items-center gap-2">
                Auction ends:
                <Caption>
                  {" "}
                  <DateFormatter date={product?.createdAt} />
                </Caption>
              </Title>
              <Title className="flex items-center gap-2 my-5">
                Timezone: <Caption>UTC 0</Caption>
              </Title>
              <Title className="flex items-center gap-2 my-5">
                Price:<Caption>${product?.price} </Caption>
              </Title>
              <Title className="flex items-center gap-2">
                Current bid:
                <Caption className="text-3xl">{rate} </Caption>
              </Title>
              <div className="p-5 px-10 shadow-s3 py-8">
                <form onSubmit={save} className="flex gap-3 justify-between">
                  <input
                    className={commonClassNameOfInput}
                    type="number"
                    name="price"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    min={product?.price}
                  />
                  <button
                    type="button"
                    className="bg-gray-100 rounded-md px-5 py-3"
                    onClick={incrementBid}
                  >
                    <AiOutlinePlus />
                  </button>
                  <button
                   type="submit"
                   className={`py-3 px-8 rounded-lg ${
                    (product?.isSoldout || !product?.isverify)
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green text-white"
                  }`}
                  disabled={product?.isSoldout || !product?.isverify}
                  >Submit
                  </button>

                </form>
              </div>
            </div>
          </div>
          <div className="details mt-8">
            <div className="flex items-center gap-5">
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "description"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("description")}
              >
                Description
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "auctionHistory"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("auctionHistory")}
              >
                Auction History
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "reviews" ? "bg-green text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("reviews")}
              >
                Reviews(2)
              </button>
              <button
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === "moreProducts"
                    ? "bg-green text-white"
                    : "bg-white"
                }`}
                onClick={() => handleTabClick("moreProducts")}
              >
                More Products
              </button>
            </div>

            <div className="tab-content mt-8">
              {activeTab === "description" && (
                <div className="description-tab shadow-s3 p-8 rounded-md">
                  <Title level={4}>Description</Title>
                  <br />
                  <Caption className="leading-7">
                    {product?.description}
                  </Caption>

                  <br />
                  <Title level={4}>Product Overview</Title>
                  <div className="flex justify-between gap-5">
                    <div className="mt-4 capitalize w-1/2">
                      <div className="flex justify-between border-b py-3">
                        <Title>category</Title>
                        <Caption>{product?.category}</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>height</Title>
                        <Caption> {product?.height} (cm)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>length</Title>
                        <Caption> {product?.lengthpic} (cm)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>width</Title>
                        <Caption> {product?.width} (cm)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>weigth</Title>
                        <Caption> {product?.weigth} (kg)</Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>medium used</Title>
                        <Caption> {product?.mediumused} </Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Price</Title>
                        <Caption> ${product?.price} </Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Sold Out</Title>
                        {product?.isSoldout ? (
                          <Caption>Sold out</Caption>
                        ) : (
                          <Caption>On Stock</Caption>
                        )}
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>verify</Title>
                        {product?.isverify ? (
                          <Caption>Yes</Caption>
                        ) : (
                          <Caption>No</Caption>
                        )}
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Create At</Title>
                        <Caption>
                          {" "}
                          <DateFormatter date={product?.createdAt} />
                        </Caption>
                      </div>
                      <div className="flex justify-between py-3">
                        <Title>Update At</Title>
                        <Caption>
                          {" "}
                          <DateFormatter date={product?.updatedAt} />
                        </Caption>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="h-[60vh] p-2">
                        <img
                        src={`http://localhost:5000/${product?.image?.filePath}`}                          
                        alt={product?.image?.filePath}
                        className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "auctionHistory" && (
                <AuctionHistory history={history} />
              )}
              {activeTab === "reviews" && (
                <div className="reviews-tab shadow-s3 p-8 rounded-md">
                  <Title level={5} className=" font-normal">
                    Reviews
                  </Title>
                  <hr className="my-5" />
                  <Title level={5} className=" font-normal text-red-500">
                    Cooming Soon!
                  </Title>
                </div>
              )}
              {activeTab === "moreProducts" && (
                <div className="more-products-tab shadow-s3 p-8 rounded-md">
                  <h1>More Products</h1>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export const AuctionHistory = ({ history }) => {
  console.log("history", history);
  return (
    <>
      <div className="shadow-s1 p-8 rounded-lg">
        <Title level={5} className=" font-normal">
          Auction History
        </Title>
        <hr className="my-5" />
        {history?.length === 0 ? (
          <h2 className="m-2">No Bidding Record Found</h2>
        ) : (
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-5">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bid Amount(USD)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Auto
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={index}
                  >
                    <td className="px-6 py-4">
                      <DateFormatter date={item?.createdAt} />
                    </td>
                    <td className="px-6 py-4">{item?.price}</td>
                    <td className="px-6 py-4">{item?.user?.name} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
