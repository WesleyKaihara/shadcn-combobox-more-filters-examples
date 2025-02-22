"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "1",
    label: "Next.js",
    keywords: ["react"]
  },
  {
    value: "2",
    label: "SvelteKit",
    keywords: ["svelte", "kit"]
  },
  {
    value: "3",
    label: "Nuxt.js",
    keywords: ["nuxt", "vue"]
  },
  {
    value: "4",
    label: "Remix",
    keywords: ["remix", "react"]
  },
  {
    value: "5",
    label: "Astro",
    keywords: ["astro", "static"]
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(frameworkValue, search, keywords = []) => {
            const combinedValue = frameworkValue + ' ' + keywords.join(' ')
            if (combinedValue.toLowerCase().includes(search.toLowerCase())) {
              return 1
            }
            return 0
          }}
        >
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks
                .filter(framework => {
                  const searchValue = value.toLowerCase();
                  const combinedText = `${framework.value} ${framework.label} ${framework.keywords?.join(' ') || ''}`.toLowerCase();
                  return combinedText.includes(searchValue);
                })
                .map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.label}
                    keywords={framework.keywords}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
