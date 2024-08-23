import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { MainNavbar } from "@/components/layouts/Main-Navbar";
import MainFooter from "@/components/layouts/MainFooter";
import { BackToTop } from "@/components/globals/BackTop";
import { ApolloWrapper } from "@/libs/apollo-wrapper";
import MobileNavigator from "@/components/layouts/MobileNavigator";
import { AppProvider } from "@/context/useAuth";
import { CartProvider } from "@/context/useCart";
import ThemeProvider from "@/context/useTheme";
import { BarayProvider } from "@/context/baray";
import ChatToCustomer from "@/components/globals/ChatToCustomer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smartcam",
  description:
    "Smartcam  is the leading company focus on electronics ( computer , Printer ( EPSON, HP, CANON) and parts). we will our best to offer best services and products.",

  metadataBase: new URL("https://smartcam.riverbase.org"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "km-KH": "/km-KH",
    },
  },
  openGraph: {
    title: {
      default: "Smartcam",
      template: `%s - Smartcam`,
    },
    description:
      "Smartcam  is the leading company focus on electronics ( computer , Printer ( EPSON, HP, CANON) and parts). we will our best to offer best services and products.",
    url: "https://smartcam.riverbase.org",
    siteName: "Smartcam",
    images: [
      {
        url: "/images/smartcam-logo.png",
        width: 1200,
        height: 630,
      },
      {
        url: "/images/smartcam-logo.png",
        width: 1200,
        height: 630,
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
        <ApolloWrapper>
          <AppProvider>
            <Providers>
              <BarayProvider apiKey={process.env.NEXT_PUBLIC_BARAY_KEY!}>
                <CartProvider>
                  <ThemeProvider>
                    <MainNavbar />
                    {children}
                    <ChatToCustomer />
                    <BackToTop />
                    <MainFooter />
                    <MobileNavigator />
                  </ThemeProvider>
                </CartProvider>
              </BarayProvider>
            </Providers>
          </AppProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
