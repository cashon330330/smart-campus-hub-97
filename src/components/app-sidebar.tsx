import { Link, useRouterState } from "@tanstack/react-router";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  Award,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  UserCog,
  School,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const groups = [
  {
    label: "Dashboards",
    items: [
      { to: "/dashboard/student", label: "Student", icon: GraduationCap },
      { to: "/dashboard/teacher", label: "Teacher", icon: School },
      { to: "/dashboard/admin", label: "Admin", icon: UserCog },
    ],
  },
  {
    label: "Modules",
    items: [
      { to: "/dashboard/attendance", label: "Attendance", icon: ClipboardCheck },
      { to: "/dashboard/results", label: "Results", icon: Award },
      { to: "/dashboard/fees", label: "Fees", icon: CreditCard },
    ],
  },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero shadow-glow">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold">SMS</p>
          <p className="truncate text-[11px] text-muted-foreground">University Edition</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((g) => (
          <div key={g.label} className="mb-5">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.label}
            </p>
            <ul className="space-y-1">
              {g.items.map((item) => {
                const active = pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", active && "text-sidebar-primary-foreground")} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-accent font-semibold text-accent-foreground">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Aarav Sharma</p>
            <p className="truncate text-xs text-muted-foreground">aarav@uni.edu</p>
          </div>
          <Link to="/login">
            <Button variant="ghost" size="icon" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
