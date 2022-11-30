import { NextResponse } from "next/server";

export function middleware(req, res) {
  if (req.cookies.has("isAuthenticated")) {
    if (req.cookies.get("isAuthenticated").value === "true") {
      return NextResponse.next();
    } else if (req.cookies.get("isAuthenticated").value === "false") {
      return NextResponse.redirect("http://localhost:3000/redirection");
    }
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard", "/callbackEndpoint"]
};
