import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";
import { OrderInterface } from "@/types/interfaces";


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
  }

}
interface CreateRevisionPayload {
  orderId: string;
  data: {
    revisionContent: string;
  }

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
  // Optional for createOrder, required for updateOrder
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

      console.log("🚀 Complete orderData being sent:", orderData);
      console.log("🔍 briefContent specifically:", orderData.briefContent);
      console.log("🔍 Does briefContent exist?", !!orderData.briefContent);
      console.log("🔍 All keys in orderData:", Object.keys(orderData));
      console.log("🔍 Complete Redux state.order:", state.order);
      console.log("🔍 Raw orderFormData from Redux:", state.order.orderFormData);

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
        console.log("📋 Brief content from Redux:", orderData.briefContent);
        Object.entries(orderData.briefContent).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`briefContent[${key}][${index}]`, item);
            });
          } else {
            formData.append(`briefContent[${key}]`, String(value));
            console.log(`📤 Adding briefContent[${key}]: ${value}`);
          }
        });
      } else {
        console.log("⚠️ No briefContent found in orderData");
      }

      // Append customer info if available
      if (orderData.customerInfo) {
        console.log("📋 Customer info from Redux:", orderData.customerInfo);
        Object.entries(orderData.customerInfo).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(`customerInfo[${key}]`, String(value));
            console.log(`📤 Adding customerInfo[${key}]: ${value}`);
          }
        });
      } else {
        console.log("⚠️ No customerInfo found in orderData");
      }

      // Append payment info if available
      if (orderData.paymentInfo) {
        Object.entries(orderData.paymentInfo).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(`paymentInfo[${key}]`, String(value));
          }
        });
      }

      // if (orderId) {
      //   formData.append("orderId", orderId);
      //   console.log("📦 Sending orderId:", orderId);
      // }
      // Append selected files
      selectedFiles.forEach((file) => {
        formData.append("uploadFiles", file);
      });

      // Set Authorization header 

      // Log FormData contents before sending
      console.log("📦 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`📤 ${key}: ${value}`);
      }

      // Make API request
      const response = await axiosInstance.postForm("/orders", formData);
      console.log("✅ Order created successfully:", response.data);
      

      return response.data.data;
    } catch (error) {
      console.error("Error occurred in createOrder thunk:", error);

      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data || "An unknown error occurred";

      // Check if it's a Paraşüt invoice error
      if (typeof errorMessage === 'string' && errorMessage.includes('Paraşüt')) {
        console.warn("⚠️ Paraşüt invoice error detected - order may still be created");
        return rejectWithValue("Order created but invoice generation failed. Please contact support.");
      }

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

// Create Revision
export const createRevision = createAsyncThunk(
  "order/createRevision",
  async ({ orderId, data }: CreateRevisionPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/revisions/create-revision/${orderId}`,
        data
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating revision:", error);
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
      console.log("🔄 Redux setOrderFormData - Before:", state.orderFormData);
      console.log("🔄 Redux setOrderFormData - New payload:", action.payload);
      state.orderFormData = { ...state.orderFormData, ...action.payload };
      console.log("🔄 Redux setOrderFormData - After merge:", state.orderFormData);
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
      })

      // Create Revision
      .addCase(createRevision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRevision.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
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
      .addCase(createRevision.rejected, (state, action) => {
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