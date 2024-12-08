import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const BIDDING_URL=`${BACKEND_URL}/bidding`;


const placeBid = async (formData) =>{
    const response = await axios.post(BIDDING_URL,formData);
    return response.data;
};

const fetchBiddingHistory = async (productId) =>{
    const response = await axios.get(`${BIDDING_URL}/${productId}`);
    //console.log("Bidding history API response service:", response.data);
    return response.data;
};
const sellProductsByUser = async (productId) =>{
    const response = await axios.post(`${BIDDING_URL}/sell`,productId);
    return response.data;
};

const biddingService = {
    placeBid,
    fetchBiddingHistory,
    sellProductsByUser,
}
export default biddingService;