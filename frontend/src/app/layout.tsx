import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ShopProvider } from "../context/ShopContext";
import { AuthProvider } from "../context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const givonic = localFont({
  src: "../../public/fonts/Givonic.otf",
  variable: "--font-givonic",
  display: "swap",
});

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export const metadata: Metadata = {
  title: "Birla Nuts | India's Fastest Growing Premium Dry Fruits Brand",
  description: "Buy premium dry fruits and nuts online in India from Birla Nuts. Explore whole almonds, jumbo cashews, Chilean walnuts, seedless raisins, organic pitted prunes, makhana, and crazy bites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={`${givonic.variable} ${givonic.className}`} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <ShopProvider>
              <Header />
              <div style={{ flex: 1, paddingTop: "0px" }}>
                {children}
              </div>
              <Footer />
            </ShopProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

