import React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Keys } from '@/pages/onboarding/birthday';

export function BirthdayComboBox({
  keys,
  placeholder,
  inputMode,
  inputChangeHandler,
}: {
  keys: Keys;
  placeholder: string;
  inputMode: 'numeric' | 'text';
  inputChangeHandler: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='first-surface'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {inputValue
            ? keys.find(key => key.label.toLowerCase() === inputValue)?.label
            : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] border-[#2d2d2d] bg-transparent p-0 shadow-2xl'>
        <Command className='bg-[#2D2D2D]'>
          <CommandInput
            className='text-high-emphasis placeholder:text-gray'
            inputMode={inputMode}
            placeholder={`Search ${placeholder.toLowerCase()}... `}
          />
          <CommandEmpty className='py-6 text-center text-sm text-high-emphasis'>
            No results.
          </CommandEmpty>
          <CommandGroup className='p-0'>
            <ScrollArea className='h-52 bg-transparent'>
              {keys.map(key => (
                <CommandItem
                  className='h-12 cursor-pointer rounded-none text-base text-high-emphasis aria-selected:bg-[#474747] aria-selected:text-high-emphasis'
                  key={key.value}
                  value={key.label}
                  onSelect={currentValue => {
                    inputChangeHandler(currentValue);
                    setInputValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      inputValue === key.label.toLowerCase() ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {key.label}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
