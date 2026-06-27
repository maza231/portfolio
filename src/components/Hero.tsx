import Container from "./Container";
import Reveal from "./Reveal";
import WordRotator from "./WordRotator";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-24 sm:pt-36 sm:pb-32">
      {/* Soft animated glow behind the heading */}
      <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -top-40 left-1/4 -z-10 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(197,165,114,0.22) 0%, rgba(197,165,114,0) 70%)",
        }}
      />

      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-8 text-sm uppercase tracking-[0.2em] text-muted">
              {site.role} · Freelance
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-5xl font-light leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
              Siti web su misura per chi vuole{" "}
              <WordRotator
                words={["distinguersi", "farsi notare", "crescere"]}
                className="text-accent"
              />
              .
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted">
              Sono Manuel, sviluppatore web freelance. Progetto e costruisco siti
              moderni, veloci e curati nei dettagli per piccole attività che
              vogliono fare bella figura online.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
