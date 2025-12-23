import { PropsWithChildren } from 'react';
import { Button as HeroUIButton } from '@heroui/button';

import { cn } from '@/shared/lib';

interface ButtonProps extends PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export const Button = ({
  variant,
  className = '',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <HeroUIButton
      className={cn(
        'text-sm leading-lg text-primary-900 bg-transparent rounded-2xl h-9 py-3 px-4',
        {
          'text-primary-100 bg-primary-900 min-w-[150]': variant === 'primary',
          'text-primary-100 bg-primary-600': variant === 'secondary',
          'text-danger': variant === 'danger',
        },
        className
      )}
      {...rest}
    >
      {children}
    </HeroUIButton>
  );
};
