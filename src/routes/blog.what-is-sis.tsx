import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PAGE_URL = "https://smart-campus-hub-97.lovable.app/blog/what-is-sis";
const TITLE = "What is a Student Information System (SIS)? — A Complete Guide";
const DESCRIPTION =
  "A practical guide to Student Information Systems (SIS): what they are, the core features they provide, who uses them, and how a modern SIS improves campus efficiency and student success.";

export const Route = createFileRoute("/blog/what-is-sis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "student information system, SIS, student management system, SMS, campus management, university software, college management",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: PAGE_URL,
          mainEntityOfPage: PAGE_URL,
          author: { "@type": "Organization", name: "Student Management System" },
          publisher: {
            "@type": "Organization",
            name: "Student Management System",
            url: "https://smart-campus-hub-97.lovable.app",
          },
          datePublished: "2026-06-20",
          dateModified: "2026-06-20",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a Student Information System (SIS)?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A Student Information System (SIS) is software that centralizes student data — enrollment, attendance, grades, fees, and communications — so schools, colleges, and universities can manage the entire student lifecycle in one place.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between an SIS and an LMS?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "An SIS manages student records, enrollment, attendance, grades, and fees. A Learning Management System (LMS) delivers course content, assignments, and quizzes. Most modern campuses use both, with the SIS as the system of record.",
              },
            },
            {
              "@type": "Question",
              name: "Who uses a Student Information System?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Administrators, registrars, teachers, students, and parents. Each role gets a dedicated portal with the data and actions relevant to them.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: WhatIsSisPage,
});

const coreFeatures = [
  { icon: Users, title: "Student records", desc: "A single source of truth for demographics, enrollment, and academic history." },
  { icon: ClipboardCheck, title: "Attendance", desc: "Daily and per-class attendance with automated alerts for absences." },
  { icon: GraduationCap, title: "Grades & transcripts", desc: "Marks, GPA calculation, report cards, and verified transcripts." },
  { icon: CreditCard, title: "Fees & billing", desc: "Invoices, payment tracking, scholarships, and refund workflows." },
  { icon: LineChart, title: "Analytics", desc: "Real-time dashboards on enrollment, performance, retention, and revenue." },
  { icon: ShieldCheck, title: "Role-based access", desc: "Secure portals for admins, teachers, students, and parents." },
];

function WhatIsSisPage() {
  return (
    <div className="min-h-screen">
      <MarketingNav />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <header>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Guide
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            What is a Student Information System (SIS)?
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A practical, plain-English guide to Student Information Systems — what
            they are, the problems they solve, the features that matter, and how
            modern SIS platforms improve campus efficiency and student success.
          </p>
        </header>

        <section className="prose prose-slate mt-12 max-w-none dark:prose-invert">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            The short definition
          </h2>
          <p className="text-foreground/90">
            A <strong>Student Information System (SIS)</strong> is the software
            platform that schools, colleges, and universities use to manage
            student data across the entire academic lifecycle — from admission
            and enrollment to attendance, grading, fees, and graduation. Think
            of it as the operating system of a modern campus.
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold tracking-tight">
            Why institutions need an SIS
          </h2>
          <p className="text-foreground/90">
            Before SIS platforms, student records lived in stacks of paper,
            disconnected spreadsheets, and email threads. That made even simple
            questions — <em>How many students are at risk this term?</em> — hard
            to answer. A good SIS replaces that chaos with one trusted dataset
            and the workflows that act on it.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Core features of a modern SIS
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {coreFeatures.map((f) => (
              <Card key={f.title} className="border-border/60 p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            SIS vs. LMS — what's the difference?
          </h2>
          <p className="text-foreground/90">
            The two are complementary, not interchangeable. An <strong>SIS</strong>{" "}
            is the system of record for who a student is, what they're enrolled
            in, and how they're performing. A <strong>Learning Management
            System (LMS)</strong> is where coursework happens — lectures, readings,
            assignments, and quizzes. Most campuses use both, with the SIS feeding
            rosters and grades to and from the LMS.
          </p>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            How a modern SIS improves campus efficiency
          </h2>
          <ul className="grid gap-3 text-foreground/90">
            {[
              "Cuts administrative time on attendance, grade entry, and fee reconciliation by 40–60%.",
              "Surfaces at-risk students early using attendance and grade trends.",
              "Gives students self-service access to schedules, results, and invoices.",
              "Provides leadership with live dashboards instead of month-end reports.",
              "Reduces compliance risk with audit-ready records and role-based permissions.",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            What to look for when choosing one
          </h2>
          <p className="text-foreground/90">
            Beyond the feature list, the SIS platforms that actually get used
            day-to-day share a few traits: a fast, modern interface that doesn't
            require training, role-based portals that show each user only what
            they need, an open API for integrations with your LMS and payment
            providers, and serious privacy controls (FERPA, GDPR) baked in.
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-border/60 bg-gradient-subtle p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            See an SIS in action
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Student Management System is a modern SIS built from the ground up
            for colleges and universities. Explore a live dashboard, or talk to
            us about a custom deployment for your campus.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/dashboard/admin">
              <Button size="lg" className="shadow-soft">
                Explore the dashboard <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">Talk to our team</Button>
            </Link>
          </div>
        </section>
      </article>

      <MarketingFooter />
    </div>
  );
}
