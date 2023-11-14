import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

function App() {
  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        <h1 className="text-4xl text-blue-700 font-bold underline">Hello world!</h1>
        <div>
          <Button>Click me</Button>
          <ModeToggle />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
