import "./globals.css";

import { AuthProvider } from "./context/Authcontext";
import { CartProvider } from "./context/Cartcontext";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Simple Store",
  description: "My E-commerce Store"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="main-container">
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}