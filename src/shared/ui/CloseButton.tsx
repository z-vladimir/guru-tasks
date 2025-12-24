import { cn } from '../lib';
import { Button } from './Button';
import { CloseRoundIcon } from '../assets';

interface CloseButtonProps {
  className?: string;
  onClick?: () => void;
}

export const CloseButton = ({ className, onClick }: CloseButtonProps) => {
  return (
    <Button
      className={cn('w-9 min-w-9 bg-primary-100', className)}
      onClick={onClick}
    >
      <CloseRoundIcon size={12} className="fill-primary-900" />
    </Button>
  );
};
