import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, Moon, Sun } from "lucide-react";
// === YAHAN EDIT KIYA HAI: useState ke saath ContactModal ko jod diya ===
import { useState } from "react";
import ContactModal from "./ContactModal";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/blog/what-is-sis", label: "Guide" },
];

export function MarketingNav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  // === YAHAN EDIT KIYA HAI: Modal ko kholne/band karne ka switch (State) banaya ===
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero shadow-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">SMS</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-foreground bg-accent" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
          {/* === YAHAN EDIT KIYA HAI: Normal Desktop screen ke liye Contact Link/Button === */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/dashboard/admin" className="hidden sm:inline-flex">
            <Button size="sm" className="shadow-soft">Open dashboard</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Responsive Menu */}
      <div className={cn("md:hidden border-t border-border/60 bg-background", open ? "block" : "hidden")}>
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          {/* === YAHAN EDIT KIYA HAI: Mobile screen vale menu ke andar Contact option joda === */}
          <button
            onClick={() => {
              setOpen(false);
              setIsContactOpen(true);
            }}
            className="text-left rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            Contact
          </button>
          <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium">
            Sign in
          </Link>
          <Link to="/dashboard/admin" onClick={() => setOpen(false)}>
            <Button size="sm" className="w-full">Open dashboard</Button>
          </Link>
        </div>
      </div>

      {/* === YAHAN EDIT KIYA HAI: Contact Modal Popup Component rendering === */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </header>
  );
}
