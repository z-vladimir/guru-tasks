import { ReactNode } from 'react';
import { useForm, Controller, FormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';

import {
  STATUSES,
  LABELS,
  taskFormSchema,
  TaskFormValues,
  getStatusText,
} from '@/entities/task';
import { SelectValue } from '@/shared/ui';

interface TaskFormProps {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (data: TaskFormValues) => void;
  isEdit?: boolean;
  renderActions?: ({
    isValid,
  }: Pick<FormState<TaskFormValues>, 'isValid'>) => ReactNode;
}

const inputClassNames = {
  label: 'text-sm font-medium leading-md pb-1',
  input: 'text-sm leading-md tracking-sm placeholder:text-primary-700',
  inputWrapper: 'min-h-9 h-9 rounded-sm shadow-none bg-primary-100 px-4 py-2',
};

const selectClassNames = {
  classNames: {
    label: inputClassNames.label,
    trigger: inputClassNames.inputWrapper,
    value: 'text-sm leading-md tracking-sm capitalize',
    popoverContent: 'rounded-sm p-4',
    listboxWrapper: 'p-0',
    listbox: 'p-0',
  },
  listboxProps: {
    itemClasses: {
      base: 'rounded-xs',
      title: 'text-sm font-regular leading-md capitalize',
      selectedIcon: 'text-primary-900',
    },
  },
};

export const TaskForm = ({
  onSubmit,
  defaultValues,
  isEdit = false,
  renderActions = () => null,
}: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onChange',
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
            {...field}
            label="Task Name"
            labelPlacement="outside-top"
            placeholder="e.g. SEO meta tags"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            classNames={inputClassNames}
            fullWidth
          />
        )}
      />
      <Controller
        name="key"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Task Key"
            labelPlacement="outside-top"
            placeholder="e.g. TASK-005"
            isInvalid={!!errors.key}
            errorMessage={errors.key?.message}
            classNames={inputClassNames}
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Description"
            labelPlacement="outside-top"
            placeholder="Task Description"
            minRows={4}
            classNames={{
              ...inputClassNames,
            }}
            fullWidth
          />
        )}
      />

      <div className="flex gap-4">
        <Controller
          name="labels"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label="Labels"
              labelPlacement="outside-top"
              placeholder="Choose Label"
              selectionMode="multiple"
              selectedKeys={value || []}
              onSelectionChange={(keys) => onChange(Array.from(keys))}
              fullWidth
              renderValue={(items) => (
                <SelectValue
                  items={items}
                  value={value || []}
                  onChange={onChange}
                  count={isEdit ? 2 : 5}
                />
              )}
              {...selectClassNames}
            >
              {LABELS.map((label) => (
                <SelectItem key={label}>{label}</SelectItem>
              ))}
            </Select>
          )}
        />

        {isEdit && (
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                label="Task Status"
                labelPlacement="outside-top"
                selectedKeys={value ? new Set([value]) : new Set()}
                onSelectionChange={(keys) => onChange(Array.from(keys)[0])}
                placeholder="Choose Status"
                fullWidth
                {...selectClassNames}
              >
                {STATUSES.map((status) => (
                  <SelectItem key={status}>{getStatusText(status)}</SelectItem>
                ))}
              </Select>
            )}
          />
        )}
      </div>

      {renderActions && (
        <div className="mt-6">
          {renderActions({
            isValid,
          })}
        </div>
      )}
    </form>
  );
};
