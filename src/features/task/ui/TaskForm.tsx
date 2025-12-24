import { z } from 'zod';
import { ReactNode } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';

import { STATUSES, LABELS } from '@/entities/task';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  key: z.string().min(1, 'Key is required'),
  description: z.string().optional(),
  labels: z.array(z.enum(LABELS)).optional(),
  status: z.enum(STATUSES),
});

type FormValues = z.infer<typeof schema>;

interface TaskFormProps {
  isLoading?: boolean;
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  renderFooter?: () => ReactNode;
}

export const TaskForm = ({
  onSubmit,
  defaultValues,
  renderFooter = () => null,
}: TaskFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      key: '',
      description: '',
      labels: [],
      status: 'backlog',
      ...defaultValues,
    },
  });

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            labelPlacement="outside"
            label="Name"
            {...field}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name="key"
        control={control}
        render={({ field }) => (
          <Input
            labelPlacement="outside"
            label="Key"
            {...field}
            isInvalid={!!errors.key}
            errorMessage={errors.key?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            labelPlacement="outside"
            label="Description"
            {...field}
            minRows={3}
            maxRows={8}
            fullWidth
          />
        )}
      />

      <div className="flex gap-4">
        <Controller
          name="labels"
          control={control}
          render={({ field }) => (
            <Select
              labelPlacement="outside"
              label="Labels"
              selectionMode="multiple"
              selectedKeys={field.value || []}
              onSelectionChange={field.onChange}
              placeholder="Select labels"
              fullWidth
            >
              {LABELS.map((label) => (
                <SelectItem key={label}>{label}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              labelPlacement="outside"
              label="Status"
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string;
                field.onChange(value);
              }}
              placeholder="Select status"
              fullWidth
            >
              {STATUSES.map((status) => (
                <SelectItem key={status}>{status}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      {renderFooter && <div className="mt-6">{renderFooter()}</div>}
    </form>
  );
};
