import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { BlogInterface } from '@/types/interfaces';



export interface BlogState {
  blogs: BlogInterface[];
  currentBlog: BlogInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
};

// Create a new blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (
    { blogs, token }: { blogs: FormData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/admin/blogs', blogs, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-blogs',
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

// Fetch all blogs
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
    { blogId, blogs, token }: { blogId: string; blogs: FormData; token: string },
    { rejectWithValue }
  ) => {

    try {
      const response = await axiosInstance.patch(
        `/admin/blogs/${blogId}`,
        blogs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-blogs',
          },
        }
      );
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
    { blogId, blogs, token }: { blogId: string; blogs: FormData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/blogs/${blogId}/banner-image`,
        blogs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-blogs',
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
    setCurrentBlog: (state, action: PayloadAction<BlogInterface | null>) => {
      state.currentBlog = action.payload;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    addBlogToState: (state, action: PayloadAction<BlogInterface>) => {
      state.blogs.push(action.payload);
    },
    updateBlogInState: (state, action: PayloadAction<BlogInterface>) => {
      const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    removeBlogFromState: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
    },
    setClearBlog: (state) => {
      state.currentBlog = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<BlogInterface>) => {
        state.loading = false;
        state.blogs.push(action.payload)
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
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<BlogInterface[]>) => {
        state.loading = false;
        state.blogs = action.payload;
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
      .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<BlogInterface>) => {
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
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<BlogInterface>) => {
        state.loading = false;
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
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
      .addCase(updateBlogBannerImage.fulfilled, (state, action: PayloadAction<BlogInterface>) => {
        state.loading = false;
        state.currentBlog = action.payload;
        if (state.blogs) {
          state.blogs = state.blogs.map((blog) =>
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
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<BlogInterface>) => {
        state.loading = false;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id
        );
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

export const { addBlogToState, clearCurrentBlog, removeBlogFromState, setClearBlog, setCurrentBlog, updateBlogInState } = blogSlice.actions;
export default blogSlice.reducer;