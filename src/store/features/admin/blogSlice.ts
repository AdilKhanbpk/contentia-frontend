import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';

export interface Blog {
  _id: string;
  status: string;
  author: {
    billingInformation: {
      invoiceStatus: boolean;
      trId: string;
      address: string;
      fullName: string;
      companyName: string;
      taxNumber: string;
      taxOffice: string;
    };
    _id: string;
    profilePic: string;
    authProvider: string;
    status: string;
    userType: string;
    role: string;
    email: string;
    customerStatus: string;
    password: string;
    rememberMe: boolean;
    termsAndConditionsApproved: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    age: number;
    fullName: string;
    invoiceType: string;
    phoneNumber: string;
  };
  title: string;
  category: string;
  bannerImage: string;
  content: string;
  metaDescription: string;
  metaKeywords: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BlogState {
  data: Blog[] | null;
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  data: null,
  currentBlog: null,
  loading: false,
  error: null,
};

// Create a new blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (
    { data, token }: { data: FormData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/admin/blogs', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to create blog'
      );
    }
  }
);

// Fetch all blogssss
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch blogs'
      );
    }
  }
);

// Fetch single blog by ID
export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (
    { blogId, token }: { blogId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/admin/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to fetch blog'
      );
    }
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async (
    { blogId, data, token }: { blogId: string; data: FormData; token: string },
    { rejectWithValue }
  ) => {
    console.log('updateBlog called'); // Log when the function is called
    console.log('Payload:', { blogId, data, token }); // Log the incoming payload

    try {
      console.log('Sending PATCH request to:', `/admin/blogs/${blogId}`);
      console.log('Request Headers:', {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      });
      console.log('Request Data (FormData):', data); // Log the FormData object

      const response = await axiosInstance.patch(
        `/admin/blogs/${blogId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response Received:', response); // Log the entire response
      console.log('Response Data:', response.data.data); // Log the relevant data
      return response.data.data;
    } catch (error) {
      console.error('Error occurred during PATCH request:', error); // Log the error

      const axiosError = error as AxiosError;
      console.error(
        'Axios Error Details:',
        axiosError.response?.data || 'No additional error details available'
      );

      return rejectWithValue(
        axiosError.response?.data || 'Failed to update blog'
      );
    }
  }
);


// Update blog banner image
export const updateBlogBannerImage = createAsyncThunk(
  'blog/updateBlogBannerImage',
  async (
    { blogId, data, token }: { blogId: string; data: FormData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/blogs/${blogId}/banner-image`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to update blog banner image'
      );
    }
  }
);

// Delete a blog
export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (
    { blogId, token }: { blogId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(`/admin/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || 'Failed to delete blog'
      );
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.data = state.data ? [...state.data, action.payload] : [action.payload];
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.currentBlog = action.payload;
        if (state.data) {
          state.data = state.data.map((blog) =>
            blog._id === action.payload._id ? action.payload : blog
          );
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update blog banner image
      .addCase(updateBlogBannerImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogBannerImage.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.currentBlog = action.payload;
        if (state.data) {
          state.data = state.data.map((blog) =>
            blog._id === action.payload._id ? action.payload : blog
          );
        }
      })
      .addCase(updateBlogBannerImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete a blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        if (state.data) {
          state.data = state.data.filter((blog) => blog._id !== action.payload._id);
        }
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;