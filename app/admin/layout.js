"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardTour from "@/components/admin/DashboardTour";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { FaBars } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized]   = useState(false);
  const [isLoading, setIsLoading]         = useState(true);
  const [adminProfile, setAdminProfile]   = useState(null);
  const [sidebarOpen, setSidebarOpen]     = useState(false);

  const supabase = createClient();

  const isAuthPage = useMemo(() => {
    return (
      pathname?.includes("/admin/login") ||
      pathname?.includes("/admin/forgot-password") ||
      pathname?.includes("/admin/signup")
    );
  }, [pathname]);

  // Close sidebar whenever the route changes (mobile nav)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Adjust body styles for admin layout to remove main website padding-top & background
  useEffect(() => {
    document.body.classList.add("admin-body");
    return () => {
      document.body.classList.remove("admin-body");
    };
  }, []);

  useEffect(() => {
    if (isAuthPage) {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: admin } = await supabase
            .from("admins")
            .select("name, email, role")
            .eq("id", user.id)
            .maybeSingle();

          if (admin) {
            setAdminProfile(admin);
            setIsAuthorized(true);
          } else {
            await supabase.auth.signOut();
            setIsAuthorized(false);
            router.push("/admin/login");
          }
        } else {
          setIsAuthorized(false);
          router.push("/admin/login");
        }
      } catch (e) {
        setIsAuthorized(false);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, isAuthPage, router]);

  // Auth pages — render with no chrome
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Loading / not authorised
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Securing Session...</p>
        <Link href="/admin/login" className="text-[10px] text-gray-300 hover:text-yellow-600 transition-colors underline">
          Take me to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Mobile overlay — tapping closes sidebar ───────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Main content area ─────────────────────────────────────── */}
      <div className="flex-grow lg:ml-64 min-h-screen flex flex-col overflow-x-hidden">

        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-yellow-500 hover:text-white text-gray-600 transition-all"
              aria-label="Open sidebar"
            >
              <FaBars size={16} />
            </button>
            <h2 className="text-sm font-medium text-gray-500 truncate">
              Welcome back, <span className="font-bold text-gray-700">{adminProfile?.name || "Admin"}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <DashboardTour />
            <Link id="header-profile" href="/admin/profile" className="flex items-center gap-2 sm:gap-4 group">
              <span className="hidden sm:block text-xs font-bold text-gray-400 group-hover:text-yellow-600 transition-colors">
                Admin Profile
              </span>
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs group-hover:bg-yellow-500 group-hover:text-white transition-all flex-shrink-0">
                {adminProfile?.name
                  ? adminProfile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                  : "AD"}
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
