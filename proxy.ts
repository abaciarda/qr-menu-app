import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./lib/env";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get(env.SESSION_COOKIE_NAME)?.value;

    let isValidSession = false;

    if(token) {
        try {
            await jwtVerify(token, env.JWT_SECRET);
            isValidSession = true;
        } catch {
            isValidSession = false;
        }
    }

    const isLoginPage = pathname === "admin";
    const isDashboardRoute = pathname.startsWith("/admin/") && pathname !== "/admin";

    if(isDashboardRoute && !isValidSession) {
        const loginUrl = new URL("/admin", req.url);
        return NextResponse.redirect(loginUrl);
    }

    if(isLoginPage && isValidSession) {
        const dashboardUrl = new URL("/admin/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path"]
}