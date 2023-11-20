import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
// import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface SettingsDialogProps {
  setWordsAtATime: (wordsAtATime: number) => void;
  setWordsPerMinute: (wordsPerMinute: number) => void;
}

const SettingsDialog = ({ setWordsAtATime, setWordsPerMinute }: SettingsDialogProps) => {
  const [open, setOpen] = useState(false);

  const FormSchema = z.object({
    wordsAtATime: z.string({ required_error: 'Words at a time is required' }).trim(),
    wordsPerMinute: z.string({ required_error: 'Words per minute is required' }).trim(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wordsAtATime: '1',
      wordsPerMinute: '300',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // Test values
    console.log(values);

    setWordsAtATime(parseInt(values.wordsAtATime));
    setWordsPerMinute(parseInt(values.wordsPerMinute));
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
          className="text-zinc-600 dark:text-primary"
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
              {/* Words per minute - WPM*/}
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
            <DialogFooter className="flex flex-row sm:justify-end items-center max-sm:gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className='max-sm:w-full'
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className='max-sm:w-full'>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
