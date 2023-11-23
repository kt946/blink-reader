import { useTheme } from '@/components/theme-provider';
import TextareaFormDialog from '@/components/text-form-dialog';

import logoDark from '@/assets/blinkreader_logo_black.svg';
import logoLight from '@/assets/blinkreader_logo_white.svg';

type HeroProps = {
  setReadingInterface: (value: boolean) => void;
  setTextInput: (value: string) => void;
};

const Hero = ({ setReadingInterface, setTextInput }: HeroProps) => {
  const { theme } = useTheme(); // Access the current theme from the context
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <section className="p-6 flex flex-col justify-center items-center space-y-6 md:space-y-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold flex flex-col text-center">
        Welcome to
        <span className="mt-2 sm:mt-6 w-60 sm:w-96">
          {(theme === 'system' && prefersDarkMode) || theme === 'dark' ? (
            <img
              src={logoLight}
              alt="BlinkReader logo"
            />
          ) : (
            <img
              src={logoDark}
              alt="BlinkReader logo"
            />
          )}
        </span>
      </h1>
      <p className="max-w-4xl md:text-lg text-center text-muted-foreground">
        Meet BlinkReader, your literary superhero! With lightning-fast speed and unmatched focus, BlinkReader empowers
        users to conquer mountains of text in the blink of an eye. Say farewell to sluggish reading—embrace the swift
        journey through words with your trusty efficiency sidekick!
      </p>

      {/* Add Text Form */}
      <TextareaFormDialog
        setReadingInterface={setReadingInterface}
        setTextInput={setTextInput}
        btnLabel="Get Started"
        btnSize="lg"
        formTitle="Add Text"
      />
    </section>
  );
};

export default Hero;
