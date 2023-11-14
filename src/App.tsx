import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

function App() {
  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        <Navbar />

        <main className="h-full py-6 flex-1 border-b">
          <div className="container flex justify-center">
            <Button>Click me</Button>
          </div>
        </main>

        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
