"use client";

import { useEffect, useRef } from "react";

export type SiteNavKey = "home" | "guides" | "map" | "shells" | "weapons" | "bosses";

const mobileLinks: Array<{ href: string; key: SiteNavKey; label: string }> = [
  { href: "/", key: "home", label: "Home" },
  { href: "/guides", key: "guides", label: "All Guides" },
  { href: "/map", key: "map", label: "Interactive Map" },
  { href: "/guides/shell-locations", key: "shells", label: "Shells" },
  { href: "/guides/weapon-tier-list", key: "weapons", label: "Weapons" },
  { href: "/guides/bosses", key: "bosses", label: "Bosses" },
];

export default function MobileNav({ active }: { active?: SiteNavKey }) {
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
          <a
            aria-current={active === link.key ? "page" : undefined}
            href={link.href}
            key={link.href}
            onClick={() => { if (menuRef.current) menuRef.current.open = false; }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
