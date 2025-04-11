import { ReactNode } from "react";

interface FooterLink {
  href: string;
  label: string;
  icon?: ReactNode;
}

interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

export function Footer({
  links = [],
  copyright = `© ${new Date().getFullYear()} PDF Summary AI. All rights reserved.`,
  className = ""
}: FooterProps) {
  return (
    <footer className={`flex flex-col items-center gap-4 py-6 ${className}`}>
      {links.length > 0 && (
        <nav className="flex gap-6 flex-wrap items-center justify-center">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>
      )}
      <p className="text-sm text-muted-foreground">
        {copyright}
      </p>
    </footer>
  );
} 