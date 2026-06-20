import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download, Receipt, Wallet } from "lucide-react";
import { toast } from "sonner";
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
import { feeHistory } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/fees")({
  head: () => ({ meta: [{ title: "Fees — SMS" }] }),
  component: FeesPage,
});

function FeesPage() {
  const total = 2500;
  const paid = 1800;
  const remaining = total - paid;

  return (
    <DashboardShell
      title="Fees & Payments"
      subtitle="Track your invoices, payments, and receipts."
      actions={
        <Button size="sm" onClick={() => toast.success("Redirecting to payment gateway...")}>
          <CreditCard className="mr-2 h-4 w-4" /> Pay now
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total fee", value: `$${total}`, icon: Wallet, accent: "bg-primary/15 text-primary" },
          { label: "Paid", value: `$${paid}`, icon: Receipt, accent: "bg-success/15 text-success" },
          { label: "Remaining", value: `$${remaining}`, icon: CreditCard, accent: "bg-warning/15 text-warning" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 p-5">
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

      <Card className="mt-6 border-border/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Spring 2025 — Fee status</h3>
            <p className="text-xs text-muted-foreground">Due Jan 20, 2025</p>
          </div>
          <Badge className="bg-warning text-warning-foreground hover:bg-warning">Pending</Badge>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{Math.round((paid / total) * 100)}% paid</span>
            <span>${paid} of ${total}</span>
          </div>
          <Progress value={(paid / total) * 100} className="h-3" />
        </div>
      </Card>

      <Card className="mt-6 border-border/60 p-0">
        <div className="flex items-center justify-between border-b border-border/60 p-5">
          <div>
            <h3 className="font-display text-lg font-semibold">Payment history</h3>
            <p className="text-xs text-muted-foreground">Invoices and receipts</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.success("Exported as Excel")}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeHistory.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{f.id}</TableCell>
                  <TableCell className="font-medium">{f.term}</TableCell>
                  <TableCell>${f.amount}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{f.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        f.status === "Paid"
                          ? "bg-success text-success-foreground hover:bg-success"
                          : "bg-warning text-warning-foreground hover:bg-warning"
                      }
                    >
                      {f.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.success(`Receipt ${f.id} downloaded`)}
                    >
                      <Download className="mr-1 h-3.5 w-3.5" /> PDF
                    </Button>
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
