// Single source of truth for personal / contact info.
// 👉 Modifica qui nome, email e link: si aggiorna in tutto il sito.

export const site = {
  name: "Manuel Mazarese",
  role: "Sviluppatore Web",
  description:
    "Progetto e sviluppo siti web moderni, chiari e su misura per attività locali.",
  email: "mazarese.manuel.business@gmail.com",
  available: true,

  web3formsKey: "594b012f-00f1-4081-9ce5-b2705b4d5e12",
  socials: [
    // Aggiungi/rimuovi liberamente
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
} as const;
