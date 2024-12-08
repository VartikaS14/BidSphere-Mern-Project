import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import biddingService from '../services/bidService';
import { toast } from 'react-toastify';
const initialState = {
    history: [],
    bidding: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const placeBid = createAsyncThunk(
    "bid/create",
    async ({price,productId}, thunkAPI) => {
      try {
        return await biddingService.placeBid({price,productId});
      } catch (error) {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  
  export const fetchBiddingHistory = createAsyncThunk(
    "bid/get",
    async (productId, thunkAPI) => {
      try {
        // Log the productId received
      console.log("Fetching bidding history for product ID:", productId);
      
      // API call to fetch bidding history
      const response = await biddingService.fetchBiddingHistory(productId);
      
      // Log the response from the API
      console.log("Bidding history API response:", response);
      
      return response;
      } catch (error) {
        // Extract and return the error message
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  
  export const sellProductsByUser = createAsyncThunk(
    "bid/sell",
    async (productId, thunkAPI) => {
      try {
        return await biddingService.sellProductsByUser(productId);
      } catch (error) {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
const biddingSlice = createSlice({
  name: "bidding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message=action.message;
        toast.success("Bid Applied Successfully");
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

      })
      .addCase(fetchBiddingHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBiddingHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.history=action.payload;
      })
      .addCase(fetchBiddingHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sellProductsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellProductsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message=action.message;
      })
      .addCase(sellProductsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    }
});


export default biddingSlice.reducer