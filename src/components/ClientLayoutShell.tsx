"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Detect whether current page is in admin section
    const currentIsAdmin =
      typeof window !== "undefined" &&
      (window.location.pathname.startsWith("/admin") ||
        pathname?.startsWith("/admin") ||
        document.body.classList.contains("is-admin-route"));

    setIsAdmin(!!currentIsAdmin);

    if (currentIsAdmin) {
      document.body.classList.add("is-admin-route");
    } else {
      document.body.classList.remove("is-admin-route");
    }
  }, [pathname]);

  const shouldHideNavAndFooter = isAdmin || pathname?.startsWith("/admin");

  return (
    <div
      className={`app-container ${shouldHideNavAndFooter ? "is-admin-route" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!shouldHideNavAndFooter && <Navbar />}

      <main className="main-content" style={{ flex: 1 }}>
        {children}
      </main>

      {!shouldHideNavAndFooter && <Footer />}
      {!shouldHideNavAndFooter && <CookieBanner />}
    </div>
  );
}
