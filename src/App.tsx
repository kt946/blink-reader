import { ThemeProvider } from '@/components/theme-provider';
import { SettingsProvider } from '@/components/settings-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import TextPlayer from '@/components/text-player';

import Hero from '@/components/hero';

function App() {
  return (
    <>
      <SettingsProvider>
        <ThemeProvider
          defaultTheme="system"
          storageKey="vite-ui-theme"
        >
          {/* Navbar */}
          <Navbar />

          <main className="h-full sm:py-6 flex-1 border-b bg-slate-100 dark:bg-background">
            <div className="sm:container flex flex-col">
              {/* Hero and TextPlayer are rendered based on state from SettingsProvider */}
              <Hero />
              <TextPlayer />
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </SettingsProvider>
    </>
  );
}

export default App;
