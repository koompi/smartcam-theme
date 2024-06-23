import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import { MainNavbar } from "@/components/layouts/Main-Navbar";
import { Menubar } from "@/components/layouts/Menubar";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smartcam Group",
  description:
    "SMARTCAM  is the leading company focus on electronics ( computer , Printer ( EPSON, HP, CANON) and parts). we will our best to offer best services and products.",

  metadataBase: new URL("https://riverbase.org"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "km-KH": "/km-KH",
    },
  },
  openGraph: {
    title: {
      default: "Smartcam Group",
      template: `%s - Smartcam Group`,
    },
    description:
      "SMARTCAM  is the leading company focus on electronics ( computer , Printer ( EPSON, HP, CANON) and parts). we will our best to offer best services and products.",
    url: "https://riverbase.org",
    siteName: "Riverbase",
    images: [
      {
        url: "http://localhost:3000/images/seo-thumbnail.png",
        width: 800,
        height: 600,
      },
      {
        url: "http://localhost:3000/images/seo-thumbnail.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning>
        <Header />
        <MainNavbar />
        <Menubar />
        {children}
      </body>
    </html>
  );
}
