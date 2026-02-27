import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (hash: string) => {
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
      return;
    }
    navigate(href);
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.history.replaceState(null, "", "#");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-24 py-6 flex items-center justify-between mix-blend-difference">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleHomeClick();
          }}
          className="font-display font-bold text-lg text-foreground"
        >
          AA<span className="text-primary">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-body text-sm text-foreground/70 hover:text-foreground transition-colors tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <MagneticButton
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            className="w-6 h-px bg-foreground block"
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3.5 : 0 }}
          />
          <motion.span
            className="w-6 h-px bg-foreground block"
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3.5 : 0 }}
          />
        </MagneticButton>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-background flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  handleNavClick(link.href);
                }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="font-display font-bold text-4xl text-foreground"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
