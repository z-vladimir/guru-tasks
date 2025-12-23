import { PropsWithChildren } from 'react';

import { CloseIcon } from '../assets';
import { Button } from './Button';

export const Chip = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-sm leading-md tracking-md bg-primary-900 text-primary-100 rounded-xs h-[20] inline-flex items-center pl-1 pr-0">
      {children}
      <Button className="rounded-xs h-auto w-auto min-w-auto p-1">
        <CloseIcon />
      </Button>
    </div>
  );
};
