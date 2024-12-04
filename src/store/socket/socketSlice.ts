// src/store/socket/socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SocketState = {
    connected: boolean;
    loading: boolean;
    error: string;
};

const initialState: SocketState = {
    connected: false,
    loading: false,
    error: '',
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocketConnected: (state) => {
            state.connected = true;
            state.loading = false;
            state.error = '';
        },
        setSocketDisconnected: (state) => {
            state.connected = false;
            state.loading = false;
        },
        setSocketLoading: (state) => {
            state.loading = true;
        },
        setSocketError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setSocketConnected,
    setSocketDisconnected,
    setSocketLoading,
    setSocketError,
} = socketSlice.actions;

export default socketSlice.reducer;

export const selectSocketStatus = (state: any) => state.socket.connected;
export const selectSocketLoading = (state: any) => state.socket.loading;
export const selectSocketError = (state: any) => state.socket.error;
