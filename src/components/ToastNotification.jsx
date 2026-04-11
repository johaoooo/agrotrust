import { Toaster, toast } from 'react-hot-toast';

export const showToast = {
  success: (msg) => toast.success(msg, { duration: 3000 }),
  error: (msg) => toast.error(msg, { duration: 4000 }),
  loading: (msg) => toast.loading(msg),
  dismiss: (id) => toast.dismiss(id)
};

const ToastNotification = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-text)',
          borderRadius: '12px',
          padding: '12px 16px'
        },
        success: { iconTheme: { primary: '#10b981', secondary: 'white' } },
        error: { iconTheme: { primary: '#ef4444', secondary: 'white' } }
      }}
    />
  );
};

export default ToastNotification;
