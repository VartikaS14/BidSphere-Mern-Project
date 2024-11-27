import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../services/productService";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  userProducts: [],
  wonproducts: [],

  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
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

export const getAllProduct = createAsyncThunk(
    "product/public/get-products",
    async ( thunkAPI) => {
      try {
        return await productService.getAllProduct();
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

  export const getProduct = createAsyncThunk(
    "product/public/get-product",
    async ( id,thunkAPI) => {
      try {
        return await productService.getProduct(id);
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

export const getAllProductOfUser = createAsyncThunk(
    "product/get-user-products",
    async ( thunkAPI) => {
      try {
        return await productService.getAllProductOfUser();
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
export const getAllWonedProductOfUser = createAsyncThunk(
    "product/get-wonned-user-products",
    async ( thunkAPI) => {
      try {
        return await productService.getAllWonedProductOfUser();
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

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async ( id,thunkAPI) => {
      try {
        return await productService.deleteProduct(id);
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

export const updateProduct = createAsyncThunk(
    "product/user/update",
    async ( id,formData,thunkAPI) => {
      try {
        return await productService.updateProduct(id,formData);
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






const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload)
        toast.success("Product has been created");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products=action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products=action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllProductOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userProducts=action.payload;
      })
      .addCase(getAllProductOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllWonedProductOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWonedProductOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wonproducts=action.payload;
      })
      .addCase(getAllWonedProductOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deletes successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      });
    }
});

export const selectProduct = (state) =>state.product.product;
export default productSlice.reducer