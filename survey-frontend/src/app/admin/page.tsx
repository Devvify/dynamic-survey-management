"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authApi, User } from "@/lib/auth/auth";
import { Plus, FileText } from "lucide-react";
import { PAGE_ROUTES } from "@/lib/constants/routes";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authApi.getUser();
    if (!currentUser || !currentUser.roles.includes("admin")) {
      router.replace("/login");
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Button
          size="lg"
          className="h-32 flex flex-col items-center justify-center gap-3"
          onClick={() => router.push(PAGE_ROUTES.ADMIN.SURVEYS.CREATE)}
        >
          <Plus size={32} />
          <span className="text-lg font-medium">Create Survey</span>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="h-32 flex flex-col items-center justify-center gap-3"
          onClick={() => router.push(PAGE_ROUTES.ADMIN.SURVEYS.LIST)}
        >
          <FileText size={32} />
          <span className="text-lg font-medium">View Surveys</span>
        </Button>
      </div>
    </div>
  );
}
