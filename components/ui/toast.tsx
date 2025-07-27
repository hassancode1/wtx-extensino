import React from "react";
import { Toaster, toast as sonnerToast } from "sonner";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  id?: string | number;
  dismissible?: boolean;
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

// Custom toast icons
const toastIcons = {
  success: <CheckCircle className="w-4 h-4" />,
  error: <AlertCircle className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
  loading: (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  ),
};

// Toast component configuration
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
        toastOptions={{
          className: "toast-custom",
          descriptionClassName: "toast-description",
        }}
        icons={{
          success: toastIcons.success,
          error: toastIcons.error,
          warning: toastIcons.warning,
          info: toastIcons.info,
          loading: toastIcons.loading,
        }}
      />
    </>
  );
};

// Enhanced toast functions
// eslint-disable-next-line react-refresh/only-export-components
export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, {
      description: options?.description,
      duration: options?.duration || Infinity,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  // Default toast (can be used for custom styling)
  default: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  // Promise-based toast for async operations
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
    options?: ToastOptions
  ) => {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      duration: options?.duration,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  // Custom toast with JSX content
  custom: (
    jsx: (id: number | string) => React.ReactElement,
    options?: ToastOptions
  ) => {
    return sonnerToast.custom(jsx, {
      duration: options?.duration || 4000,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  // Utility functions
  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  },

  message: (message: string, options?: ToastOptions) => {
    return sonnerToast.message(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      id: options?.id,
      dismissible: options?.dismissible !== false,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },
};

// Custom toast styles (to be added to your CSS)
export const toastStyles = `
  .toast-custom {
    @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg;
  }
  
  .toast-description {
    @apply text-gray-600 dark:text-gray-400 text-sm mt-1;
  }
  
  .toast-action {
    @apply bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors;
  }
  
  .toast-cancel {
    @apply bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded text-sm font-medium transition-colors;
  }
`;

// Usage examples and hook
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return {
    toast,
    dismiss: toast.dismiss,
  };
};

// Custom hook for common toast patterns
// eslint-disable-next-line react-refresh/only-export-components
export const useToastActions = () => {
  const showSuccess = (message: string, description?: string) => {
    toast.success(message, { description });
  };

  const showError = (message: string, description?: string) => {
    toast.error(message, { description });
  };

  const showWarning = (message: string, description?: string) => {
    toast.warning(message, { description });
  };

  const showInfo = (message: string, description?: string) => {
    toast.info(message, { description });
  };

  const showLoading = (message: string, description?: string) => {
    return toast.loading(message, { description });
  };

  const showPromise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return toast.promise(promise, messages);
  };

  const showConfirmation = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    return toast.default(message, {
      action: {
        label: "Confirm",
        onClick: onConfirm,
      },
      cancel: {
        label: "Cancel",
        onClick: onCancel,
      },
      duration: 10000,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showPromise,
    showConfirmation,
  };
};

export default ToastProvider;
