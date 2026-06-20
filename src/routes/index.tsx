import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  Layers,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { stats, testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Management System — Complete Solution" },
      {
        name: "description",
        content:
          "Modern, all-in-one student management for colleges: attendance, results, fees, analytics, and role-based portals for students, teachers, and admins.",
      },
      { property: "og:title", content: "Student Management System — Complete Solution" },
      {
        property: "og:description",
        content:
          "Modern, all-in-one student management for colleges: attendance, results, fees, analytics, and role-based portals.",
      },
      { property: "og:url", content: "https://smart-campus-hub-97.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://smart-campus-hub-97.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Student Management System",
          url: "https://smart-campus-hub-97.lovable.app/",
          description:
            "All-in-one student management platform for colleges with attendance, grades, fees, and analytics.",
        }),
      },
    ],
  }),
  component: Home,
});

const features = [
  { icon: ClipboardCheck, title: "Attendance, automated", desc: "QR check-ins, biometric sync, and live class rosters in one click." },
  { icon: GraduationCap, title: "Grades & results", desc: "Upload marks, auto-calculate GPA, and publish transcripts as PDF." },
  { icon: CreditCard, title: "Fees & payments", desc: "Issue invoices, track payments, and send reminders automatically." },
  { icon: BarChart3, title: "Analytics dashboard", desc: "Real-time insights on enrollment, performance, and revenue." },
  { icon: ShieldCheck, title: "Role-based access", desc: "Separate portals for students, teachers, and administrators." },
  { icon: Layers, title: "Course management", desc: "Build curricula, assign teachers, and manage enrollment with ease." },
];

function Home() {
  return (
    <div className="min-h-screen">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-subtle" />
        <div
          className="absolute -top-32 right-0 -z-10 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Trusted by 120+ institutions
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Complete Student <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">Management Solution</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              One beautifully designed platform for attendance, grades, fees, and analytics —
              built for students, teachers, and administrators alike.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard/admin">
                <Button size="lg" className="shadow-glow">
                  Explore the dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">Sign in</Button>
              </Link>
            </div>
            <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {["No setup fees", "GDPR & FERPA ready", "Mobile responsive", "Free 30-day trial"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero visual: composed mock dashboard */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-hero opacity-20 blur-2xl" />
            <Card className="overflow-hidden border-border/60 p-0 shadow-glow">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/50 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <p className="ml-3 text-xs text-muted-foreground">app.sms.edu/dashboard</p>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                {[
                  { label: "Active students", value: "4,280", icon: Users, color: "text-primary" },
                  { label: "Attendance today", value: "94.2%", icon: ClipboardCheck, color: "text-success" },
                  { label: "Avg. GPA", value: "3.62", icon: GraduationCap, color: "text-chart-2" },
                  { label: "Pending fees", value: "$48K", icon: CreditCard, color: "text-warning" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/60 bg-background/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <s.icon className={`h-4 w-4 ${s.color}`} />
                    </div>
                    <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
                  </div>
                ))}
                <div className="sm:col-span-2 rounded-xl border border-border/60 bg-background/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Attendance trend</p>
                    <span className="text-xs text-success">+6% MoM</span>
                  </div>
                  <div className="mt-3 flex h-20 items-end gap-1.5">
                    {[40, 55, 48, 62, 58, 70, 65, 78, 72, 84, 80, 92].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-md bg-gradient-hero"
                        style={{ height: `${h}%`, opacity: 0.55 + i * 0.035 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-background">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            { label: "Students", value: stats.students.toLocaleString() + "+" },
            { label: "Teachers", value: stats.teachers + "+" },
            { label: "Courses", value: stats.courses + "+" },
            { label: "Departments", value: stats.departments + "" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Everything you need</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            One platform for every campus workflow
          </h2>
          <p className="mt-4 text-muted-foreground">
            From the moment a student enrolls to the day they graduate — SMS handles it all.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="group relative overflow-hidden border-border/60 p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-gradient-hero group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-primary-foreground shadow-glow sm:p-14">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to modernize your campus?
              </h2>
              <p className="mt-2 max-w-2xl text-primary-foreground/95">
                Try SMS free for 30 days. White-glove onboarding included.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard/admin">
                <Button size="lg" variant="secondary">Open dashboard</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                  Book a demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by educators worldwide
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/60 p-7 transition-all hover:-translate-y-1 hover:shadow-glow">
              <Quote className="h-7 w-7 text-primary/60" />
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
