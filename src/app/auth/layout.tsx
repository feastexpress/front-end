import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Element from '.././assets/global/element.png';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <div className="w-7/10 relative">
          <Image
            src={Element}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="w-3/10">
          {children}
        </div>
      </body>
    </html>
  );
}