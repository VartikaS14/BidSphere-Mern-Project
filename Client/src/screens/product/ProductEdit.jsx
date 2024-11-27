import { PrimaryButton, Caption, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllProduct, getProduct, selectProduct, updateProduct } from "../../redux/features/productSlice";
import { useEffect, useState } from "react";

export const ProductEdit = () => {
  useRedirectLoggedOutUser("/login");
  const{id} = useParams();
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const productEdit=useSelector(selectProduct);
  const { isSuccess } = useSelector((state) => state.product);
 // const {userproducts}=useSelector((state)=>state.product);
  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  //const { title, description, price, height, lengthpic, width, mediumused, weigth, category } = product;

  useEffect(()=>{
    dispatch(getProduct(id));
  },[dispatch,id]);

  useEffect(()=>{
    setProduct(productEdit)
    setImagePreview(productEdit && productEdit.image ? `$(productEdit.image.filePath)`:null);
  },[productEdit]);


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

    await dispatch(updateProduct({id,formData}))
    dispatch(getAllProduct());

    await dispatch(createProduct(formData));

    if (isSuccess) {
      navigate("/product");
    }
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Update Product
        </Title>
        <hr className="my-5" />
        <form>
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" name="title" className={`${commonClassNameOfInput}`} placeholder="Title" required />
          </div>

          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Height (cm) </Caption>
              <input type="number" name="height" placeholder="height" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Length (cm) </Caption>
              <input type="number" name="lengthpic" placeholder="Length" className={`${commonClassNameOfInput}`} />
            </div>
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Width (cm) </Caption>
              <input type="number" name="width" placeholder="width" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">
                Medium used <span className=" text-purple-400 italic">(Typically, pencil, ink, charcoal or other)</span>
              </Caption>
              <input type="text" name="mediumused" placeholder="Medium used" className={commonClassNameOfInput} />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="w-1/2">
              <Caption className="mb-2">
                Weight of piece <span className=" text-purple-400 italic">(kg)</span>
              </Caption>
              <input type="number" name="weigth" placeholder="weigth" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Price Range*</Caption>
              <input type="number" name="price" className={`${commonClassNameOfInput}`} placeholder="Price" required />
            </div>
          </div>

          <div>
            <Caption className="mb-2">Description *</Caption>
            <textarea name="description" className={`${commonClassNameOfInput}`} cols="30" rows="5"></textarea>
          </div>
          <div>
            <Caption className="mb-2">Image </Caption>
            <input type="file" className={`${commonClassNameOfInput}`} name="image" />
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
