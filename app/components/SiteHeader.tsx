import MobileNav, { type SiteNavKey } from "./MobileNav";

const primaryLinks: Array<{ href: string; key: Exclude<SiteNavKey, "home">; label: string }> = [
  { href: "/guides/shell-locations", key: "shells", label: "Shells" },
  { href: "/guides/weapon-tier-list", key: "weapons", label: "Weapons" },
  { href: "/guides/bosses", key: "bosses", label: "Bosses" },
  { href: "/map", key: "map", label: "Map" },
  { href: "/guides", key: "guides", label: "All Guides" },
];

type SiteHeaderProps = {
  active?: SiteNavKey;
  variant?: "overlay" | "solid";
  showLaunchStatus?: boolean;
};

export default function SiteHeader({
  active,
  variant = "overlay",
  showLaunchStatus = false,
}: SiteHeaderProps) {
  return (
    <header className={`site-header site-header--${variant}`}>
      <a className="wordmark" href="/" aria-label="Mortal Shell II guide home">
        <span className="sigil" aria-hidden="true">II</span>
        <span className="wordmark-copy">
          <strong>Mortal Shell II</strong>
          <small>Shellbound field guide</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryLinks.map((link) => (
          <a
            aria-current={active === link.key ? "page" : undefined}
            href={link.href}
            key={link.key}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <MobileNav active={active} />

      {showLaunchStatus ? (
        <a className="site-header-action" href="#intel">
          <span className="ember-dot" /> Launch build 1.0
        </a>
      ) : (
        <a className="site-header-action" href="/">Return home ↗</a>
      )}
    </header>
  );
}
