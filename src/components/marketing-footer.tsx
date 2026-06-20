import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 bg-gradient-subtle">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">SMS</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The modern student management platform built for colleges that care about clarity.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Platform</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard/student" className="hover:text-foreground">Student portal</Link></li>
            <li><Link to="/dashboard/teacher" className="hover:text-foreground">Teacher tools</Link></li>
            <li><Link to="/dashboard/admin" className="hover:text-foreground">Admin console</Link></li>
            <li><Link to="/dashboard/attendance" className="hover:text-foreground">Attendance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/blog/what-is-sis" className="hover:text-foreground">What is a SIS?</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/login" className="hover:text-foreground">Sign in</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" /> hello@sms.edu</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" /> +1 (415) 555-0142</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" /> 220 Bryant St, San Francisco</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Student Management System. All rights reserved.</p>
          <p>Built with care for educators.</p>
        </div>
      </div>
    </footer>
  );
}
