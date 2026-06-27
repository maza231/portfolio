"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";

const telHref = `tel:${site.phone.replace(/\s+/g, "")}`;

export default function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Allow opening the dialog via the #scrivimi deep-link.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#scrivimi") setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-display text-4xl font-light italic leading-tight tracking-tight underline decoration-line/20 underline-offset-[6px] transition-colors hover:decoration-fg sm:text-5xl md:text-6xl"
      >
        Scrivimi.
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Contatti"
          >
            {/* Backdrop */}
            <div
              className="animate-fade absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Card */}
            <div className="animate-pop relative w-full max-w-md rounded-2xl border border-line/15 bg-surface p-8 shadow-2xl sm:p-10">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
                className="absolute right-5 top-5 text-muted transition-colors hover:text-fg"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Contatti
              </p>
              <p className="mt-3 font-display text-3xl font-light tracking-tight">
                {site.name}
              </p>

              <div className="mt-8 flex flex-col gap-5">
                <a
                  href={telHref}
                  className="group block border-t border-line/10 pt-5"
                >
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted">
                    Telefono
                  </span>
                  <span className="mt-1 block text-lg transition-colors group-hover:text-accent">
                    {site.phone}
                  </span>
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="group block border-t border-line/10 pt-5"
                >
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted">
                    Email
                  </span>
                  <span className="mt-1 block break-words text-lg transition-colors group-hover:text-accent">
                    {site.email}
                  </span>
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
