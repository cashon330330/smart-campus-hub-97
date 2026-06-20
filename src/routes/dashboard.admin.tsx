import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CreditCard,
  Download,
  Edit,
  FileBarChart,
  GraduationCap,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { attendanceTrend, gradeDistribution, stats, students } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard — SMS" }] }),
  component: AdminDashboard,
});

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function AdminDashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = students.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase()) ||
      s.course.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || s.fees.toLowerCase() === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <DashboardShell
      title="Admin Console"
      subtitle="Manage students, teachers, courses, and institutional analytics."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => toast.success("Report exported as PDF")}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm" onClick={() => toast.success("New student form opened")}>
            <Plus className="mr-2 h-4 w-4" /> Add student
          </Button>
        </>
      }
    >
      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total students", value: stats.students.toLocaleString(), delta: "+8.2%", icon: Users, accent: "bg-primary/15 text-primary" },
          { label: "Teachers", value: stats.teachers, delta: "+3", icon: GraduationCap, accent: "bg-chart-2/15 text-chart-2" },
          { label: "Active courses", value: stats.courses, delta: "+5", icon: BookOpen, accent: "bg-success/15 text-success" },
          { label: "Revenue (MTD)", value: "$284K", delta: "+12.4%", icon: CreditCard, accent: "bg-warning/15 text-warning" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <div className={`grid h-9 w-9 place-items-center rounded-xl ${s.accent}`}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight">{s.value}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-success">
              <TrendingUp className="h-3 w-3" /> {s.delta}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Attendance overview</h3>
              <p className="text-xs text-muted-foreground">Institution-wide attendance rate</p>
            </div>
            <Badge variant="secondary">Last 6 months</Badge>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="att2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
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
                <Area type="monotone" dataKey="rate" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#att2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-6">
          <h3 className="font-display text-lg font-semibold">Grade distribution</h3>
          <p className="text-xs text-muted-foreground">Current semester</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  dataKey="value"
                  nameKey="grade"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {gradeDistribution.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 grid grid-cols-5 gap-1 text-center text-xs">
            {gradeDistribution.map((g, i) => (
              <li key={g.grade}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: pieColors[i] }} />
                <p className="mt-1 font-medium">{g.grade}</p>
                <p className="text-muted-foreground">{g.value}%</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Students management */}
      <Card className="mt-6 border-border/60 p-0">
        <div className="grid gap-3 border-b border-border/60 p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Students</h3>
            <p className="text-xs text-muted-foreground">Search, filter, and manage all records</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-56 pl-9"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All fees</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{s.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                        {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{s.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.course}</TableCell>
                  <TableCell className="text-sm">Y{s.year}</TableCell>
                  <TableCell>
                    <Badge variant={s.attendance >= 85 ? "default" : "secondary"} className={s.attendance >= 85 ? "bg-success hover:bg-success" : ""}>
                      {s.attendance}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        s.fees === "Paid"
                          ? "bg-success text-success-foreground hover:bg-success"
                          : s.fees === "Pending"
                          ? "bg-warning text-warning-foreground hover:bg-warning"
                          : "bg-destructive text-destructive-foreground hover:bg-destructive"
                      }
                    >
                      {s.fees}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" aria-label="Edit"><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                    <FileBarChart className="mx-auto mb-2 h-8 w-8 opacity-50" /> No students match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardShell>
  );
}
