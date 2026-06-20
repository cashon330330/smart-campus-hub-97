import { createFileRoute } from "@tanstack/react-router";
import { Bell, BookOpen, ClipboardCheck, MessageSquare, Plus, Upload, Users } from "lucide-react";
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
import { courses, enrollmentByDept, students } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/teacher")({
  head: () => ({
    meta: [
      { title: "Teacher Dashboard — Student Management System" },
      {
        name: "description",
        content:
          "Teacher dashboard for managing classes, students, attendance, and grades with quick actions for announcements and uploading marks.",
      },
      { property: "og:title", content: "Teacher Dashboard — Student Management System" },
      { property: "og:description", content: "Manage your classes, students, attendance, and grades." },
      { property: "og:url", content: "https://smart-campus-hub-97.lovable.app/dashboard/teacher" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://smart-campus-hub-97.lovable.app/dashboard/teacher" }],
  }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  return (
    <DashboardShell
      title="Teacher Dashboard — Good morning, Dr. Voss"
      subtitle="You have 4 classes today and 12 assignments to review."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => toast.success("Announcement posted")}>
            <MessageSquare className="mr-2 h-4 w-4" /> Announce
          </Button>
          <Button size="sm" onClick={() => toast.success("Marks uploaded")}>
            <Upload className="mr-2 h-4 w-4" /> Upload marks
          </Button>
        </>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "My students", value: "142", icon: Users, accent: "bg-primary/15 text-primary" },
          { label: "Active courses", value: "4", icon: BookOpen, accent: "bg-chart-2/15 text-chart-2" },
          { label: "Today's classes", value: "3", icon: ClipboardCheck, accent: "bg-success/15 text-success" },
          { label: "Pending reviews", value: "12", icon: Bell, accent: "bg-warning/15 text-warning" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <div className={`grid h-9 w-9 place-items-center rounded-xl ${s.accent}`}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Enrollment by department</h2>
          <p className="text-xs text-muted-foreground">Students you've taught across departments</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentByDept} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="dept" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="students" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">My courses</h2>
            <Button variant="ghost" size="icon"><Plus className="h-4 w-4" /></Button>
          </div>
          <ul className="mt-4 space-y-3">
            {courses.slice(0, 4).map((c) => (
              <li key={c.code} className="rounded-lg border border-border/60 p-3 transition-colors hover:bg-accent/50">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold">{c.title}</p>
                  <Badge variant="outline" className="shrink-0">{c.enrolled}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.code}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Students table */}
      <Card className="mt-6 border-border/60 p-0">
        <div className="flex items-center justify-between border-b border-border/60 p-5">
          <div>
            <h2 className="font-display text-lg font-semibold">My students</h2>
            <p className="text-xs text-muted-foreground">Manage attendance and grades</p>
          </div>
          <Button size="sm" variant="outline">Export</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.slice(0, 6).map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                        {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{s.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.course}</TableCell>
                  <TableCell>
                    <Badge className={s.attendance >= 85 ? "bg-success text-success-foreground hover:bg-success" : "bg-warning text-warning-foreground hover:bg-warning"}>
                      {s.attendance}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{s.gpa.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardShell>
  );
}
