// I tuoi lavori. Aggiungi un oggetto per ogni progetto.
// `description` compare all'hover sulla riga del lavoro.

export type Project = {
  title: string;
  category: string;
  description: string;
  href: string;
  year: string;
};

export const projects: Project[] = [
  {
    title: "Bella Unghie Studio",
    category: "Centro estetico",
    description: "Sito vetrina elegante con galleria e prenotazione rapida.",
    href: "https://demo-nail-brown.vercel.app/",
    year: "2026",
  },
  {
    title: "Palestra fit",
    category: "Fitness",
    description: "Landing energica con corsi, abbonamenti e contatti diretti.",
    href: "https://demopalestra.vercel.app/",
    year: "2026",
  },
  {
    title: "Forno Antico",
    category: "Pizzeria",
    description: "Menù digitale e prenotazione tavolo, mobile-first.",
    href: "https://demopizzeria.vercel.app/",
    year: "2026",
  },
];
