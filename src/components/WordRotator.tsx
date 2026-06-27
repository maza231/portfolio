"use client";

import { useEffect, useState } from "react";

/**
 * Mostra una parola alla volta da una lista, alternandole con una
 * leggera dissolvenza. Usato per dare vita al titolo dell'hero.
 */
export default function WordRotator({
  words,
  interval = 2400,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (words.length <= 1) return;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 350);
    }, interval);

    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <em
      className={`italic transition-all duration-300 ${
        visible ? "opacity-100 blur-0" : "opacity-0 blur-[2px]"
      } ${className}`}
    >
      {words[index]}
    </em>
  );
}
