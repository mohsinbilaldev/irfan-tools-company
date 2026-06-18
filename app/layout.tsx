import type {Metadata} from 'next';
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'ITC | Irfan Tools Company - Swat Mingora',
  description: "Swat's premier commercial hardware store since 1998, providing precision industrial tools, power tools, safety gear, and architectural hardware.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
