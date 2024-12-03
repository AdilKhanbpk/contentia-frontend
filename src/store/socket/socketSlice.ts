import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SocketState = {
    socket: any;
    loading: boolean;
    error: string;
};

const initialState: SocketState = {
    socket: null,
    loading: false,
    error: '',
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<any>) => {
            state.socket = action.payload;
            state.loading = false; // Socket is set, so stop loading
            state.error = ''; // Reset any previous errors
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearSocket: (state) => {
            state.socket = null;
            state.loading = false;
            state.error = '';
        },
    },
});

export const { setSocket, setLoading, setError, clearSocket } = socketSlice.actions;

export default socketSlice.reducer;

export const selectSocket = (state: any) => state.socket.socket;
export const selectSocketLoading = (state: any) => state.socket.loading;
export const selectSocketError = (state: any) => state.socket.error;
