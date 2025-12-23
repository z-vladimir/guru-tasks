import { PropsWithChildren } from 'react';

import { cn } from '../lib';

interface TagProps extends PropsWithChildren {
  color?: 'success' | 'secondary' | 'warning';
  className?: string;
}

export const Tag = ({ color = 'success', className, children }: TagProps) => {
  return (
    <p
      className={cn(
        'text-xs font-medium leading-base text-primary-700 inline-block rounded-lg py-1 px-2',
        {
          'bg-status-success': color === 'success',
          'bg-status-warning': color === 'warning',
          'bg-primary-200': color === 'secondary',
        },
        className
      )}
    >
      {children}
    </p>
  );
};
