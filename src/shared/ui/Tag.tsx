import { PropsWithChildren } from 'react';

import { Task } from '@/entities/task';
import { cn } from '../lib';

interface TagProps extends PropsWithChildren {
  variant?: Task['status'];
  className?: string;
}

export const Tag = ({ variant = 'backlog', className, children }: TagProps) => {
  return (
    <p
      className={cn(
        'text-xs font-medium leading-base capitalize text-primary-700 rounded-lg w-max py-1 px-2',
        {
          'bg-status-success': variant === 'in_progress',
          'bg-status-warning': variant === 'done',
          'bg-primary-200': variant === 'backlog',
        },
        className
      )}
    >
      {children}
    </p>
  );
};
