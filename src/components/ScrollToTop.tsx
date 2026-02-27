import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 96;

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Run after route content has painted.
    requestAnimationFrame(() => {
      if (location.hash) {
        scrollToHash(location.hash);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToTop;

