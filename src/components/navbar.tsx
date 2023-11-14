import { ModeToggle } from '@/components/mode-toggle';
import GithubButton from '@/components/github-button';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-14 items-center">
        <a href="/">
          <h1 className="text-3xl text-blue-700 font-bold">QuantumQuill</h1>
        </a>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <GithubButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
