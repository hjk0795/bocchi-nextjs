import { NextResponse, NextRequest } from "next/server";

export function middleware(req, res) {
  if (req.cookies.has("isAuthenticated")) {
    if (req.cookies.get("isAuthenticated").value === "true") {
      return NextResponse.next();
    } else if (req.cookies.get("isAuthenticated").value === "false") {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Access denied (unauthorized)",
        }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/dashboard",
};
