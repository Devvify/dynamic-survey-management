import "./globals.css";
import type { ReactNode } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import { QueryProvider } from "@/lib/providers/QueryProvider";

export const metadata = {
  title: "Survey Frontend",
  description: "Dynamic Survey Management",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        <QueryProvider>
          <GlobalHeader />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
