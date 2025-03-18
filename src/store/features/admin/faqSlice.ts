import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/store/axiosInstance";
import { AxiosError } from "axios";

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FaqState {
  faqs: Faq[];
  currentFaq: Faq | null;
  loading: boolean;
  error: string | null;
}

interface CreateFaqPayload {
  data: {
    question: string;
    answer: string;
  };
  token: string;
}

interface UpdateFaqPayload {
  faqId: string;
  data: {
    question: string;
    answer: string;
  };
  token: string;
}

interface DeleteFaqPayload {
  faqId: string;
  token: string;
}

const initialState: FaqState = {
  faqs: [],
  currentFaq: null,
  loading: false,
  error: null,
};

// Create a new FAQ
export const createFaq = createAsyncThunk(
  "faq/createFaq",
  async ({ data, token }: CreateFaqPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.post("/admin/faq", data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create FAQ"
      );
    }
  }
);

// Fetch all FAQs
export const fetchFaqs = createAsyncThunk(
  "faq/fetchFaqs",
  async (token: string, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get("/admin/faq");
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch FAQs"
      );
    }
  }
);

// Update a FAQ by ID
export const updateFaq = createAsyncThunk(
  "faq/updateFaq",
  async ({ faqId, data, token }: UpdateFaqPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.patch(`/admin/faq/${faqId}`, data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || `Failed to update FAQ with ID ${faqId}`
      );
    }
  }
);

// Delete a FAQ by ID
export const deleteFaq = createAsyncThunk(
  "faq/deleteFaq",
  async ({ faqId, token }: DeleteFaqPayload, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axiosInstance.delete(`/admin/faq/${faqId}`);
      return faqId;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || `Failed to delete FAQ with ID ${faqId}`
      );
    }
  }
);

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create FAQ
      .addCase(createFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFaq.fulfilled, (state, action: PayloadAction<Faq>) => {
        state.loading = false;
        state.faqs.push(action.payload);
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch FAQs
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action: PayloadAction<Faq[]>) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update FAQ
      .addCase(updateFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFaq.fulfilled, (state, action: PayloadAction<Faq>) => {
        state.loading = false;
        state.faqs = state.faqs.map((faq) =>
          faq._id === action.payload._id ? action.payload : faq
        );
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete FAQ
      .addCase(deleteFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFaq.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.faqs = state.faqs.filter((faq) => faq._id !== action.payload);
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default faqSlice.reducer;