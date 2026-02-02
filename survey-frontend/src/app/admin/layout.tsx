import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { PAGE_ROUTES } from "@/lib/constants/routes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/40">
        <div className="container mx-auto flex h-12 items-center gap-6 px-4 max-w-7xl">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-medium text-sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Admin</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="text-sm hover:text-primary">
              Dashboard
            </Link>
            <Link
              href={PAGE_ROUTES.ADMIN.SURVEYS.LIST}
              className="text-sm hover:text-primary"
            >
              Surveys
            </Link>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">{children}</main>
    </div>
  );
}
