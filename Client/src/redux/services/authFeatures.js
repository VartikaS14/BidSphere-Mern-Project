import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const AUTH_URL=`${BACKEND_URL}/users/`;

const register = async (userData) =>{
    const response = await axios.post(AUTH_URL+"register",userData);
    console.log(response);
    return response.data;
};
const login = async (userData) =>{
    const response = await axios.post(AUTH_URL+"login",userData);
    console.log(response);
    return response.data;
};
const logOut = async () =>{
    const response = await axios.get(AUTH_URL+"logout");
    return response.data.message;
};

const getLogInStatus = async () =>{
    const response = await axios.get(AUTH_URL+"loggedin");
    return response.data;
};
const getuserProfile = async () =>{
    const response = await axios.get(AUTH_URL+"getuser");
    return response.data;
};

const loginUserAsSeller = async (userData) =>{
    const response = await axios.post(`${AUTH_URL}/seller`,userData ,{
        withCredentials :true 
    });
    return response.data;
};
const getUserIncome = async () =>{
    const response = await axios.get(AUTH_URL+"sell-amount");
    return response.data;
};

//only accessible to adminusers
const getIncome = async () =>{
    const response = await axios.get(AUTH_URL+"estimate-income");
    return response.data;
};

const getAllUser = async () =>{
    const response = await axios.get(AUTH_URL+"users");
    return response.data;
};
const authService = {
    register,
    login,
    logOut,
    getLogInStatus,
    getuserProfile,
    loginUserAsSeller,
    getUserIncome,
    getIncome,
    getAllUser
}
export default authService;
