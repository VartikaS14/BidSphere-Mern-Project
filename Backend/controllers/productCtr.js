const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const BiddingProduct = require("../model/biddingProductModel");
const mongoose = require('mongoose');
const slugify = require("slugify");
const fs = require("fs");

const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    height,
    lengthpic,
    width,
    mediumused,
    weigth,
  } = req.body;
  const userId = req.user._id; // Assuming user ID comes from middleware after authentication

  // Slug generation logic
  const originalSlug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });

  let slug = originalSlug;
  let suffix = 1;

  // Check for existing slug and append a suffix if needed
  while (await Product.findOne({ slug })) {
    slug = `${originalSlug}-${suffix}`;
    suffix++;
  }

  // Validation
  if (!title || !description || !price || !category) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an image.");
  }

  const fileData = {
    fileName: req.file.originalname,
    filePath: req.file.path.replace(/\\/g, "/"), // Fix backslashes for URL compatibility
    fileType: req.file.mimetype,
  };
  // Create the product
  const product = await Product.create({
    user: userId,
    title,
    slug,
    description,
    price,
    category,
    height,
    lengthpic,
    width,
    mediumused,
    weigth,
    image: fileData, // Include image file data
  });

  // Response
  res.status(201).json({
    success: true,
    data: product,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt").populate("user");
  res.json(products);
});

const getWonProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const wonProducts = await Product.find({ soldTo: userId }).sort("-createdAt").populate("user");

  const productsWithPrices = await Promise.all(
    wonProducts.map(async (product) => {
      const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
      const biddingPrice = latestBid ? latestBid.price : product.price;
      return {
        ...product._doc,
        biddingPrice, // Adding the price field
      };
    })
  );

  res.status(200).json(productsWithPrices);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user?.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Delete image from filesystem
  if (product.image && product.image.filePath) {
    try {
      fs.unlinkSync(product.image.filePath);
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Error deleting image." });
      return;
    }
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({ message: "Product deleted." });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, price, height, lengthpic, width, mediumused, weight } = req.body;
  const { id } = req.params;
  console.log(id);

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    };

    if (product.image && product.image.filePath) {
      try {
        fs.unlinkSync(product.image.filePath);
        console.log("Old image deleted successfully");
      } catch (error) {
        console.error("Error deleting old image:", error);
        return res.status(500).json({ message: "Error deleting old image" });
      }
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      height,
      lengthpic,
      width,
      mediumused,
      weight,
      image: Object.keys(fileData).length === 0 ? product.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct) {
    return res.status(500).json({ message: "Error updating product" });
  }

  res.status(200).json(updatedProduct);
});




const getAllProductsofUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const products = await Product.find({ user: userId })
    .sort("-createdAt")
    .populate("user");

  const productsWithPrices = await Promise.all(
    products.map(async (product) => {
      const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
      const biddingPrice = latestBid ? latestBid.price : product.price;
      return {
        ...product._doc,
        biddingPrice, // Adding the price field
      };
    })
  );

  res.status(200).json(productsWithPrices);

 // res.json(products);
});

// for admin only users
const verifyAndAddCommissionProductByAmdin = asyncHandler(async (req, res) => {
  const { commission } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.isverify = true;
  product.commission = commission;

  await product.save();

  res
    .status(200)
    .json({ message: "Product verified successfully", data: product });
});
const getAllProductsByAmdin = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt").populate("user");

  const productsWithPrices = await Promise.all(
    products.map(async (product) => {
      const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
      const biddingPrice = latestBid ? latestBid.price : product.price;
      return {
        ...product._doc,
        biddingPrice, // Adding the price field
      };
    })
  );

  res.status(200).json(productsWithPrices);
});

// dot not it
const deleteProductsByAmdin = asyncHandler(async (req, res) => {
  try {
    const { productIds } = req.body;

    const result = await Product.findOneAndDelete({ _id: productIds });

    res.status(200).json({ message: `${result.deletedCount} products deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getProductBySlug = asyncHandler(async (req, res) => {
  // Accessing the correct parameter name
  const { id } = req.params; 

  const product = await Product.findById(id);

  if (!product) {
      res.status(404);
      throw new Error("Product not found");
  }

  res.status(200).json(product);
});


const getAllSoldProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({ isSoldout: true }).sort("-createdAt").populate("user");
  res.status(200).json(product);
});
module.exports = {
  createProduct,
  getAllProducts,
  getWonProducts,
  getProductBySlug,
  deleteProduct,
  updateProduct,
  verifyAndAddCommissionProductByAmdin,
  getAllProductsByAmdin,
  deleteProductsByAmdin,
  getAllSoldProducts,
  getAllProductsofUser,
};