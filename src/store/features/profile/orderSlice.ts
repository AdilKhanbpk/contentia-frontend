import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { useFileContext } from "@/context/FileContext";

// Types and Interfaces
interface LocationAddress {
  country: string;
  city: string;
  district: string;
  street: string;
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
  interests?: string[];
  contentType?: string;
  locationAddress: LocationAddress;
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

export interface Order {
  _id: string;
  coupon?: string;
  orderOwner: string;
  assignedCreators: string[];
  appliedCreators: string[];
  noOfUgc: number;
  totalPrice: number;
  orderStatus: "pending" | "active" | "completed" | "cancelled" | "revision";
  paymentStatus: "paid" | "pending" | "refunded" | "cancelled";
  contentsDelivered: number;
  additionalServices: AdditionalServices;
  preferences: Preferences;
  briefContent: BriefContent;
  numberOfRequests?: number;
  orderQuota?: number;
  quotaLeft?: number;
  uploadFiles: UploadFile[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  orderFormData: object;
}

// Payload Interfaces
interface CreateOrderPayload {
  data: {
    noOfUgc: number;
    totalPrice: number;
    additionalServices: AdditionalServices;
    preferences: Preferences;
    briefContent: BriefContent;
    orderQuota?: number;
    numberOfRequests?: number;
  };
  token: string;
}

interface UpdateOrderPayload {
  orderId: string;
  data: Partial<Order>;
  token: string;
}

interface CreateClaimPayload {
  orderId: string;
  data: {
    claimContent: string;
  };
  token: string;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  orderFormData: {},
};


interface OrderData {
  token: string;
  selectedFiles: File[];
}

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ token, selectedFiles }: OrderData, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const orderData = state.order.orderFormData;

      // console.log("🚀 ~ orderData:", orderData);

      // Convert orderData to FormData
      const formData = new FormData();
      formData.append("noOfUgc", String(orderData.noOfUgc));
      formData.append("totalPrice", String(orderData.totalPrice));

      Object.entries(orderData.additionalServices).forEach(([key, value]) => {
        formData.append(`additionalServices[${key}]`, String(value));
      });

      Object.entries(orderData.preferences).forEach(([key, value]) => {
        if (key === "locationAddress" && typeof value === "object") {
          if (value) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              formData.append(`preferences[locationAddress][${subKey}]`, String(subValue));
            });
          }
        } else {
          formData.append(`preferences[${key}]`, String(value));
        }
      });

      Object.entries(orderData.briefContent).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`briefContent[${key}][${index}]`, item);
          });
        } else {
          formData.append(`briefContent[${key}]`, String(value));
        }
      });

      // Append selected files
      selectedFiles.forEach((file) => {
        formData.append("uploadFiles", file);
      });

      // Set Authorization header
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Make API request
      const response = await axiosInstance.postForm("/orders", formData);

      return response.data.data;
    } catch (error: any) {
      console.error("Error occurred in createOrder thunk:", error);

      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data;
      console.error("Error details:", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);








// Fetch All Orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (token: string, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    { orderId, token }: { orderId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
  async ({ orderId, data, token }: UpdateOrderPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    { orderId, token }: { orderId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
  async ({ orderId, data, token }: CreateClaimPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    addOrderToState: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrderInState: (state, action: PayloadAction<Order>) => {
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
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
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
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
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
        (state, action: PayloadAction<Order>) => {
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
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
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
      .addCase(createClaim.fulfilled, (state, action: PayloadAction<Order>) => {
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