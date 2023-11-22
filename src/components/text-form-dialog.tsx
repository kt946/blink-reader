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
  setReadingInterface?: (value: boolean) => void;
  setTextInput: (value: string) => void;
  btnLabel: string;
  btnSize?: 'sm' | 'default' | 'lg' | 'icon' | null | undefined;
  btnVariant?: 'default' | 'secondary' | 'link' | 'destructive' | 'outline' | 'ghost' | null | undefined;
  formTitle: string;
  textInput?: string;
  index?: number;
  back?: () => void;
};

const FormSchema = z.object({
  text: z.string({ required_error: 'Text is required' }).trim(),
});

const TextareaFormDialog = ({
  setReadingInterface,
  setTextInput,
  btnLabel,
  btnSize,
  btnVariant,
  formTitle,
  textInput,
  index,
  back,
}: TextareaFormDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: textInput,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.text) {
      // Set text input to data from form
      setTextInput(data.text);

      // Reset index to 0 if index is not 0 and both index and back() are passed as props
      // This is used to reset the text player to the beginning when a new text is submitted
      // If the length of new text is shorter than the length of the previous text, this will prevent the text player from breaking
      if (index && back && index !== 0) {
        back();
      }

      // Close dialog
      setOpen(false);

      // Set reading interface to true if setReadingInterface is passed as a prop
      // This is used to toggle between the hero and the text player on the home page
      // If user is already on the text player, this will not do anything
      if (setReadingInterface) {
        setReadingInterface(true);
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant={btnVariant}
          size={btnSize}
          className="w-full sm:w-fit"
        >
          {btnLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-zinc-900 max-w-6xl">
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
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
                      className="sm:h-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row gap-1">
              <DialogClose
                asChild
                className="max-sm:w-full"
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
                className="max-sm:w-full"
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
