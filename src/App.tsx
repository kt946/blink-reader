import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import TextForm from '@/components/text-form';

function App() {
  return (
    <>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        {/* Navbar */}
        <Navbar />

        <main className="h-full py-6 flex-1 border-b bg-slate-100 dark:bg-black">
          <div className="container flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <TextForm />

            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
