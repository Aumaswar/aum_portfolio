const Footer = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-body text-sm text-muted-foreground">
          © 2025 Alex Rivera. Crafted with obsession.
        </span>
        <span className="font-body text-xs text-muted-foreground/50">
          Built with React, Framer Motion & too much coffee ☕
        </span>
      </div>
    </footer>
  );
};

export default Footer;
