import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const PRODUCT_URL=`${BACKEND_URL}/product`;


const createProduct = async (formData) =>{
    const response = await axios.post(PRODUCT_URL,formData);
    return response.data;
};
const getAllProductOfUser = async () =>{
    const response = await axios.get(`${PRODUCT_URL}/user`);
    return response.data;
};

const getAllProduct = async () =>{
    const response = await axios.get(`${PRODUCT_URL}`);
    //console.log(response);
    return response.data;
};


const getAllWonedProductOfUser = async () => {
    const response = await axios.get("http://localhost:5000/api/product/won-products");
    //console.log("win",response);
    return response.data;
  };
  
  

const deleteProduct = async (id) =>{
    const response = await axios.delete(`${PRODUCT_URL}/${id}`);
    return response.data;
};
const getProduct = async (id) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message || "Failed to fetch product";
    }
    
};

const updateProduct = async ({id,formData}) =>{
    console.log("in service",id);
    const response = await axios.put(`${PRODUCT_URL}/${id}`,formData);
    return response.data;
};
const updateProductByAdmin = async ({id,formData}) =>{
    console.log("in service",id);
    const response = await axios.patch(`${PRODUCT_URL}/admin/product-verified/${id}`,formData);
    return response.data;
};

const productService = {
    createProduct,
    getAllProduct,
    getAllProductOfUser,
    getAllWonedProductOfUser,
    deleteProduct,
    getProduct,
    updateProduct,
    updateProductByAdmin
   
}
export default productService;
