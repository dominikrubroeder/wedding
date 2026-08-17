import type { Metadata } from "next";
import { Geist, Instrument_Serif, Meow_Script } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Countdown } from "@/components/ui/countdown";
import { Animate } from "@/components/ui/animate";

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
  title: "Madlen & Dominik Hochzeit",
  description: "Save the Date, 14 | 05 | 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${meowScript.variable} ${geist.variable} h-full overflow-x-hidden scroll-smooth antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden">
        <Image
          src="/eucalyptus-top-right-cropped.png"
          width={500}
          height={500}
          alt="Eucalyptus"
          className="absolute -top-36 -right-44 h-auto w-[20rem] shrink-0 xs:-top-32 md:w-[24rem] lg:-top-44 lg:-right-24 lg:w-120"
          loading="eager"
          draggable={false}
        />

        <main className="space-y-16 sm:space-y-24">{children}</main>

        <footer className="relative space-y-8 overflow-hidden pt-16 pb-6 text-center">
          <Animate delay={0.16}>
            <Countdown
              target="2027-05-14"
              completedContent={
                <p className="text-lg font-medium text-foreground">
                  Let&#39;s get married.
                </p>
              }
              className="mx-auto justify-center"
            />
          </Animate>

          <div>
            <p>Wir freuen uns auf euch</p>
            <p>Madlen & Dominik</p>
          </div>

          <Image
            src="/eucalyptus-bottom-left-cropped.png"
            width={500}
            height={500}
            alt="Eucalyptus"
            className="absolute -bottom-24 -left-48 w-[20rem] xxs:-left-44 md:w-[24rem] lg:-bottom-32 lg:w-120"
            draggable={false}
          />
        </footer>
      </body>
    </html>
  );
}
