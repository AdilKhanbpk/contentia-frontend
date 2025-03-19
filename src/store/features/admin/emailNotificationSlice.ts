import { axiosInstance } from "@/store/axiosInstance";
import { EmailNotificationInterface } from "@/types/interfaces";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";




interface EmailNotificationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  currentEmailNotification: EmailNotificationInterface | null;
  emailNotifications: EmailNotificationInterface[];
}

const initialState: EmailNotificationState = {
  loading: false,
  success: false,
  error: null,
  currentEmailNotification: null,
  emailNotifications: [],
};

// Async Thunks
export const fetchEmailNotifications = createAsyncThunk(
  "emailNotification/fetchEmailNotifications",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/emailNotifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        emailNotifications: response.data.data,
        totalCount: response.data.data.length
      };
    } catch (error) {
      console.error("Error fetching emailNotifications:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch emailNotifications"
      );
    }
  }
);

export const createEmailNotification = createAsyncThunk(
  "emailNotification/createNotification",
  async (
    { data, token }: { data: EmailNotificationInterface; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/admin/emailNotifications", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error creating emailNotification:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create emailNotification"
      );
    }
  }
);

export const fetchEmailNotificationById = createAsyncThunk(
  "emailNotification/fetchNotificationById",
  async (
    { emailNotificationId, token }: { emailNotificationId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/admin/emailNotifications/${emailNotificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching emailNotification by ID:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch emailNotification"
      );
    }
  }
);

export const updateEmailNotification = createAsyncThunk(
  "emailNotification/updateNotification",
  async (
    {
      emailNotificationId,
      data,
      token,
    }: {
      emailNotificationId: string;
      data: { title?: string; details?: string };
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/emailNotifications/${emailNotificationId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating emailNotification:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update emailNotification"
      );
    }
  }
);

export const deleteEmailNotification = createAsyncThunk(
  "emailNotification/deleteNotification",
  async (
    { emailNotificationId, token }: { emailNotificationId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/emailNotifications/${emailNotificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error deleting emailNotification:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete emailNotification"
      );
    }
  }
);

// Slice
const emailNotificationSlice = createSlice({
  name: "emailNotification",
  initialState,
  reducers: {
    setEmailNotifications: (state, action: PayloadAction<EmailNotificationInterface[]>) => {
      state.emailNotifications = action.payload || [];
    },
    clearEmailNotification: (state) => {
      state.currentEmailNotification = null;
    },

  },
  extraReducers: (builder) => {
    // Create emailNotification
    builder
      .addCase(createEmailNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmailNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.emailNotifications = Array.isArray(state.emailNotifications)
          ? [...state.emailNotifications, action.payload]
          : [action.payload];
      })
      .addCase(createEmailNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to create emailNotification:", action.payload);
      })
      // Fetch all emailNotifications
      .addCase(fetchEmailNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailNotifications.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && 'emailNotifications' in action.payload) {
          state.emailNotifications = action.payload.emailNotifications;
        } else {
          state.emailNotifications = action.payload as EmailNotificationInterface[];
        }
      })
      .addCase(fetchEmailNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to fetch emailNotifications:", action.payload);
      })
      // Fetch emailNotification by ID
      .addCase(fetchEmailNotificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEmailNotification = action.payload;
      })
      .addCase(fetchEmailNotificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to fetch emailNotification:", action.payload);
      })
      // Update emailNotification
      .addCase(updateEmailNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmailNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentEmailNotification = action.payload;
        state.emailNotifications = state.emailNotifications.map((emailNotification) =>
          emailNotification._id === action.payload._id ? action.payload : emailNotification
        );
      })
      .addCase(updateEmailNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to update emailNotification:", action.payload);
      })
      // Delete emailNotification
      .addCase(deleteEmailNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmailNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.emailNotifications = state.emailNotifications.filter(
          (emailNotification) => emailNotification._id !== action.payload._id
        );
        if (state.currentEmailNotification?._id === action.payload._id) {
          state.currentEmailNotification = null;
        }
      })
      .addCase(deleteEmailNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to delete emailNotification:", action.payload);
      });
  },
});

export default emailNotificationSlice.reducer;

export const { clearEmailNotification, setEmailNotifications } = emailNotificationSlice.actions;

// Selectors
export const selectNotifications = (state: { emailNotification: EmailNotificationState }) =>
  state.emailNotification.emailNotifications || [];
export const selectCurrentNotification = (state: { emailNotification: EmailNotificationState }) => state.emailNotification.currentEmailNotification;
export const selectNotification = (state: { emailNotification: EmailNotificationState }) => state.emailNotification.currentEmailNotification;
export const selectNotificationLoading = (state: { emailNotification: EmailNotificationState }) => state.emailNotification.loading;
export const selectNotificationError = (state: { emailNotification: EmailNotificationState }) => state.emailNotification.error;
export const selectNotificationSuccess = (state: { emailNotification: EmailNotificationState }) => state.emailNotification.success;
