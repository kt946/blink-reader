import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Check, ChevronsUpDown } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useSettings } from '@/components/settings-provider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';
import { fontFamilyList } from '@/constants';

const SettingsDialog = () => {
  // Access state from SettingsProvider
  const {
    wordsAtATime,
    setWordsAtATime,
    wordsPerMinute,
    setWordsPerMinute,
    fontFamily,
    setFontFamily,
    fontWeight,
    setFontWeight,
    fontSize,
    setFontSize,
  } = useSettings();
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const FormSchema = z.object({
    wordsAtATime: z.string(),
    wordsPerMinute: z.string(),
    fontFamily: z.string(),
    fontWeight: z.string(),
    fontSize: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wordsAtATime: wordsAtATime.toString(),
      wordsPerMinute: wordsPerMinute.toString(),
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      fontSize: fontSize,
    },
  });

  // Submit form and update state from SettingsProvider
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setWordsAtATime(parseInt(values.wordsAtATime));
    setWordsPerMinute(parseInt(values.wordsPerMinute));
    setFontFamily(values.fontFamily);
    setFontWeight(values.fontWeight);
    setFontSize(values.fontSize);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground rounded-full"
        >
          <FaCog className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        {/* Settings Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-6"
          >
            <div className="w-full flex gap-2">
              {/* Words per minute - WPM */}
              <FormField
                control={form.control}
                name="wordsPerMinute"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Words per minute</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="sm:w-[180px]">
                          <SelectValue placeholder="300" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                        <SelectItem value="300">300</SelectItem>
                        <SelectItem value="400">400</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                        <SelectItem value="600">600</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* Words at a time */}
              <FormField
                control={form.control}
                name="wordsAtATime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Words at a time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="sm:w-[180px]">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex">
              {/* Font Family*/}
              <FormField
                control={form.control}
                name="fontFamily"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Font</FormLabel>
                    <Popover
                      modal={true}
                      open={openPopover}
                      onOpenChange={setOpenPopover}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn('sm:w-[180px] justify-between', !field.value && 'text-muted-foreground')}
                          >
                            <p className="truncate">
                              {field.value
                                ? fontFamilyList.find((font) => font.value === field.value)?.label
                                : 'Select font'}
                            </p>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="sm:w-[376px] p-0"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search fonts"
                            className="max-md:hidden"
                          />
                          <CommandEmpty>No font found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-40 sm:h-[250px]">
                              {fontFamilyList.map((font) => (
                                <CommandItem
                                  value={font.label}
                                  key={font.value}
                                  onSelect={() => {
                                    form.setValue('fontFamily', font.value);
                                    setOpenPopover(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      font.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                  <div className="w-full flex overflow-hidden items-center">
                                    <p className="flex-1 max-sm:pr-2">{font.label}</p>
                                    <span className={`flex-1 text-start text-xl truncate ${font.value}`}>
                                      {font.label}
                                    </span>
                                  </div>
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex gap-2">
              {/* Font weight */}
              <FormField
                control={form.control}
                name="fontWeight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Font Weight</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="sm:w-[180px]">
                          <SelectValue placeholder="Regular" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="font-normal">Regular</SelectItem>
                        <SelectItem value="font-medium">Medium</SelectItem>
                        <SelectItem value="font-semibold">Semibold</SelectItem>
                        <SelectItem value="font-bold">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* Font size */}
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Font Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="sm:w-[180px]">
                          <SelectValue placeholder="300" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="text-2xl">24</SelectItem>
                        <SelectItem value="text-3xl">30</SelectItem>
                        <SelectItem value="text-4xl">36</SelectItem>
                        <SelectItem value="text-5xl">48</SelectItem>
                        <SelectItem value="text-6xl">60</SelectItem>
                        <SelectItem value="text-7xl">72</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex flex-row sm:justify-end items-center gap-4 sm:gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="max-sm:w-full"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="max-sm:w-full"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
