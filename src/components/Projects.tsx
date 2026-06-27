import Container from "./Container";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="lavori" className="scroll-mt-20 py-12 sm:py-16">
      <Container>
        <Reveal>
          <p className="mb-6 text-sm uppercase tracking-[0.2em] text-muted">
            Lavori
          </p>
        </Reveal>

        <Reveal>
          <div className="border-b border-line/15">
            {projects.map((project, i) => (
              <ProjectCard key={project.href} project={project} index={i} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
