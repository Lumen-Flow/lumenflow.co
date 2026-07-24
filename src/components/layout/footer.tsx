import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page py-8 text-sm text-muted">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
