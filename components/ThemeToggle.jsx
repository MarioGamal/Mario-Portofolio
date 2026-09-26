"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const options = [
  { value: "light", label: "Light theme", icon: FiSun },
  { value: "dark", label: "Dark theme", icon: FiMoon },
  { value: "system", label: "Match system theme", icon: FiMonitor },
];

const resolve = (choice) =>
  choice === "dark" ||
  (choice === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light";

const apply = (choice) => {
  document.documentElement.dataset.theme = resolve(choice);
};

const ThemeToggle = () => {
  // null until mounted, so the server render never guesses the saved choice.
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    let saved = "system";
    try {
      saved = localStorage.getItem("theme") || "system";
    } catch {}
    setChoice(saved);
  }, []);

  useEffect(() => {
    if (choice !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [choice]);

  const select = (value, event) => {
    setChoice(value);
    const root = document.documentElement;
    const canAnimate =
      root.dataset.theme !== resolve(value) &&
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (canAnimate) {
      // Grow the new theme outward from the pressed button.
      const r = event.currentTarget.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      root.style.setProperty("--vt-x", `${x}px`);
      root.style.setProperty("--vt-y", `${y}px`);
      root.style.setProperty(
        "--vt-r",
        `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`
      );
      const transition = document.startViewTransition(() => apply(value));
      // The browser can skip the animation (e.g. hidden tab); the theme still applies.
      transition.ready.catch(() => {});
    } else {
      apply(value);
    }

    try {
      value === "system" ? localStorage.removeItem("theme") : localStorage.setItem("theme", value);
    } catch {}
  };

  return (
    <div role="radiogroup" aria-label="Theme" className="flex rounded-full border border-line p-0.5">
      {options.map(({ value, label, icon: Icon }) => {
        const active = choice === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={(e) => select(value, e)}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
              active ? "bg-ink text-bg" : "text-muted hover:text-ink"
            }`}
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
