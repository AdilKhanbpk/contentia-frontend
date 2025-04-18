import { axiosInstance } from "@/store/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// Types
interface Metadata {
  message: string;
  author: string;
  author_role: string;
}

export interface NotificationInterface {
  _id: string;
  userType: 'creator' | 'customer' | 'all';
  title: string;
  details: string;
  users: string[];
  eventType?: 'order' | 'creator' | 'admin' | 'customer' | 'package' | 'general';
  metadata?: Metadata;
  userRefPath?: 'User' | 'Creator';
  readBy: string[];
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
  notification: NotificationInterface | null;
  notifications: NotificationInterface[];
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
      const response = await axiosInstance.get("/admin/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        notifications: response.data.data,
        totalCount: response.data.data.length
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

export const fetchMyUnreadNotifications = createAsyncThunk(
  "notification/fetchUnreadNotifications",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/my-unread-notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch unread notifications"
      );
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async (
    { notificationId, token }: { notificationId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/notifications/is-marked-read/${notificationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to mark notification as read"
      );
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async (
    token: string,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/notifications/mark-all-as-read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to mark notification as read"
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
      const response = await axiosInstance.post("/admin/notifications", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axiosInstance.get(
        `/admin/notifications/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const response = await axiosInstance.get("/admin/notifications/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const response = await axiosInstance.patch(
        `/admin/notifications/${notificationId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const response = await axiosInstance.delete(
        `/admin/notifications/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
    setNotifications: (state, action: PayloadAction<NotificationInterface[]>) => {
      state.notifications = action.payload || [];
      state.totalCount = action.payload?.length || 0;
    },
    clearNotification: (state) => {
      state.notification = null;
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
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notifications = Array.isArray(state.notifications)
          ? [...state.notifications, action.payload]
          : [action.payload];
        state.totalCount = state.totalCount + 1;
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
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && 'notifications' in action.payload) {
          state.notifications = action.payload.notifications;
          state.totalCount = action.payload.totalCount;
        } else {
          state.notifications = action.payload as NotificationInterface[];
          state.totalCount = (action.payload as NotificationInterface[]).length;
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
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
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
      })
      .addCase(fetchMyNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchMyNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to fetch my notifications:", action.payload);
      })

      // Fetch unread notifications
      .addCase(fetchMyUnreadNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyUnreadNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchMyUnreadNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Mark as read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updated = action.payload;
        state.notifications = state.notifications.map((n) =>
          n._id === updated._id ? updated : n
        );
      })

      .addCase(markAllAsRead.fulfilled, (state, action) => {
        const updated = action.payload;
        state.notifications = state.notifications.map((n) =>
          n._id === updated._id ? updated : n
        );
      })

      // Update notification
      .addCase(updateNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notification = action.payload;
        state.notifications = state.notifications.map((notification) =>
          notification._id === action.payload._id ? action.payload : notification
        );
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
export const selectCurrentNotification = (state: { notification: NotificationState }) => state.notification.notification;
export const selectNotification = (state: { notification: NotificationState }) => state.notification.notification;
export const selectNotificationLoading = (state: { notification: NotificationState }) => state.notification.loading;
export const selectNotificationError = (state: { notification: NotificationState }) => state.notification.error;
export const selectNotificationSuccess = (state: { notification: NotificationState }) => state.notification.success;
export const selectTotalCount = (state: { notification: NotificationState }) => state.notification.totalCount;

export const selectUnreadNotificationCountByUser = (userId: string) =>
  createSelector(
    selectUnreadNotificationsByUser(userId),
    (unread) => unread.length
  );


export const selectUnreadNotificationsByUser = (userId: string) =>
  createSelector(
    (state: { notification: NotificationState }) => state.notification.notifications,
    (notifications) => notifications.filter(
      (n) => !n.readBy?.includes(userId)
    )
  );
