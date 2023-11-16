import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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

        <main className="h-full py-6 flex-1 border-b bg-slate-100 dark:bg-black">
          <div className="container">
            <Card className="dark:bg-zinc-900">
              <CardHeader>
                <CardTitle>Welcome to BlinkReader</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-4'>
                <p>Card Footer</p>

                <div className='ml-auto flex gap-4'>
                  <Button variant='outline'>Click me</Button>
                  <Button variant='default'>Click me</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>

        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
