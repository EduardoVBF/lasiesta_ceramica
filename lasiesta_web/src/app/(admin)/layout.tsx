"use client";
import AdminSidebar from "@/components/admin/sidebar";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && pathname.startsWith("/admin")) {
      router.replace("/login");
    }
  }, [status, router, pathname]);

  // Enquanto carrega ou redireciona
  if (status !== "authenticated") return null;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTEÚDO */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
