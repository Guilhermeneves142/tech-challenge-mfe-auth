import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceApp — Auth",
  description: "Autenticação do FinanceApp",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <AuthLayout>{children}</AuthLayout>
        </Providers>
      </body>
    </html>
  );
}
