import { CategoryDropDown, Caption, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createProduct } from "../../redux/features/productSlice";

const initialState = {
  title: "",
  description: "",
  price: "",
  height: "",
  lengthpic: "",
  width: "",
  mediumused: "",
  weigth: "",
  category: null,
};

export const AddProduct = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { title, description, price, height, lengthpic, width, mediumused, weigth, category } = product;
  const { isSuccess } = useSelector((state) => state.product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("lengthpic", lengthpic);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("mediumused", mediumused);
    formData.append("weigth", weigth);
    formData.append("description", description);
    formData.append("image", productImage);

    if (category) {
      formData.append("category", category.label);
    }

    await dispatch(createProduct(formData));

    if (isSuccess) {
      navigate("/product");
    }
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className="font-normal mb-5">
          Create Product
        </Title>
        <hr className="my-5" />
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <input
              type="text"
              name="title"
              value={product?.title}
              onChange={handleInputChange}
              className={`${commonClassNameOfInput}`}
              placeholder="Title"
              required
            />
          </div>
          <div className="py-5">
            <Caption className="mb-2">Category *</Caption>
            <CategoryDropDown
              value={category}
              onChange={(selectedCategory) => setProduct({ ...product, category: selectedCategory })}
              className={`${commonClassNameOfInput}`}
            />
          </div>
          {category && (
            <>
              <div className="flex items-center gap-5 my-4">
                <div className="w-1/2">
                  <Caption className="mb-2">Height (cm)</Caption>
                  <input
                    type="number"
                    name="height"
                    value={product?.height}
                    onChange={handleInputChange}
                    placeholder="height"
                    className={`${commonClassNameOfInput}`}
                  />
                </div>
                <div className="w-1/2">
                  <Caption className="mb-2">Length (cm)</Caption>
                  <input
                    type="number"
                    name="lengthpic"
                    value={product?.lengthpic}
                    onChange={handleInputChange}
                    placeholder="Length"
                    className={`${commonClassNameOfInput}`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 my-4">
                <div className="w-1/2">
                  <Caption className="mb-2">Width (cm)</Caption>
                  <input
                    type="number"
                    name="width"
                    value={product?.width}
                    onChange={handleInputChange}
                    placeholder="width"
                    className={`${commonClassNameOfInput}`}
                  />
                </div>
                <div className="w-1/2">
                  <Caption className="mb-2">
                    Medium used{" "}
                    <span className="text-purple-400 italic">
                      (Typically, pencil, ink, charcoal or other)
                    </span>
                  </Caption>
                  <input
                    type="text"
                    name="mediumused"
                    value={product?.mediumused}
                    onChange={handleInputChange}
                    placeholder="Medium used"
                    className={commonClassNameOfInput}
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 mt-4">
                <div className="w-1/2">
                  <Caption className="mb-2">
                    Weight of piece{" "}
                    <span className="text-purple-400 italic">(kg)</span>
                  </Caption>
                  <input
                    type="number"
                    name="weigth"
                    value={product?.weigth}
                    onChange={handleInputChange}
                    placeholder="weigth"
                    className={`${commonClassNameOfInput}`}
                  />
                </div>
                <div className="w-1/2">
                  <Caption className="mb-2">Price Range*</Caption>
                  <input
                    type="number"
                    name="price"
                    value={product?.price}
                    onChange={handleInputChange}
                    className={`${commonClassNameOfInput}`}
                    placeholder="Price"
                    required
                  />
                </div>
              </div>
            </>
          )}
          <div>
            <Caption className="mb-2">Description *</Caption>
            <textarea
              name="description"
              value={product?.description}
              onChange={handleInputChange}
              className={`${commonClassNameOfInput}`}
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div>
            <Caption className="mb-2">Image</Caption>
            <input
              type="file"
              className={`${commonClassNameOfInput}`}
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview !== null ? (
              <div>
                <img
                  src={imagePreview}
                  alt=""
                  className="mt-5 rounded-lg w-48 h-48 object-cover"
                />
              </div>
            ) : (
              <p>No image set for this</p>
            )}
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
