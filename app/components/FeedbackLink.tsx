"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

const FEEDBACK_EMAIL = "feedback@mortalshell2guide.org";

type FeedbackLinkProps = {
  children?: ReactNode;
  className?: string;
  context?: string;
};

type PageContext = {
  title: string;
  url: string;
};

function createMailto(page: PageContext, context?: string) {
  const subject = `[Shellbound correction] ${context || page.title || "Site feedback"}`;
  const body = [
    "Thanks for helping us keep Shellbound accurate.",
    "",
    `Page: ${page.url || "[paste the page URL]"}`,
    `Page title: ${page.title || "[page title]"}`,
    `Data / section: ${context || "[item, marker, heading, table row, or value]"}`,
    "Current content: [what the page says now]",
    "Suggested correction: [what it should say]",
    "Source / evidence: [link, screenshot, or in-game steps]",
    "Additional notes: [optional]",
  ].join("\n");

  return `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function FeedbackLink({
  children = "Report inaccurate data ↗",
  className,
  context,
}: FeedbackLinkProps) {
  const [page, setPage] = useState<PageContext>({ title: "", url: "" });

  useEffect(() => {
    const syncPage = () => {
      setPage({ title: document.title, url: window.location.href });
    };

    syncPage();
    window.addEventListener("hashchange", syncPage);
    window.addEventListener("popstate", syncPage);
    return () => {
      window.removeEventListener("hashchange", syncPage);
      window.removeEventListener("popstate", syncPage);
    };
  }, []);

  const href = useMemo(() => createMailto(page, context), [context, page]);

  return (
    <a className={className} href={href} data-feedback-context={context || "page"}>
      {children}
    </a>
  );
}
