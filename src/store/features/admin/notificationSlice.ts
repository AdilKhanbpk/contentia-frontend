import { axiosInstance } from "@/store/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface CreateNotificationPayload {
    title: string;
    message: string;
    link: string;
}

const initialState = {
    loading: false,
    success: false,
    error: null,
    notification: null,
    notifications: [],
};

export const fetchNotifications = createAsyncThunk(
    "notification/fetchNotifications",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/admin/notifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to fetch notifications"
            );
        }
    }
)

export const createNotification = createAsyncThunk(
    "notification/createNotification",
    async ({ data, token }: { data: CreateNotificationPayload, token: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/admin/notifications", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        }
        catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || "Failed to create notification"
            );
        }
    }
)

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<any>) => {
            state.notifications = action.payload
        }
    },
    extraReducers: (builder) => { },
});

export default notificationSlice.reducer;

export const { setNotifications } = notificationSlice.actions;

export const selectNotifications = (state: any) => state.notification.notifications;
export const selectNotification = (state: any) => state.notification.notification;
export const selectNotificationLoading = (state: any) => state.notification.loading;
export const selectNotificationError = (state: any) => state.notification.error;
