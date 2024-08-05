import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Select({
  options,
  InitialTextOption,
  valueSelected,
  autoComplete,
  size = '200',
  handleValueChange,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(valueSelected || '');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={'sm'}
          role="combobox"
          aria-expanded={open}
          aria-label={InitialTextOption}
          className={`w-[${size}px] justify-between border-black h-full max-h-10`}
        >
          {value
            ? options.find((option) => option.value === value.toString())?.label
            : InitialTextOption}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden lg:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[${size}px] p-0`}>
        <Command>
          {autoComplete && <CommandInput placeholder="Pesquisar..." />}
          <CommandList>
            {autoComplete && <CommandEmpty>Sem opções...</CommandEmpty>}
            <CommandGroup>
              <CommandList>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      handleValueChange(
                        currentValue === value ? '' : currentValue,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value.toString() === option.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
