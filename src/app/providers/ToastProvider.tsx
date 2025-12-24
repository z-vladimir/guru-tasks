import { ToastProvider as HeroToastProvider } from '@heroui/toast';

export const ToastProvider = () => {
  return (
    <HeroToastProvider
      toastProps={{
        variant: 'flat',
        classNames: {
          base: 'rounded-sm',
        },
      }}
    />
  );
};
