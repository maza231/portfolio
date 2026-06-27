import { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border-t border-line/15 py-7 transition-colors hover:bg-line/[0.02] sm:py-9"
    >
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="text-sm tabular-nums text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <span className="flex items-baseline gap-3">
              <h3 className="font-display text-3xl font-light tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl md:text-5xl">
                {project.title}
              </h3>
              <span
                aria-hidden="true"
                className="translate-x-[-6px] text-lg text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                ↗
              </span>
            </span>

            {/* Description revealed on hover */}
            <p className="mt-0 max-h-0 -translate-y-1 overflow-hidden text-muted opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-12 group-hover:translate-y-0 group-hover:opacity-100">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-baseline gap-4 whitespace-nowrap pt-2 text-sm text-muted">
          <span className="hidden sm:inline">{project.category}</span>
          <span className="tabular-nums">{project.year}</span>
        </div>
      </div>
    </a>
  );
}
