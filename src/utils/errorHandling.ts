import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

/**
 * Handles API errors consistently across the application
 * @param error The error object from the API call
 * @param fallbackMessage A fallback message to display if the error doesn't have a message
 * @param showToast Whether to show a toast notification
 * @returns The error message
 */
export const handleApiError = (
  error: unknown,
  fallbackMessage = 'An unexpected error occurred',
  showToast = true
): string => {
  let errorMessage = fallbackMessage;

  // Log the error in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('API Error:', error);
  }

  // Handle Axios errors
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;

    // Get the status code
    const status = axiosError.response?.status;

    // Handle different status codes
    if (status === 401) {
      errorMessage = 'Your session has expired. Please log in again.';

      // Clear local storage and redirect to login if not already there
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/giris-yap')) {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = '/giris-yap';
        }, 2000);
      }
    } else if (status === 403) {
      errorMessage = 'You do not have permission to perform this action.';
    } else if (status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (status === 500) {
      errorMessage = 'A server error occurred. Please try again later.';
    }

    // Try to get a more specific error message from the response
    if (axiosError.response?.data) {
      const data = axiosError.response.data as any;
      if (data.message) {
        errorMessage = data.message;
      } else if (typeof data === 'string') {
        errorMessage = data;
      }
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Show toast if requested
  if (showToast) {
    toast.error(errorMessage);
  }

  return errorMessage;
};

/**
 * Handles successful API responses consistently across the application
 * @param message The success message to display
 * @param showToast Whether to show a toast notification
 */
export const handleApiSuccess = (
  message: string,
  showToast = true
): void => {
  if (showToast) {
    toast.success(message);
  }

  // Log the success in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('API Success:', message);
  }
};
