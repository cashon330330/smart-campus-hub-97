import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SMS" },
      { name: "description", content: "Get in touch with the Student Management System team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent. We'll be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <div className="min-h-screen">
      <MarketingNav />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Let's talk about your campus
          </h1>
          <p className="mt-4 text-muted-foreground">
            Questions about pricing, onboarding, or a custom deployment? Send a note —
            we usually respond within a day.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@sms.edu" },
              { icon: Phone, label: "Phone", value: "+1 (415) 555-0142" },
              { icon: MapPin, label: "Headquarters", value: "220 Bryant St, San Francisco, CA" },
            ].map((c) => (
              <Card key={c.label} className="flex items-center gap-4 border-border/60 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="truncate font-medium">{c.value}</p>
                </div>
              </Card>
            ))}
            <Card className="overflow-hidden border-border/60 p-0">
              <iframe
                title="SMS HQ map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4030%2C37.7790%2C-122.3950%2C37.7850&layer=mapnik&marker=37.7820%2C-122.3990"
                className="h-64 w-full"
                loading="lazy"
              />
            </Card>
          </div>

          {/* Form */}
          <Card className="border-border/60 p-7 shadow-soft sm:p-9">
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" required placeholder="jane@university.edu" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" placeholder="Crestwood University" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" required rows={5} placeholder="Tell us about your campus and what you're looking to solve..." />
              </div>
              <Button type="submit" size="lg" className="w-fit shadow-soft" disabled={loading}>
                {loading ? "Sending..." : (<>Send message <Send className="ml-2 h-4 w-4" /></>)}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
