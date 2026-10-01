import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * A single-page app keeps the scroll position when the route changes, so a
 * link clicked at the bottom of one page opened the next page at the bottom.
 * Start new pages at the top; leave Back/Forward to the browser, which
 * restores where the reader was.
 */
const RouteScrollReset = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, navigationType]);

  return null;
};

export default RouteScrollReset;
