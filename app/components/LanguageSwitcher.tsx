"use client";

import { usePathname } from "next/navigation";

const languages = [
  { label: "EN", path: "", lang: "en" },
  { label: "简中", path: "/zh-cn", lang: "zh-CN" },
  { label: "繁中", path: "/zh-hant", lang: "zh-Hant" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const basePath = pathname.replace(/^\/(?:zh-cn|zh-hant)(?=\/|$)/, "") || "/";
  const current = pathname.startsWith("/zh-cn") ? "zh-CN" : pathname.startsWith("/zh-hant") ? "zh-Hant" : "en";

  return (
    <nav className="language-switcher" aria-label="Language selector">
      {languages.map((language) => (
        <a
          href={`${language.path}${basePath === "/" ? "" : basePath}` || "/"}
          hrefLang={language.lang}
          lang={language.lang}
          aria-current={current === language.lang ? "page" : undefined}
          key={language.lang}
        >
          {language.label}
        </a>
      ))}
    </nav>
  );
}
