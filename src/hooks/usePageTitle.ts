import { useEffect } from "react";

const SITE_TITLE = "From Zero to Cybersecurity — Juri Buora";

/** Client-side navigation does not reload the HTML shell, so set the tab title here. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Juri Buora`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [title]);
}
