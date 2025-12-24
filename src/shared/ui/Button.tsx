import { PropsWithChildren } from 'react';
import { Button as HeroUIButton } from '@heroui/button';

import { cn } from '@/shared/lib';

interface ButtonProps extends PropsWithChildren {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  type = 'button',
  variant,
  children,
  className = '',
  onClick = () => {},
  isLoading = false,
  isDisabled = false,
}: ButtonProps) => {
  return (
    <HeroUIButton
      type={type}
      className={cn(
        'text-sm leading-lg text-primary-900 bg-transparent rounded-2xl h-9 py-3 px-4',
        {
          'text-primary-100 bg-primary-900 min-w-[150px]':
            variant === 'primary',
          'text-primary-100 bg-primary-600': variant === 'secondary',
          'text-danger': variant === 'danger',
        },
        className
      )}
      onPress={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      {children}
    </HeroUIButton>
  );
};
