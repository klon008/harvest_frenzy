import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import YandexMetrika from "@/components/YandexMetrika"
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'Harvest Frenzy - Learn Harvest Mechanics',
  description: 'A mini game designed to help you understand the mechanics of Harvest/Crop rotation in Path of Exile. Improve your skills and strategies in a fun and engaging way.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <YandexMetrika />
        <LanguageProvider>
        {children}
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
