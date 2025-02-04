import NavbarUser from "@/components/NavbarUser";
import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <NavbarUser />
      <div className="min-h-[89vh] mt-[11vh] ml-60">{children}</div>
    </ThemeProvider>
  );
}
