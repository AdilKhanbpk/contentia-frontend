import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

// Define error response interface
interface ErrorResponse {
  message: string;
  status?: number;
}

// Define the Order interface based on your model
interface Order {
  _id: string;
  coupon?: string;
  orderOwner: {
    id: string; // User's ID
    fullName: string; // User's full name
  };
  assignedCreators: string[];
  appliedCreators: string[];
  noOfUgc: number;
  totalPrice: number;
  orderStatus: 'pending' | 'active' | 'completed' | 'cancelled' | 'revision';
  paymentStatus: 'paid' | 'pending' | 'refunded' | 'cancelled';
  contentsDelivered?: number;
  additionalServices: {
    platform: string;
    duration: string;
    edit: boolean;
    aspectRatio: string;
    share?: boolean;
    coverPicture?: boolean;
    creatorType?: string;
    productShipping?: boolean;
  };
  preferences?: {
    creatorGender?: string;
    minCreatorAge?: number;
    maxCreatorAge?: number;
    interests?: string[];
    contentType?: string;
    locationAddress?: {
      country?: string;
      city?: string;
      district?: string;
      street?: string;
      fullAddress?: string;
    };
  };
  briefContent?: {
    brandName?: string;
    brief?: string;
    productServiceName?: string;
    productServiceDesc?: string;
    scenario?: string;
    caseStudy?: string;
    uploadFiles?: string;
    uploadFileDate?: string;
  };
  numberOfRequests?: number;
  orderQuota?: number;
  quotaLeft?: number;
  uploadFiles?: Array<{
    uploadedBy: string;
    fileUrls: string[];
    uploadedDate: Date;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrdersState {
  data: Order[];
  loading: boolean;
  error: string | null;
  currentOrder: Order | null;
}

const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null,
  currentOrder: null,
};

// Create Order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ data, token }: { data: Partial<Order>; token: string }, { rejectWithValue }) => {
    console.group('createOrder Thunk Debugging');
    console.log('Starting order creation process');
    console.log('Order data:', data);
    console.log('Authorization token:', token);

    try {
      if (!token) {
        console.error('Authentication token is missing');
        console.groupEnd();
        return rejectWithValue('Authentication token is missing');
      }

      // Mapping data to the expected format
      const transformedData = {
        customer: data.orderOwner?.fullName || '',  // Mapping customer field to id
        assignedCreators: Array.isArray(data.assignedCreators) ? data.assignedCreators : [data.assignedCreators],  // Ensure it's an array
        totalPrice: parseFloat(data.totalPrice?.toString() || '0'),  // Ensure totalPrice is a float
        noOfUgc: parseInt(data.noOfUgc?.toString() || '0', 10),  // Ensure noOfUgc is an integer
        additionalServices: {
          platform: data.additionalServices?.platform?.toLowerCase() || '',  // Normalize platform to lowercase
          duration: data.additionalServices?.duration || '',  // Ensure duration is a string
          edit: data.additionalServices?.edit || false,  // Default edit to false
          aspectRatio: data.additionalServices?.aspectRatio || '',  // Ensure aspectRatio is a string
          share: data.additionalServices?.share || false,  // Default share to false
          coverPicture: data.additionalServices?.coverPicture || false,  // Default coverPicture to false
          creatorType: data.additionalServices?.creatorType || '',  // Ensure creatorType is a string
          productShipping: data.additionalServices?.productShipping || false,  // Default productShipping to false
        },
      };

      console.log('Prepared transformed order data:', transformedData);

      const response = await axiosInstance.post('/admin/orders', transformedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('Order creation successful, server response:', response.data);
      console.groupEnd();
      return response.data.data;
    } catch (error) {
      console.group('Error Details');

      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error('Axios error during order creation:', axiosError.response);
        console.log('Server response status:', axiosError.response?.status);
        console.log('Server response data:', axiosError.response?.data);
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to create order');
      }

      console.error('Non-Axios error during order creation:', error);
      console.groupEnd();
      return rejectWithValue('Failed to create order');
    }
  }
);

