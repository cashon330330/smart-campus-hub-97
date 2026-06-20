import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { results, gradeDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/results")({
  head: () => ({
    meta: [
      { title: "Results — Student Management System" },
      {
        name: "description",
        content:
          "Track subject performance, view class grade distribution, and publish result sheets and transcripts for every student.",
      },
      { property: "og:title", content: "Results — Student Management System" },
      { property: "og:description", content: "Track performance, grade distribution, and result sheets." },
      { property: "og:url", content: "https://smart-campus-hub-97.lovable.app/dashboard/results" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://smart-campus-hub-97.lovable.app/dashboard/results" }],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const avg = Math.round(results.reduce((a, r) => a + r.marks, 0) / results.length);

  return (
    <DashboardShell
      title="Results"
      subtitle="View, upload, and download exam results."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => toast.success("Result card downloaded as PDF")}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button size="sm" onClick={() => toast.success("Marks uploaded")}>
            <Upload className="mr-2 h-4 w-4" /> Upload marks
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Overall %", value: avg + "%", sub: "Top 15% in class", accent: "text-primary" },
          { label: "GPA", value: "3.82", sub: "Out of 4.0", accent: "text-success" },
          { label: "Subjects passed", value: `${results.length}/${results.length}`, sub: "All clear", accent: "text-chart-2" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className={`mt-2 font-display text-3xl font-bold ${s.accent}`}>{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Subject performance</h3>
          <ul className="mt-4 space-y-5">
            {results.map((r) => (
              <li key={r.course}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium">{r.course}</p>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-xs text-muted-foreground">{r.marks}/{r.total}</span>
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary">{r.grade}</Badge>
                  </div>
                </div>
                <Progress value={(r.marks / r.total) * 100} className="h-2" />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-border/60 p-6">
          <h3 className="font-display text-lg font-semibold">Class grade distribution</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="grade" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-6 border-border/60 p-0">
        <div className="border-b border-border/60 p-5">
          <h3 className="font-display text-lg font-semibold">Result sheet</h3>
          <p className="text-xs text-muted-foreground">Semester 4 — Fall 2024</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>%</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.course}>
                  <TableCell className="font-medium">{r.course}</TableCell>
                  <TableCell>{r.marks}</TableCell>
                  <TableCell>{r.total}</TableCell>
                  <TableCell>{Math.round((r.marks / r.total) * 100)}%</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary">{r.grade}</Badge>
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
