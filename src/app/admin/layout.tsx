import NavbarAdmin from "@/components/NavbarAdmin";
import NavbarUser from "@/components/NavbarUser";
import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";

export default function HomeLayoutAdmin({
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
      <NavbarAdmin />
      <div className="min-h-[90vh] mt-[10vh]">{children}</div>
    </ThemeProvider>
  );
}