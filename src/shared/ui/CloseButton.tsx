import { cn } from '../lib';
import { Button } from './Button';
import { CloseRoundIcon } from '../assets';

interface CloseButtonProps {
  className?: string;
}

export const CloseButton = ({ className }: CloseButtonProps) => {
  return (
    <Button className={cn('w-[9] min-w-[9] bg-primary-100', className)}>
      <CloseRoundIcon size={12} className="fill-primary-900" />
    </Button>
  );
};
