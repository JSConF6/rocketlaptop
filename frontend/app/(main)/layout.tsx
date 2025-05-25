import type React from 'react';
import 'styles/globals.css';
import Header from '@/components/header';
import { CartProvider } from '@/components/cart-provider';
import { Toaster } from '@/components/ui/toaster';
import ThemeProvider from '@/components/theme-provider';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-8">
            <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} RocketLaptop. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
        <Toaster />
      </CartProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
