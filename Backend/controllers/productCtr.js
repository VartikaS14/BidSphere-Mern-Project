const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, height, lengthpic, width, mediumused, weigth } = req.body;
    const userId = req.user._id;
  
    const originalSlug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });
  
    let slug = originalSlug;
    let suffix = 1;
  
    while (await Product.findOne({ slug })) {
      slug = `${originalSlug}-${suffix}`;
      suffix++;
    }
  
    if (!title || !description || !price) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
  
    let fileData = {};
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Bidding/Product",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        public_id: uploadedFile.public_id,
      };
    }
  
    const product = await Product.create({
      user: userId,
      title,
      slug: slug,
      description,
      price,
      category,
      height,
      lengthpic,
      width,
      mediumused,
      weigth,
      image: fileData,
    });
    res.status(201).json({
      success: true,
      data: product,
    });
  });
module.exports = {
    createProduct,
};