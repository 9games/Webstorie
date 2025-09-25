import Link from "next/link";
import Logo from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo />
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Storie Weaver. All Rights Reserved.
          </p>
        </div>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
