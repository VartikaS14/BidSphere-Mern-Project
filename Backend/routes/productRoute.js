const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getAllProductsofUser,
  getProductBySlug,
  verifyAndAddCommissionProductByAmdin,
  getAllProductsByAmdin,
  deleteProductsByAmdin,
  getAllSoldProducts,
} = require("../controllers/productCtr"); // Import controller
const { upload } = require("../utils/fileUpload"); // Multer middleware
const { protect, isSeller, isAdmin } = require("../middleWare/authMiddleWare");

// POST route for image upload
router.post("/", protect, isSeller, upload.single("image"), createProduct);
router.put("/:id", protect, isSeller, upload.single("image"), updateProduct);

router.get("/", getAllProducts);
router.get("/user", protect, getAllProductsofUser);
router.get("/sold", getAllSoldProducts);
router.get("/:id", getProductBySlug);


router.delete("/:id", protect, isSeller, deleteProduct);

// Only access for admin users
router.patch("/admin/product-verified/:id",protect,isAdmin,verifyAndAddCommissionProductByAmdin);
router.get("/admin/products", protect, isAdmin, getAllProductsByAmdin);
router.delete("/admin/products", protect, isAdmin, deleteProductsByAmdin);
module.exports = router;
