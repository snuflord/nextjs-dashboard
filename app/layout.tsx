import '@/app/ui/global.css';
import { inter } from './ui/fonts';

// this is the global route layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
