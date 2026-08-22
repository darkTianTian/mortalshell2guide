"use client";

import { useEffect, useRef } from "react";

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/guides", label: "All Guides" },
  { href: "/map", label: "Interactive Map" },
  { href: "/guides/shell-locations", label: "Shells" },
  { href: "/guides/weapon-tier-list", label: "Weapons" },
  { href: "/guides/bosses", label: "Bosses" },
];

export default function MobileNav() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      const menu = menuRef.current;
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details className="mobile-nav" ref={menuRef}>
      <summary aria-label="Open site navigation">
        <span aria-hidden="true"><i /><i /><i /></span>
        <b>Menu</b>
      </summary>
      <nav aria-label="Mobile navigation">
        {mobileLinks.map((link, index) => (
          <a href={link.href} key={link.href} onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
