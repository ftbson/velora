"use client";

import React from "react";

export default function CookieSettingsButton({
  className = "velora-cookie-settings-btn",
  children = "Cookie-Einstellungen öffnen",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("velora:open-cookie-banner"));
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <i className="fa-solid fa-gear" style={{ marginRight: "8px" }}></i>
      {children}
    </button>
  );
}
