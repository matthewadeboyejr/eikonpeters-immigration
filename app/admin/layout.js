"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthPage = useMemo(() => {
    return pathname?.includes("/admin/login") || pathname?.includes("/admin/forgot-password");
  }, [pathname]);

  useEffect(() => {
    // If we're on the login or forgot-password page, we're always "authorized" to see it
    if (isAuthPage) {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    // Check mock session
    const checkAuth = () => {
      try {
        const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
        if (isLoggedIn) {
          setIsAuthorized(true);
          setIsLoading(false);
        } else {
          setIsAuthorized(false);
          setIsLoading(false);
          router.push("/admin/login");
        }
      } catch (e) {
        setIsAuthorized(false);
        setIsLoading(false);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [pathname, isAuthPage, router]);

  // If we're on the login page, just show it immediately
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Securing Session...</p>
        <Link href="/admin/login" className="text-[10px] text-gray-300 hover:text-yellow-600 transition-colors underline">
          Take me to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-grow ml-64 min-h-screen">
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 flex items-center justify-between px-8">
          <h2 className="text-sm font-medium text-gray-500">Welcome back, Admin</h2>
          <Link href="/admin/profile" className="flex items-center gap-4 group">
            <span className="text-xs font-bold text-gray-400 group-hover:text-yellow-600 transition-colors">Admin Profile</span>
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs group-hover:bg-yellow-500 group-hover:text-white transition-all">
              AD
            </div>
          </Link>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
