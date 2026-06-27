import Container from "./Container";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/10 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-display text-base font-semibold tracking-tight">
            {site.name}
          </p>

          <div className="flex items-center gap-6">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {social.label}
              </a>
            ))}
          </div>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} · Tutti i diritti riservati
          </p>
        </div>
      </Container>
    </footer>
  );
}
