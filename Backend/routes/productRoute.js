const express = require("express");
const router = express.Router();
const {createProduct,} =require("../controllers/productCtr");
const { protect, isSeller, isAdmin } = require("../middleWare/authMiddleWare");
router.post("/", protect,createProduct);




module.exports = router;