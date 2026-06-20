import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Bell,
  BookOpen,
  CalendarCheck,
  CreditCard,
  Download,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { attendanceTrend, courses, notifications, results } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/student")({
  head: () => ({ meta: [{ title: "Student dashboard — SMS" }] }),
  component: StudentDashboard,
});

function StatCard({ icon: Icon, label, value, sub, accent }: any) {
  return (
    <Card className="border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${accent}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </Card>
  );
}

function StudentDashboard() {
  return (
    <DashboardShell
      title="Welcome back, Aarav 👋"
      subtitle="Here's a snapshot of your academic life this semester."
      actions={
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Transcript
        </Button>
      }
    >
      {/* Profile */}
      <Card className="mb-6 grid gap-6 border-border/60 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-hero font-display text-2xl font-bold text-primary-foreground shadow-glow">
          AS
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold">Aarav Sharma</h2>
          <p className="text-sm text-muted-foreground">
            STU-1024 · B.Sc Computer Science · Year 2
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">Section A</Badge>
            <Badge className="bg-success text-success-foreground hover:bg-success">Active</Badge>
            <Badge variant="outline">5 courses</Badge>
          </div>
        </div>
        <div className="hidden sm:block">
          <Link to="/dashboard/results">
            <Button>View results</Button>
          </Link>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarCheck} label="Attendance" value="94%" sub="+2% vs last month" accent="bg-success/15 text-success" />
        <StatCard icon={Award} label="GPA" value="3.82" sub="Top 15% of class" accent="bg-primary/15 text-primary" />
        <StatCard icon={BookOpen} label="Courses" value="5" sub="18 credits" accent="bg-chart-2/15 text-chart-2" />
        <StatCard icon={CreditCard} label="Fees" value="Paid" sub="Next due Jan 20" accent="bg-warning/15 text-warning" />
      </div>

      {/* Charts + notifications */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Attendance trend</h3>
              <p className="text-xs text-muted-foreground">Monthly attendance rate</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-success" /> +6%
            </Badge>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="rate" stroke="var(--color-primary)" strokeWidth={2} fill="url(#att)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Notifications</h3>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
          <ul className="mt-4 space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start gap-3 rounded-lg border border-border/60 p-3 transition-colors hover:bg-accent/50">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.type === "warning" ? "bg-warning" : "bg-primary"}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Courses + recent results */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60 p-6">
          <h3 className="font-display text-lg font-semibold">Enrolled courses</h3>
          <ul className="mt-4 space-y-3">
            {courses.slice(0, 4).map((c) => (
              <li key={c.code} className="flex items-center justify-between gap-4 rounded-lg border border-border/60 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{c.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.code} · {c.teacher}</p>
                </div>
                <Badge variant="outline" className="shrink-0">{c.credits} cr</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-border/60 p-6">
          <h3 className="font-display text-lg font-semibold">Recent results</h3>
          <ul className="mt-4 space-y-4">
            {results.slice(0, 4).map((r) => (
              <li key={r.course}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium">{r.course}</p>
                  <Badge className="shrink-0 bg-primary text-primary-foreground hover:bg-primary">{r.grade}</Badge>
                </div>
                <Progress value={(r.marks / r.total) * 100} className="h-2" />
                <p className="mt-1 text-right text-xs text-muted-foreground">{r.marks}/{r.total}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardShell>
  );
}
