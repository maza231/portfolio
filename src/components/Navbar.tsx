import Link from "next/link";
import Container from "./Container";
import { site } from "@/data/site";

const links = [
  { label: "Lavori", href: "#lavori" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-bg/70 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Link href="#top" className="text-[15px] font-medium tracking-tight">
            {site.name}
          </Link>

          <ul className="flex items-center gap-6 sm:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
