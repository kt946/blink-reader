import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-14 items-center">
        <h1 className="text-3xl text-blue-700 font-bold">QuantumQuill</h1>

        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
