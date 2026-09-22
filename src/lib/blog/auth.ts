import { NextRequest } from "next/server";

export function getAdminSecret(): string {
  return (
    process.env.BLOG_ADMIN_KEY ||
    process.env.ADMIN_SECRET ||
    process.env.CRON_SECRET ||
    "webvibez-admin-secret-2026"
  );
}

export function isAuthenticatedAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const adminKeyHeader = request.headers.get("x-admin-key");
  const secret = getAdminSecret();

  if (adminKeyHeader && adminKeyHeader === secret) {
    return true;
  }

  if (authHeader) {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      return parts[1] === secret;
    }
  }

  return false;
}
