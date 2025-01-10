import { axiosInstance } from "@/store/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// Types
interface Metadata {
  message: string;
  author: string;
  author_role: string;
}

interface Notification {
  _id: string;
  userType: 'creator' | 'customer' | 'all';
  title: string;
  details: string;
  users: string[];
  eventType?: 'order' | 'creator' | 'admin' | 'customer' | 'package' | 'general';
  metadata?: Metadata;
  userRefPath?: 'User' | 'Creator';
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateNotificationPayload {
  userType: string;
  title: string;
  details: string;
  users: string[];
}

interface NotificationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  notification: Notification | null;
  notifications: Notification[];
  totalCount: number;
}

const initialState: NotificationState = {
  loading: false,
  success: false,
  error: null,
  notification: null,
  notifications: [],
  totalCount: 0,
};

// Async Thunks
export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (token: string, { rejectWithValue }) => {
    try {
      console.log("Fetching notifications with token:", token);
      const response = await axiosInstance.get("/admin/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched notifications:", response.data.data);
      return {
        notifications: response.data.data,
        totalCount: response.data.data.length // Or response.data.count if API provides it
      };
    } catch (error) {
      console.error("Error fetching notifications:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch notifications"
      );
    }
  }
);

export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (
    { data, token }: { data: CreateNotificationPayload; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Creating notification with data:", data);
      const response = await axiosInstance.post("/admin/notifications", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Created notification:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error creating notification:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create notification"
      );
    }
  }
);

export const fetchNotificationById = createAsyncThunk(
  "notification/fetchNotificationById",
  async (
    { notificationId, token }: { notificationId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Fetching notification by ID:", notificationId);
      const response = await axiosInstance.get(
        `/admin/notifications/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched notification:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching notification by ID:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch notification"
      );
    }
  }
);

export const fetchMyNotifications = createAsyncThunk(
  "notification/fetchMyNotifications",
  async (token: string, { rejectWithValue }) => {
    try {
      console.log("Fetching my notifications with token:", token);
      const response = await axiosInstance.get("/admin/notifications/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched my notifications:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my notifications:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch my notifications"
      );
    }
  }
);

export const updateNotification = createAsyncThunk(
  "notification/updateNotification",
  async (
    {
      notificationId,
      data,
      token,
    }: {
      notificationId: string;
      data: { title?: string; details?: string };
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("Updating notification:", notificationId, "with data:", data);
      const response = await axiosInstance.patch(
        `/admin/notifications/${notificationId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated notification:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error updating notification:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update notification"
      );
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (
    { notificationId, token }: { notificationId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Deleting notification:", notificationId);
      const response = await axiosInstance.delete(
        `/admin/notifications/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Deleted notification:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting notification:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete notification"
      );
    }
  }
);

// Slice
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload || [];
      state.totalCount = action.payload?.length || 0;
    },
    clearNotification: (state) => {
      state.notification = null;
      console.log("Notification cleared");
    },
    updateTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create notification
    builder
      .addCase(createNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Creating notification...");
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notifications = Array.isArray(state.notifications)
        ? [...state.notifications, action.payload]
        : [action.payload];
      state.totalCount = state.totalCount + 1; // Increment total count
    })
      .addCase(createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to create notification:", action.payload);
      })
      // Fetch all notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching notifications...");
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && 'notifications' in action.payload) {
          state.notifications = action.payload.notifications;
          state.totalCount = action.payload.totalCount;
        } else {
          state.notifications = action.payload as Notification[];
          state.totalCount = (action.payload as Notification[]).length;
        }
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to fetch notifications:", action.payload);
      })
      // Fetch notification by ID
      .addCase(fetchNotificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching notification by ID...");
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
        console.log("Notification fetched successfully");
      })
      .addCase(fetchNotificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to fetch notification:", action.payload);
      })
      // Fetch my notifications
      .addCase(fetchMyNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching my notifications...");
      })
      .addCase(fetchMyNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        console.log("My notifications fetched successfully");
      })
      .addCase(fetchMyNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to fetch my notifications:", action.payload);
      })
      // Update notification
      .addCase(updateNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Updating notification...");
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notification = action.payload;
        state.notifications = state.notifications.map((notification) =>
          notification._id === action.payload._id ? action.payload : notification
        );
        console.log("Notification updated successfully");
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to update notification:", action.payload);
      })
      // Delete notification
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Deleting notification...");
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notifications = state.notifications.filter(
          (notification) => notification._id !== action.payload._id
        );
        if (state.notification?._id === action.payload._id) {
          state.notification = null;
        }
        console.log("Notification deleted successfully");
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to delete notification:", action.payload);
      });
  },
});

export default notificationSlice.reducer;

export const { setNotifications, clearNotification } = notificationSlice.actions;

// Selectors
export const selectNotifications = (state: { notification: NotificationState }) => 
  state.notification.notifications || [];
export const selectNotification = (state: { notification: NotificationState }) => state.notification.notification;
export const selectNotificationLoading = (state: { notification: NotificationState }) => state.notification.loading;
export const selectNotificationError = (state: { notification: NotificationState }) => state.notification.error;
export const selectNotificationSuccess = (state: { notification: NotificationState }) => state.notification.success;
export const selectTotalCount = (state: { notification: NotificationState }) => state.notification.totalCount;