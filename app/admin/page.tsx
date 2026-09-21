"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Store, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/admin/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-10 bg-background text-foreground font-sans">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Admin Panel Login
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your credentials to access QR Menu management
          </p>
        </div>

        <Card className="rounded-2xl border bg-card p-6 shadow-xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl font-medium transition-all"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-2 border-t text-center">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Store className="h-3.5 w-3.5" />
              View Customer QR Menu
            </Link>
          </div>
        </Card>

        <p className="text-center text-[11px] text-muted-foreground font-mono">
          QR Menu Platform © 2026
        </p>
      </div>
    </div>
  );
}
