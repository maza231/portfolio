"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";

const initialForm = {
  nome: "",
  cognome: "",
  attivita: "",
  telefono: "",
  email: "",
};

type Form = typeof initialForm;
type Status = "idle" | "sending" | "success" | "error";

const fields: {
  name: keyof Form;
  label: string;
  type: string;
  autoComplete?: string;
}[] = [
  { name: "nome", label: "Nome", type: "text", autoComplete: "given-name" },
  { name: "cognome", label: "Cognome", type: "text", autoComplete: "family-name" },
  { name: "attivita", label: "Tipo di attività", type: "text" },
  { name: "telefono", label: "Numero di telefono", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
];

export default function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<Form>(initialForm);
  const [status, setStatus] = useState<Status>("idle");

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

  // Reset the form a moment after the dialog is closed.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setForm(initialForm);
      setStatus("idle");
    }, 200);
    return () => clearTimeout(t);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `Nuova richiesta da ${form.nome} ${form.cognome}`.trim(),
          from_name: `${form.nome} ${form.cognome}`.trim(),
          Nome: form.nome,
          Cognome: form.cognome,
          "Tipo di attività": form.attivita,
          Telefono: form.telefono,
          Email: form.email,
        }),
      });

      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const update = (name: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }));

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

              {status === "success" ? (
                <div className="mt-3">
                  <p className="font-display text-3xl font-light tracking-tight">
                    Richiesta inviata
                  </p>
                  <p className="mt-4 text-muted">
                    Grazie {form.nome}, ti risponderò il prima possibile.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-8 rounded-full bg-fg px-7 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                  >
                    Chiudi
                  </button>
                </div>
              ) : (
                <>
                  <p className="mt-3 font-display text-3xl font-light tracking-tight">
                    Parlami del tuo progetto
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                    {fields.map((field) => (
                      <label key={field.name} className="block">
                        <span className="block text-xs uppercase tracking-[0.15em] text-muted">
                          {field.label}
                        </span>
                        <input
                          type={field.type}
                          required
                          autoComplete={field.autoComplete}
                          value={form[field.name]}
                          onChange={update(field.name)}
                          className="mt-2 w-full border-b border-line/15 bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted/50 focus:border-accent"
                        />
                      </label>
                    ))}

                    {status === "error" && (
                      <p className="text-sm text-accent">
                        Qualcosa è andato storto. Riprova o scrivimi a {site.email}.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-3 rounded-full bg-fg px-7 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {status === "sending" ? "Invio in corso…" : "Invia richiesta"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
