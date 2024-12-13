import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

export interface Banner {
  _id: string;
  bannerUrl: string;
  bannerImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BannerState {
  banners: Banner[];
  currentBanner: Banner | null;
  loading: boolean;
  error: string | null;
}

interface CreateBannerPayload {
  data: FormData;
  token: string;
}

interface UpdateBannerPayload {
  bannerId: string;
  data: FormData;
  token: string;
}

interface DeleteBannerPayload {
  bannerId: string;
  token: string;
}

const initialState: BannerState = {
  banners: [],
  currentBanner: null,
  loading: false,
  error: null,
};

export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async ({ data, token }: CreateBannerPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.post("/admin/banner", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create Banner"
      );
    }
  }
);

export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async (token: string, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get("/admin/banner");
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch Banners"
      );
    }
  }
);

export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ bannerId, data, token }: UpdateBannerPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.patch(`/admin/banner/${bannerId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || `Failed to update Banner with ID ${bannerId}`
      );
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async ({ bannerId, token }: DeleteBannerPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axiosInstance.delete(`/admin/banner/${bannerId}`);
      return bannerId;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || `Failed to delete Banner with ID ${bannerId}`
      );
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setCurrentBanner: (state, action: PayloadAction<Banner | null>) => {
      state.currentBanner = action.payload;
    },
    addBannerToState: (state, action: PayloadAction<Banner>) => {
      state.banners.push(action.payload);
    },
    updateBannerInState: (state, action: PayloadAction<Banner>) => {
      const index = state.banners.findIndex(banner => banner._id === action.payload._id);
      if (index !== -1) {
        state.banners[index] = action.payload;
      }
    },
    removeBannerFromState: (state, action: PayloadAction<string>) => {
      state.banners = state.banners.filter(banner => banner._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action: PayloadAction<Banner>) => {
        state.loading = false;
        state.banners.push(action.payload);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<Banner[]>) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action: PayloadAction<Banner>) => {
        state.loading = false;
        const index = state.banners.findIndex(banner => banner._id === action.payload._id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.banners = state.banners.filter(banner => banner._id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentBanner,
  addBannerToState,
  updateBannerInState,
  removeBannerFromState
} = bannerSlice.actions;
export default bannerSlice.reducer;