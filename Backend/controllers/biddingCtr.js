const asyncHandler = require("express-async-handler");
//const Product = require("../model/productModel");
const BiddingProduct = require("../model/biddingProductModel");
//const sendEmail = require("../utils/sendEmail");
//const User = require("../model/userModel");

const getBiddingHistory = asyncHandler(async (req, res) => {
    const { productId } = req.params;
  
    const biddingHistory = await BiddingProduct.find({ product: productId }).sort("-createdAt").populate("user").populate("product");
  
    res.status(200).json(biddingHistory);
    //res.json("bidding hsi")
  });
  module.exports = {
    //placeBid,
    getBiddingHistory,
    //sellProduct,
  };