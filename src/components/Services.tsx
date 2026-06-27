import Container from "./Container";
import Reveal from "./Reveal";

const offerings = [
  "Siti vetrina",
  "Landing page",
  "Menù digitali",
  "Prenotazioni & contatti",
  "Performance & SEO",
  "Design su misura",
];

export default function Services() {
  return (
    <section id="info" className="scroll-mt-20 border-t border-line/15 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[200px_1fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Info</p>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal>
              <p className="font-display text-2xl font-light leading-relaxed tracking-tight sm:text-3xl">
                Aiuto piccole attività a farsi trovare e scegliere online, con
                siti curati nei dettagli, veloci e facili da usare su qualsiasi
                dispositivo.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-8 leading-relaxed text-muted">
                Seguo ogni progetto dall&apos;idea fino alla messa online:
                ascolto cosa ti serve, disegno qualcosa su misura per il tuo
                brand e lo sviluppo con tecnologie moderne. Niente template
                anonimi, niente complicazioni inutili.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 text-muted">
                {offerings.map((item) => (
                  <li key={item} className="border-t border-line/10 pt-3 text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
