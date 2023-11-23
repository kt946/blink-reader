import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useSettings } from '@/components/settings-provider';
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
  btnLabel: string | JSX.Element;
  btnSize?: 'sm' | 'default' | 'lg' | 'icon' | null | undefined;
  btnVariant?: 'default' | 'secondary' | 'link' | 'destructive' | 'outline' | 'ghost' | null | undefined;
  btnClassName?: string;
  formTitle: string;
};

const FormSchema = z.object({
  text: z.string({ required_error: 'Text is required' }).trim(),
});

const TextareaFormDialog = ({ btnLabel, btnSize, btnVariant, btnClassName, formTitle }: TextareaFormDialogProps) => {
  // Access state from SettingsProvider
  const { textInput, setTextInput, setReadingInterface } = useSettings();
  // State for dialog
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

      // Close dialog
      setOpen(false);

      // This is used to toggle between the hero and the text player on the home page
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
          variant={btnVariant}
          size={btnSize}
          className={`${btnClassName}`}
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
            <DialogFooter className="flex flex-row gap-4 sm:gap-2">
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
