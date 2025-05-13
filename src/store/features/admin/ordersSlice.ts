import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance, patchForm } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { OrderInterface } from '@/types/interfaces';

interface ErrorResponse {
  message: string;
  status?: number;
}

interface OrdersState {
  data: OrderInterface[];
  loading: boolean;
  error: string | null;
  currentOrder: OrderInterface | null;
}

const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null,
  currentOrder: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ data }: { data: Partial<OrderInterface> }, { rejectWithValue }) => {
    try {


      const transformedData = {
        customer: typeof data.orderOwner === 'object' ? data.orderOwner._id : data.orderOwner,
        assignedCreators: Array.isArray(data.assignedCreators) ? data.assignedCreators : [data.assignedCreators],
        basePrice: parseFloat(data.basePrice?.toString() || '0'),
        noOfUgc: parseInt(data.noOfUgc?.toString() || '0', 10),
        additionalServices: {
          platform: data.additionalServices?.platform?.toLowerCase() || 'tiktok',
          duration: data.additionalServices?.duration || '15s',
          edit: data.additionalServices?.edit === true ? true : false,
          aspectRatio: data.additionalServices?.aspectRatio || '9:16',
          share: data.additionalServices?.share === true ? true : false,
          coverPicture: data.additionalServices?.coverPicture === true ? true : false,
          creatorType: data.additionalServices?.creatorType,
          productShipping: data.additionalServices?.productShipping === true ? true : false,
        },
      };

      // First create the order
      const response = await axiosInstance.post('/admin/orders', transformedData);

      // Then fetch the complete order details to get the full owner information
      const fullOrderResponse = await axiosInstance.get(`/admin/orders/${response.data.data._id}`);

      return fullOrderResponse.data.data;
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to create order');
      }
      return rejectWithValue('Failed to create order');
    }
  }
);

// Fetch All Orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/orders');

      return response.data.data;

    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch orders');
      }

      return rejectWithValue('Failed to fetch orders');
    }
  }
);

// Fetch Single Order
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async ({ orderId }: { orderId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`/admin/orders/${orderId}`);

      return response.data.data;
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch order');
      }

      return rejectWithValue('Failed to fetch order');
    }
  }
);

// Update Order
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, data }: { orderId: string; data: FormData; }, { rejectWithValue }) => {


    try {
      const response = await patchForm(`/admin/orders/${orderId}`, data);

      return response.data.data;
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to update order');
      }

      return rejectWithValue('Failed to update order');
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async ({ orderId }: { orderId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.delete(`/admin/orders/${orderId}`);

      return { orderId, data: response.data.data };
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to delete order');
      }

      return rejectWithValue('Failed to delete order');
    }
  }
);

// Approve Creator
export const approveCreator = createAsyncThunk(
  'orders/approveCreator',
  async ({ orderId, creatorId }: { orderId: string; creatorId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.patch(
        `/admin/orders/approve-creator/${orderId}/${creatorId}`,
        { creatorId },

      );
      return response.data.data;
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to approve creator');
      }

      return rejectWithValue('Failed to approve creator');
    }
  }
);

// Reject Creator
export const rejectCreator = createAsyncThunk(
  'orders/rejectCreator',
  async ({ orderId, creatorId }: { orderId: string; creatorId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.patch(
        `/admin/orders/reject-creator/${orderId}/${creatorId}`,
        { creatorId },

      );

      return response.data.data;
    } catch (error) {

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to reject creator');
      }

      return rejectWithValue('Failed to reject creator');
    }
  }
);

// Get Applied Creators
export const getAppliedCreators = createAsyncThunk(
  'orders/getAppliedCreators',
  async ({ orderId }: { orderId: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/orders/applied-creators/${orderId}`);

      return {
        orderId,
        creators: response.data.data.appliedCreators // This now contains the full Creator objects
      };

    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch applied creators');
      }

      return rejectWithValue('Failed to fetch applied creators');
    }
  }
);


export const getAssignedOrders = createAsyncThunk(
  'orders/getAssignedCreators',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/orders/assigned-orders`);

      return response.data.data

    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch applied creators');
      }

      return rejectWithValue('Failed to fetch applied creators');
    }
  }
);

export const markTheOrderAsCompleted = createAsyncThunk(
  'orders/markTheOrderAsCompleted',
  async ({ orderId }: { orderId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.patch(
        `/admin/orders/mark-as-completed/${orderId}`)

      return response.data.data
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to mark the order as completed');
      }

      return rejectWithValue('Failed to mark the order as completed');
    }
  }
)

export const markTheOrderAsRejected = createAsyncThunk(
  'orders/markTheOrderAsRejected',
  async ({ orderId }: { orderId: string; }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.patch(`admin/orders/mark-as-rejected/${orderId}`)
      return response.data.data
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to mark the order as rejected');
      }

      return rejectWithValue('Failed to mark the order as rejected');
    }
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<OrderInterface>) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrdersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add these cases to your extraReducers:
      .addCase(getAppliedCreators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppliedCreators.fulfilled, (state, action) => {
        state.loading = false;
        // Update the current order's appliedCreators if it matches the orderId
        if (state.currentOrder?._id === action.payload.orderId) {
          state.currentOrder.appliedCreators = action.payload.creators;
        }
        // Update the current order's appliedCreators with the full Creator objects
        if (state.currentOrder?._id === action.payload.orderId) {
          state.currentOrder.appliedCreators = action.payload.creators;
        }
        // Update the order in the data array
        const index = state.data.findIndex(order => order._id === action.payload.orderId);
        if (index !== -1) {
          state.data[index].appliedCreators = action.payload.creators;
        }
      })
      .addCase(getAppliedCreators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAssignedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAssignedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        state.data.unshift(action.payload);
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
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Order
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
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
        const index = state.data.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
          if (state.currentOrder?._id === action.payload._id) {
            state.currentOrder = action.payload;
          }
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
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(order => order._id !== action.payload.orderId);
        if (state.currentOrder?._id === action.payload.orderId) {
          state.currentOrder = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Approve Creator
      .addCase(approveCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveCreator.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        const index = state.data.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
          if (state.currentOrder?._id === action.payload._id) {
            state.currentOrder = action.payload;
          }
        }
      })
      .addCase(approveCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Reject Creator
      .addCase(rejectCreator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectCreator.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(rejectCreator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markTheOrderAsCompleted.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(markTheOrderAsCompleted.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        const index = state.data.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
          if (state.currentOrder?._id === action.payload._id) {
            state.currentOrder = action.payload;
          }
        }
      })
      .addCase(markTheOrderAsCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(markTheOrderAsRejected.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(markTheOrderAsRejected.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
        state.loading = false;
        const index = state.data.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
          if (state.currentOrder?._id === action.payload._id) {
            state.currentOrder = action.payload;
          }
        }
      })
      .addCase(markTheOrderAsRejected.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export const { setCurrentOrder, clearCurrentOrder, clearOrdersError } = ordersSlice.actions;

export default ordersSlice.reducer;