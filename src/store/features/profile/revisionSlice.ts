import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { OrderInterface } from "@/types/interfaces";

// Types and Interfaces
interface AddressDetails {
  country: string;
  state: string;
  district: string;
  neighborhood: string;
  fullAddress: string;
}

interface AdditionalServices {
  platform: string;
  duration: string;
  edit: boolean;
  aspectRatio: string;
  share?: boolean;
  coverPicture?: boolean;
  creatorType?: boolean;
  productShipping?: boolean;
}

interface Preferences {
  creatorGender?: string;
  minCreatorAge?: number;
  maxCreatorAge?: number;
  areaOfInterest?: string[];
  contentType?: string;
  addressDetails: AddressDetails;
}

interface BriefContent {
  brandName: string;
  brief: string;
  productServiceName: string;
  productServiceDesc: string;
  scenario?: string;
  caseStudy?: string;
  uploadFiles?: File[];
  uploadFileDate?: string;
}

interface UploadFile {
  uploadedBy: string;
  fileUrls: string[];
  uploadedDate: Date;
}



export interface OrderState {
  orders: OrderInterface[];
  currentOrder: OrderInterface | null;
  loading: boolean;
  error: string | null;
  orderFormData: object;
}

interface UpdateOrderPayload {
  orderId: string;
  data: Partial<OrderInterface>;

}

interface CreateClaimPayload {
  orderId: string;
  data: {
    claimContent: string;
  };

}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  orderFormData: {},
};


interface OrderData {

  selectedFiles: File[];
}

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ selectedFiles }: OrderData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const orderData: Partial<OrderInterface> = state.order.orderFormData;

      if (!orderData) {
        return rejectWithValue("Order data is missing");
      }

      // Convert orderData to FormData
      const formData = new FormData();
      formData.append("noOfUgc", String(orderData.noOfUgc || 0));
      formData.append("basePrice", String(orderData.basePrice || 0));

      // Append additional services if available
      if (orderData.additionalServices) {
        Object.entries(orderData.additionalServices).forEach(([key, value]) => {
          formData.append(`additionalServices[${key}]`, String(value));
        });
      }

      // Append preferences if available
      if (orderData.preferences) {
        Object.entries(orderData.preferences).forEach(([key, value]) => {
          if (key === "addressDetails" && typeof value === "object") {
            Object.entries(value).forEach(([subKey, subValue]) => {
              formData.append(`preferences[addressDetails][${subKey}]`, String(subValue));
            });
          } else if (key === "areaOfInterest" && Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`preferences[areaOfInterest][${index}]`, item);
            });
          } else {
            formData.append(`preferences[${key}]`, String(value));
          }
        });
      }

      // Append brief content if available
      if (orderData.briefContent) {
        Object.entries(orderData.briefContent).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`briefContent[${key}][${index}]`, item);
            });
          } else {
            formData.append(`briefContent[${key}]`, String(value));
          }
        });
      }

      // Append selected files
      selectedFiles.forEach((file) => {
        formData.append("uploadFiles", file);
      });


      // Make API request
      const response = await axiosInstance.postForm("/orders", formData);

      return response.data.data;
    } catch (error) {
      console.error("Error occurred in createOrder thunk:", error);

      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data || "An unknown error occurred";

      return rejectWithValue(errorMessage);
    }
  }
);








// Fetch All Orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get("/orders/my-orders");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data;
      console.error("Error details:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch Single Order
export const fetchSingleOrder = createAsyncThunk(
  "order/fetchSingleOrder",
  async (
    { orderId }: { orderId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching single order:", error);
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data;
      console.error("Error details:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

// Update Order
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, data }: UpdateOrderPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data;
      console.error("Error details:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (
    { orderId }: { orderId: string; },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.delete(`/orders/${orderId}`);
      return orderId;
    } catch (error) {
      console.error("Error deleting order:", error);
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data;
      console.error("Error details:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

// Create Claim
export const createClaim = createAsyncThunk(
  "order/createClaim",
  async ({ orderId, data }: CreateClaimPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/orders/create-claim/${orderId}`,
        data
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating claim:", error);
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data;
      console.error("Error details:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Add new reducer for form data
    setOrderFormData: (state, action: PayloadAction<object>) => {
      state.orderFormData = { ...state.orderFormData, ...action.payload };
    },
    resetOrderFormData: (state) => {
      state.orderFormData = {};
    },
    setCurrentOrder: (state, action: PayloadAction<OrderInterface | null>) => {
      state.currentOrder = action.payload;
    },
    addOrderToState: (state, action: PayloadAction<OrderInterface>) => {
      state.orders.push(action.payload);
    },
    updateOrderInState: (state, action: PayloadAction<OrderInterface>) => {
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    removeOrderFromState: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((order) => order._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Updated createOrder cases
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.orderFormData = {}; // Reset form data on success
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderInterface[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Order
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSingleOrder.fulfilled,
        (state, action: PayloadAction<OrderInterface>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?._id === action.payload._id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        if (state.currentOrder?._id === action.payload) {
          state.currentOrder = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Claim
      .addCase(createClaim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClaim.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?._id === action.payload._id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(createClaim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setOrderFormData,
  resetOrderFormData,
  setCurrentOrder,
  addOrderToState,
  updateOrderInState,
  removeOrderFromState,
} = orderSlice.actions;

export const selectOrderFormData = (state: RootState) => state.order.orderFormData;
export const selectOrderIsLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;

export default orderSlice.reducer;