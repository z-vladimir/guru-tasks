import { MouseEvent, PropsWithChildren } from 'react';

import { CloseIcon } from '../assets';

interface ChipProps extends PropsWithChildren {
  onClick?: (event: MouseEvent) => void;
}

export const Chip = ({ children, onClick }: ChipProps) => {
  return (
    <div
      onClick={onClick}
      className="text-sm leading-md tracking-md bg-primary-900 text-primary-100 capitalize rounded-xs h-[20px] inline-flex items-center gap-1 px-1"
    >
      {children}

      <CloseIcon />
    </div>
  );
};
