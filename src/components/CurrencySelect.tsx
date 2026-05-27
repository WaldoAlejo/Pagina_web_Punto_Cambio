import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface CurrencySelectProps {
  currencies: Currency[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const CurrencySelect = ({
  currencies,
  value,
  onChange,
  disabled,
  placeholder = "Buscar moneda…",
}: CurrencySelectProps) => {
  const [open, setOpen] = React.useState(false);

  const selected = currencies.find((c) => c.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full sm:w-44 h-11 sm:h-12 justify-between bg-background border-input px-3 text-sm font-medium hover:bg-accent",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? (
            <span className="flex items-center gap-2">
              <span className="text-base">{selected.flag}</span>
              <span>{selected.code}</span>
            </span>
          ) : (
            "Seleccionar…"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-64 p-0">
        <Command
          filter={(value, search) => {
            const currency = currencies.find((c) => c.code.toLowerCase() === value.toLowerCase());
            if (!currency) return 0;
            const searchLower = search.toLowerCase();
            const text = `${currency.code} ${currency.name} ${currency.flag}`.toLowerCase();
            return text.includes(searchLower) ? 1 : 0;
          }}
        >
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput placeholder={placeholder} className="h-10" />
          </div>
          <CommandList className="max-h-64 overflow-y-auto">
            <CommandEmpty>No se encontró la moneda.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.code}
                  value={currency.code}
                  onSelect={() => {
                    onChange(currency.code);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-base">{currency.flag}</span>
                  <span className="font-medium">{currency.code}</span>
                  <span className="text-muted-foreground text-xs ml-auto truncate">
                    {currency.name}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 shrink-0",
                      value === currency.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
