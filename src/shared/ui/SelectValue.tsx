import { SelectedItemProps } from '@heroui/react';

import { Chip } from './Chip';

interface SelectValueProps {
  items: SelectedItemProps<object>[];
  value: string[];
  count: number;
  onChange: (value: string[]) => void;
}

export const SelectValue = ({
  items,
  value,
  onChange,
  count,
}: SelectValueProps) => {
  return (
    <div className="flex flex-wrap align-center gap-1">
      {items.slice(0, count).map((item) => (
        <Chip
          key={item.key}
          onClick={() => {
            const newKeys = Array.from(value || []).filter(
              (key: string) => key !== item.key
            );
            onChange(newKeys);
          }}
        >
          {item.key}
        </Chip>
      ))}
      {items.length > count && (
        <span className="text-sm">+{items.length - count}</span>
      )}
    </div>
  );
};
