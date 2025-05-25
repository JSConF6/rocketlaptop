'use client';

import type React from 'react';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SellerSideBar from '@/components/seller-sidebar';

interface SellerLayoutProps {
  children: React.ReactNode;
}

const SellerLayout = ({ children }: SellerLayoutProps): React.JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <SellerSideBar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6">
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
