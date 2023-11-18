import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

type TextareaFormDialogProps = {
  setReadingInterface: (value: boolean) => void;
  setReadingText: (value: string) => void;
};

const FormSchema = z.object({
  text: z.string({ required_error: 'Text is required' }).trim(),
});

const TextareaFormDialog = ({ setReadingInterface, setReadingText }: TextareaFormDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.text) {
      // const text = JSON.stringify(data, null, 2);
      console.log(data);
      setOpen(false);
      setReadingText(data.text);
      setReadingInterface(true);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="w-full sm:w-fit"
        >
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-zinc-900 max-w-6xl">
        <DialogHeader>
          <DialogTitle>Add Text</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-6"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the text you'd like to speed read here"
                      rows={10}
                      {...field}
                      className="h-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row gap-6">
              <DialogClose
                asChild
                className="w-full"
              >
                <Button
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TextareaFormDialog;
