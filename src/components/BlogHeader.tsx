import { useEffect, useState } from "react";
import { Shield, Github, Sun, Moon, Linkedin, Facebook, Twitter, Mail, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/what-im-doing", label: "What I'm doing" },
  { to: "/in-plain-words", label: "In plain words" },
  { to: "/workstation", label: "Workstation" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/juri-buora/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.facebook.com/Juri.Buora", icon: Facebook, label: "Facebook" },
  { href: "https://x.com/JBuora", icon: Twitter, label: "Twitter/X" },
  { href: "https://github.com/JuriBuora", icon: Github, label: "GitHub" },
  { href: "mailto:juribuora@gmail.com", icon: Mail, label: "Email" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  "px-2 py-1 rounded-md text-xs font-mono transition-colors hover:text-primary hover:bg-secondary " +
  (isActive ? "text-primary" : "text-muted-foreground");

const BlogHeader = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="juri@security home">
          <Shield className="w-5 h-5 text-primary" />
          <span className="hidden min-[400px]:inline font-mono text-sm font-semibold text-foreground">
            juri<span className="text-primary">@</span>security
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={toggle}
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="md:hidden border-t border-border bg-background">
          <ul className="container mx-auto px-4 py-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    "block py-3 font-mono text-sm border-b border-border/60 " +
                    (isActive ? "text-primary" : "text-foreground")
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="flex items-center gap-1 py-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="p-2 rounded-md text-muted-foreground hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default BlogHeader;
