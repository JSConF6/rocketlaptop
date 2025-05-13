import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RocketLaptop',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
