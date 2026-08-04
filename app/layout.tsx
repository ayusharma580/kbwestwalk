import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KB West Walk | Premium Commercial Destination",
  description:
    "KB West Walk is a premium commercial development offering luxury retail spaces, modern office spaces, fine dining, entertainment, and investment opportunities in a prime location.",
  keywords: [
    "KB West Walk",
    "Commercial Property",
    "Retail Shops",
    "Office Spaces",
    "Luxury Commercial",
    "Real Estate",
    "Investment",
    "Premium Commercial Project",
  ],
  authors: [
    {
      name: "KB West Walk",
    },
  ],
  creator: "KB West Walk",
  publisher: "KB West Walk",

  openGraph: {
    title: "KB West Walk",
    description:
      "Experience a premium commercial destination designed for business, retail, lifestyle, and investment.",
    url: "/",
    siteName: "KB West Walk",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}