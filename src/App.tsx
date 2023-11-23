import { useState } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import TextPlayer from '@/components/text-player';

import Hero from '@/components/hero';

function App() {
  const [readingInterface, setReadingInterface] = useState(false);
  const [textInput, setTextInput] = useState('');

  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        {/* Navbar */}
        <Navbar />

        <main className="h-full sm:py-6 flex-1 border-b bg-slate-100 dark:bg-black">
          <div className="sm:container flex flex-col">
            {!readingInterface ? (
              // Hero
              <Hero
                setReadingInterface={setReadingInterface}
                setTextInput={setTextInput}
              />
            ) : (
              // Text Player
              <TextPlayer
                textInput={textInput}
                setTextInput={setTextInput}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
