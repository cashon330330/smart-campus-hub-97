import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Check, Download, X } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { attendanceTrend, students } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — Student Management System" },
      {
        name: "description",
        content:
          "Mark today's class attendance, view historical trends, and export attendance reports for students and courses.",
      },
      { property: "og:title", content: "Attendance — Student Management System" },
      { property: "og:description", content: "Mark class attendance and view trends and reports." },
      { property: "og:url", content: "https://smart-campus-hub-97.lovable.app/dashboard/attendance" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://smart-campus-hub-97.lovable.app/dashboard/attendance" }],
  }),
  component: AttendancePage,
});

function AttendancePage() {
  const [course, setCourse] = useState("CS-301");
  const [marks, setMarks] = useState<Record<string, "present" | "absent">>(
    Object.fromEntries(students.slice(0, 6).map((s) => [s.id, "present"]))
  );

  const toggle = (id: string, value: "present" | "absent") => {
    setMarks((prev) => ({ ...prev, [id]: value }));
  };

  const presentCount = Object.values(marks).filter((m) => m === "present").length;

  return (
    <DashboardShell
      title="Attendance"
      subtitle="Mark today's class and view historical attendance reports."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => toast.success("Report downloaded")}>
            <Download className="mr-2 h-4 w-4" /> Report
          </Button>
          <Button size="sm" onClick={() => toast.success(`Attendance saved for ${course}`)}>
            <CalendarCheck className="mr-2 h-4 w-4" /> Save attendance
          </Button>
        </>
      }
    >
      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Today's rate", value: "94.2%", sub: "+1.4% vs yesterday", accent: "text-success" },
          { label: "Present", value: presentCount, sub: `of ${Object.keys(marks).length} students`, accent: "text-primary" },
          { label: "Avg. monthly", value: "90.1%", sub: "Across all courses", accent: "text-chart-2" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className={`mt-2 font-display text-3xl font-bold ${s.accent}`}>{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="mt-6 border-border/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">Attendance trend</h2>
            <p className="text-xs text-muted-foreground">Monthly rate, last 6 months</p>
          </div>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              <Bar dataKey="rate" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Marker */}
      <Card className="mt-6 border-border/60 p-0">
        <div className="grid gap-3 border-b border-border/60 p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">Mark attendance</h2>
            <p className="text-xs text-muted-foreground">Tap a student to toggle present / absent</p>
          </div>
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CS-301">CS-301 Data Structures</SelectItem>
              <SelectItem value="MA-204">MA-204 Linear Algebra</SelectItem>
              <SelectItem value="PH-210">PH-210 Quantum Mechanics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.slice(0, 6).map((s) => {
                const status = marks[s.id];
                return (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                          {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <p className="truncate text-sm font-medium">{s.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{s.id}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.course}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button
                          size="sm"
                          variant={status === "present" ? "default" : "outline"}
                          className={status === "present" ? "bg-success hover:bg-success/90" : ""}
                          onClick={() => toggle(s.id, "present")}
                        >
                          <Check className="mr-1 h-3.5 w-3.5" /> Present
                        </Button>
                        <Button
                          size="sm"
                          variant={status === "absent" ? "default" : "outline"}
                          className={status === "absent" ? "bg-destructive hover:bg-destructive/90" : ""}
                          onClick={() => toggle(s.id, "absent")}
                        >
                          <X className="mr-1 h-3.5 w-3.5" /> Absent
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* History */}
      <Card className="mt-6 border-border/60 p-6">
        <h2 className="font-display text-lg font-semibold">Recent records</h2>
        <ul className="mt-4 divide-y divide-border">
          {students.slice(0, 5).map((s) => (
            <li key={s.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.course}</p>
              </div>
              <Badge className={s.attendance >= 85 ? "bg-success text-success-foreground hover:bg-success" : "bg-warning text-warning-foreground hover:bg-warning"}>
                {s.attendance}% this term
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardShell>
  );
}
