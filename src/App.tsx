import { useState } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import TextareaFormDialog from '@/components/text-form-dialog';
import TextPlayer from '@/components/text-player';

function App() {
  const [readingInterface, setReadingInterface] = useState(false);
  const [readingText, setReadingText] = useState('');

  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        {/* Navbar */}
        <Navbar />

        <main className="h-full py-6 flex-1 border-b bg-slate-100 dark:bg-black">
          <div className="container flex flex-col">
            {!readingInterface ? (
              // Hero
              <section className="flex flex-col justify-center items-center sm:mt-28 space-y-6 md:space-y-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex flex-col text-center">
                  Welcome to <span className="text-4xl sm:text-5xl lg:text-6xl lg:mt-2">BlinkReader!</span>
                </h2>
                <p className="max-w-4xl md:text-lg text-center text-muted-foreground">
                  Meet BlinkReader, your literary superhero! With lightning-fast speed and unmatched focus, BlinkReader
                  empowers users to conquer mountains of text in the blink of an eye. Say farewell to sluggish
                  reading—embrace the swift journey through words with your trusty efficiency sidekick!
                </p>
                <TextareaFormDialog
                  setReadingInterface={setReadingInterface}
                  setReadingText={setReadingText}
                />
              </section>
            ) : (
              // Text Player
              <TextPlayer readingText={readingText} />
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
