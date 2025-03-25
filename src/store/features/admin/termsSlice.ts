import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/store/axiosInstance';
import { AxiosError } from 'axios';
import { TermsInterface } from '@/types/interfaces';



export interface TermState {
    terms: TermsInterface[];
    currentTerm: TermsInterface | null;
    loading: boolean;
    error: string | null;
}

const initialState: TermState = {
    terms: [],
    currentTerm: null,
    loading: false,
    error: null,
};

// Create a new term
export const createTerm = createAsyncThunk(
    'term/createTerm',
    async (
        { term, token }: { term: Partial<TermsInterface>; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post('/admin/terms', term, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || 'Failed to create term'
            );
        }
    }
);


// Fetch all terms
export const fetchTerms = createAsyncThunk(
    'term/fetchTerms',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/terms', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || 'Failed to fetch terms'
            );
        }
    }
);

// Fetch single term by ID
export const fetchTermById = createAsyncThunk(
    'term/fetchTermById',
    async (
        { blogId, token }: { blogId: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(`/admin/terms/${blogId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || 'Failed to fetch term'
            );
        }
    }
);

// Update term
export const updateTerm = createAsyncThunk(
    'term/updateTerm',
    async (
        { blogId, blogData, token }: { blogId: string; blogData: FormData; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.patch(
                `/admin/terms/${blogId}`,
                blogData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            console.error('Error updating term:', error);

            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || 'Failed to update term'
            );
        }
    }
);


// Delete a term
export const deleteTerm = createAsyncThunk(
    'term/deleteTerm',
    async (
        { blogId, token }: { blogId: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.delete(`/admin/terms/${blogId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(
                axiosError.response?.data || 'Failed to delete term'
            );
        }
    }
);

const termSlice = createSlice({
    name: 'term',
    initialState,
    reducers: {
        setCurrentTerm: (state, action: PayloadAction<TermsInterface | null>) => {
            state.currentTerm = action.payload;
        },
        clearCurrentTerm: (state) => {
            state.currentTerm = null;
        },
        addTermToState: (state, action: PayloadAction<TermsInterface>) => {
            state.terms.push(action.payload);
        },
        updateTermInState: (state, action: PayloadAction<TermsInterface>) => {
            const index = state.terms.findIndex(term => term._id === action.payload._id);
            if (index !== -1) {
                state.terms[index] = action.payload;
            }
        },
        removeTermFromState: (state, action: PayloadAction<string>) => {
            state.terms = state.terms.filter(term => term._id !== action.payload);
        },
        setClearTerm: (state) => {
            state.currentTerm = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Create term
            .addCase(createTerm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTerm.fulfilled, (state, action: PayloadAction<TermsInterface>) => {
                state.loading = false;
                state.terms.push(action.payload)
            })
            .addCase(createTerm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch all terms
            .addCase(fetchTerms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTerms.fulfilled, (state, action: PayloadAction<TermsInterface[]>) => {
                state.loading = false;
                state.terms = action.payload;
            })
            .addCase(fetchTerms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch term by ID
            .addCase(fetchTermById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTermById.fulfilled, (state, action: PayloadAction<TermsInterface>) => {
                state.loading = false;
                state.currentTerm = action.payload;
            })
            .addCase(fetchTermById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update term
            .addCase(updateTerm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTerm.fulfilled, (state, action: PayloadAction<TermsInterface>) => {
                state.loading = false;
                const index = state.terms.findIndex(
                    (term) => term._id === action.payload._id
                );
                if (index !== -1) {
                    state.terms[index] = action.payload;
                }
                if (state.currentTerm?._id === action.payload._id) {
                    state.currentTerm = action.payload;
                }
            })
            .addCase(updateTerm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete a term
            .addCase(deleteTerm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTerm.fulfilled, (state, action: PayloadAction<TermsInterface>) => {
                state.loading = false;
                state.terms = state.terms.filter(
                    (term) => term._id !== action.payload._id
                );
                if (state.currentTerm?._id === action.payload._id) {
                    state.currentTerm = null;
                }
            })
            .addCase(deleteTerm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addTermToState, clearCurrentTerm, removeTermFromState, setClearTerm, setCurrentTerm, updateTermInState } = termSlice.actions;
export default termSlice.reducer;