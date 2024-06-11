import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function InputSelect({
  options,
  placeholder,
  onChange,
  disabled,
}) {
  return (
    <>
      <Select onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent on>
          <SelectItem value={null}>{placeholder}</SelectItem>
          {options.map((option) => (
            <SelectItem value={option.value}>{option.option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
