import type { Metadata } from "next";
import { Geist, Instrument_Serif, Meow_Script } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-meow-script",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Madlen und Dominik Hochzeit",
  description: "Save the date: 14 | 05 | 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${meowScript.variable} ${geist.variable} h-full scroll-smooth bg-background antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-background">
        <main className="space-y-4 sm:space-y-24">{children}</main>
      </body>
    </html>
  );
}
