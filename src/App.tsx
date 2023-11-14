import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

import Navbar from '@/components/navbar';

function App() {
  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        <Navbar />

        {/* set height to screen height - 57px */}
        <main className="h-full py-6">
          <div className="container flex justify-center">
            <Button>Click me</Button>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
