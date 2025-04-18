import { errorCss, successCss } from "@/components/ui/sonner";
import { toast } from "sonner";


type ToastType = 'success' | 'error' | 'default';

interface UseToastReturn {
  showToast: (message: string, type?: ToastType) => string | number;
  dismissToast: (toastId: string | number) => void;
  dismissAllToasts: () => void;
}

export const useToast = (): UseToastReturn => {
  const showToast = (message: string, type: ToastType = 'default'): string | number => {
    switch (type) {
      case 'success':
        return toast.success(message, {
          style: successCss,
        });
      case 'error':
        return toast.error(message, {
          style: errorCss,
        });
      default:
        return toast(message);
    }
  };

  const dismissToast = (toastId: string | number): void => {
    toast.dismiss(toastId);
  };

  const dismissAllToasts = (): void => {
    toast.dismiss();
  };

  return {
    showToast,
    dismissToast,
    dismissAllToasts,
  };
};

export default useToast;