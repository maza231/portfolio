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

          <a
            href={`mailto:${site.email}`}
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            {site.email}
          </a>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} · Tutti i diritti riservati
          </p>
        </div>
      </Container>
    </footer>
  );
}