// Fetch All Orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (token: string, { rejectWithValue }) => {
    console.group('fetchOrders Thunk Debugging');
    console.log('Starting orders fetch process');
    console.log('Authorization token:', token);

    try {
      const response = await axiosInstance.get('/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      if (response.data && response.data.data) {
        console.log('Orders fetch successful, received orders:', response.data.data.orders);
        console.groupEnd();
        return response.data.data.orders;
      }
      
      console.warn('Response data does not contain the expected data structure');
      console.groupEnd();
      return rejectWithValue('Invalid response format');
    } catch (error) {
      console.error('Error fetching orders:', error);
      console.groupEnd();
      
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
  async ({ orderId, token }: { orderId: string; token: string }, { rejectWithValue }) => {
    console.group('fetchOrderById Thunk Debugging');
    console.log('Starting single order fetch process');
    console.log('Order ID:', orderId);
    console.log('Authorization token:', token);

    try {
      const response = await axiosInstance.get(`/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      console.log('Order fetch successful, server response:', response.data);
      console.groupEnd();
      return response.data.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      console.groupEnd();
      
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
  async ({ orderId, data, token }: { orderId: string; data: Partial<Order>; token: string }, { rejectWithValue }) => {
    console.group('updateOrder Thunk Debugging');
    console.log('Starting order update process');
    console.log('Order ID:', orderId);
    console.log('Update data:', data);
    console.log('Authorization token:', token);

    try {
      const response = await axiosInstance.put(`/admin/orders/${orderId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('Order update successful, server response:', response.data);
      console.groupEnd();
      return response.data.data;
    } catch (error) {
      console.error('Error updating order:', error);
      console.groupEnd();
      
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
  async ({ orderId, token }: { orderId: string; token: string }, { rejectWithValue }) => {
    console.group('deleteOrder Thunk Debugging');
    console.log('Starting order deletion process');
    console.log('Order ID:', orderId);
    console.log('Authorization token:', token);

    try {
      const response = await axiosInstance.delete(`/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      console.log('Order deletion successful, server response:', response.data);
      console.groupEnd();
      return { orderId, data: response.data.data };
    } catch (error) {
      console.error('Error deleting order:', error);
      console.groupEnd();
      
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
  async ({ orderId, creatorId, token }: { orderId: string; creatorId: string; token: string }, { rejectWithValue }) => {
    console.group('approveCreator Thunk Debugging');
    console.log('Starting creator approval process');
    console.log('Order ID:', orderId);
    console.log('Creator ID:', creatorId);
    console.log('Authorization token:', token);

    try {
      const response = await axiosInstance.post(
        `/admin/orders/${orderId}/approve`,
        { creatorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('Creator approval successful, server response:', response.data);
      console.groupEnd();
      return response.data.data;
    } catch (error) {
      console.error('Error approving creator:', error);
      console.groupEnd();
      
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
  async ({ orderId, creatorId, token }: { orderId: string; creatorId: string; token: string }, { rejectWithValue }) => {
    console.group('rejectCreator Thunk Debugging');
    console.log('Starting creator rejection process');
    console.log('Order ID:', orderId);
    console.log('Creator ID:', creatorId);
    console.log('Authorization token:', token);

    try {
      const response = await axiosInstance.post(
        `/admin/orders/${orderId}/reject`,
        { creatorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('Creator rejection successful, server response:', response.data);
      console.groupEnd();
      return response.data.data;
    } catch (error) {
      console.error('Error rejecting creator:', error);
      console.groupEnd();
      
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to reject creator');
      }
      
      return rejectWithValue('Failed to reject creator');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
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
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.data.push(action.payload);
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
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
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
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
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
      .addCase(approveCreator.fulfilled, (state, action: PayloadAction<Order>) => {
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
      });
  },
});

export const { setCurrentOrder, clearCurrentOrder, clearOrdersError } = ordersSlice.actions;

export default ordersSlice.reducer;