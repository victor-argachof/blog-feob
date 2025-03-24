import { siteConfig } from "@/app/siteConfig";
import AdminFooter from "@/components/admin/AdminFooter";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Clinario | Admin",
  robots: {
    index: siteConfig.robots.index,
    follow: siteConfig.robots.follow,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="bg-white dark:bg-gray-950 flex-1 p-8 mb-12">
        <div className="mx-auto mt-28 w-full max-w-6xl px-4">{children}</div>
      </main>
      <AdminFooter />
    </div>
  );
}
