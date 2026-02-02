"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authApi } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function GlobalHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  const hideHeaderPaths = ["/login", "/"];

  useEffect(() => {
    const currentUser = authApi.getUser();
    setUser(currentUser);
  }, [pathname]);

  const handleLogout = async () => {
    await authApi.logout();
    router.push("/login");
  };

  if (hideHeaderPaths.includes(pathname) || !user) {
    return null;
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Survey Management</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-muted-foreground">{user.name}</span>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
