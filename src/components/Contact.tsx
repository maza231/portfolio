import Container from "./Container";
import Reveal from "./Reveal";
import ContactDialog from "./ContactDialog";

export default function Contact() {
  return (
    <section id="contatti" className="scroll-mt-20 py-28 sm:py-40">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-muted">
              Contatti
            </p>
            <ContactDialog />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
