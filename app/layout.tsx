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

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smartcam",
  description:
    "Smartcam  is the leading company focus on electronics ( computer , Printer ( EPSON, HP, CANON) and parts). we will our best to offer best services and products.",

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
      default: "Smartcam",
      template: `%s - Smartcam`,
    },
    description:
      "Smartcam  is the leading company focus on electronics ( computer , Printer ( EPSON, HP, CANON) and parts). we will our best to offer best services and products.",
    url: "https://riverbase.org",
    siteName: "Riverbase",
    images: [
      {
        url: "http://localhost:3000/images/smartcam-logo.png",
        width: 800,
        height: 600,
      },
      {
        url: "http://localhost:3000/images/smartcam-logo.png",
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
        <ApolloWrapper>
          <AppProvider>
            <BarayProvider apiKey={process.env.NEXT_PUBLIC_BARAY_KEY!}>
              <CartProvider>
                <ThemeProvider>
                  <MainNavbar />
                  {children}
                  <BackToTop />
                  <MainFooter />
                  <MobileNavigator />
                </ThemeProvider>
              </CartProvider>
            </BarayProvider>
          </AppProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
