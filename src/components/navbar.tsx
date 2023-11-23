import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';

import logoDark from '@/assets/blinkreader_logo_black.svg';
import logoLight from '@/assets/blinkreader_logo_white.svg';

const Navbar = () => {
  const { theme } = useTheme(); // Access the current theme from the context
  // Check if the user's system is set to dark mode, and if so, return true
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-sm:px-6 flex justify-between h-14 items-center">
        <a
          href="/"
          className="w-24 hover:opacity-70 transition-opacity"
        >
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
        </a>

        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
