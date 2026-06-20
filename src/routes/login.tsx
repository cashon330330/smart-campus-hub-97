import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, GraduationCap, Lock, Mail, School, UserCog } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Student Management System" },
      {
        name: "description",
        content:
          "Sign in to your Student Management System portal as a student, teacher, or administrator to access dashboards, grades, and fees.",
      },
      { property: "og:title", content: "Sign in — Student Management System" },
      {
        property: "og:description",
        content: "Role-based sign in for students, teachers, and administrators.",
      },
      { property: "og:url", content: "https://smart-campus-hub-97.lovable.app/login" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://smart-campus-hub-97.lovable.app/login" }],
  }),
  component: LoginPage,
});

type Role = "student" | "teacher" | "admin";
const roles: { value: Role; label: string; icon: typeof GraduationCap; redirect: string }[] = [
  { value: "student", label: "Student", icon: GraduationCap, redirect: "/dashboard/student" },
  { value: "teacher", label: "Teacher", icon: School, redirect: "/dashboard/teacher" },
  { value: "admin", label: "Admin", icon: UserCog, redirect: "/dashboard/admin" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const target = roles.find((r) => r.value === role)!.redirect;
      toast.success(`Welcome back! Signed in as ${role}.`);
      navigate({ to: target });
    }, 600);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual panel */}
      <div className="relative hidden overflow-hidden bg-gradient-hero lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">SMS</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight">
              One login. <br /> Three portals. <br /> Zero friction.
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              Securely access your role-based dashboard with everything you need to learn,
              teach, or run a modern campus.
            </p>
          </div>
          <p className="text-sm text-primary-foreground/70">© Student Management System</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-gradient-subtle px-4 py-12 sm:px-8">
        <Card className="w-full max-w-md border-border/60 p-8 shadow-soft">
          <Link to="/" className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-base font-bold">SMS</span>
          </Link>
          <h1 className="font-display text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your portal to continue.</p>

          <Tabs value={role} onValueChange={(v) => setRole(v as Role)} className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              {roles.map((r) => (
                <TabsTrigger key={r.value} value={r.value} className="gap-1.5">
                  <r.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{r.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {roles.map((r) => (
              <TabsContent key={r.value} value={r.value} className="mt-6">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${r.value}-email`}>Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={`${r.value}-email`}
                        type="email"
                        required
                        placeholder={`${r.value}@uni.edu`}
                        defaultValue={`${r.value}@uni.edu`}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${r.value}-pass`}>Password</Label>
                      <button
                        type="button"
                        onClick={() => toast.info("Password reset link sent (demo).")}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={`${r.value}-pass`}
                        type="password"
                        required
                        placeholder="••••••••"
                        defaultValue="demo1234"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full shadow-soft" disabled={loading}>
                    {loading ? "Signing in..." : (<>Sign in as {r.label} <ArrowRight className="ml-2 h-4 w-4" /></>)}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo mode — any credentials will sign you in.
          </p>
        </Card>
      </div>
    </div>
  );
}
