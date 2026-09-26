"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";

const palette = (slug) => projects.find((p) => p.slug === slug).palette;

// Short replays of two AI features from real projects. Each scene is a
// list of timed steps; the component only ever moves forward through them.
const scenes = [
  {
    id: "makaan",
    tab: "Makaan assistant",
    palette: palette("makaan"),
    summary:
      "Makaan assistant: someone asks for a 2-bedroom apartment to rent in Maadi under 40,000 EGP, and the assistant turns it into the filters Rent, Maadi, 2 bedrooms and up to 40,000 EGP.",
    prompt: "A 2-bedroom apartment to rent in Maadi, under 40k",
    working: "Thinking…",
    chips: ["Rent", "Maadi", "2 bedrooms", "Up to 40,000 EGP"],
    result: "Filters applied. Matching homes are pinned on the map.",
  },
  {
    id: "radlaunchpad",
    tab: "RadLaunchPad marking",
    palette: palette("radlaunchpad"),
    summary:
      "RadLaunchPad marking: a trainee reports a chest X-ray as bilateral hilar lymphadenopathy with reticular change, likely sarcoidosis. Claude awards 2 of 3 marks and says to name the Scadding stage for full marks.",
    context: "Chest X-ray. 58-year-old with progressive breathlessness.",
    prompt: "Bilateral hilar lymphadenopathy with reticular change. Likely sarcoidosis.",
    working: "Marking against the rubric…",
    score: { awarded: 2, max: 3 },
    result: "Correct findings and diagnosis. Name the stage (Scadding II) for full marks.",
  },
];

const TYPE_MS = 32;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AiReplay = () => {
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  // typed: characters of the prompt shown; phase: typing → working → done
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState("typing");
  const [revealed, setRevealed] = useState(0);
  const autoplay = useRef(true);
  const scene = scenes[index];

  useEffect(() => {
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    if (reducedMotion()) {
      setTyped(scene.prompt.length);
      setPhase("done");
      setRevealed(99);
      return;
    }

    setTyped(0);
    setPhase("typing");
    setRevealed(0);

    let t = 400;
    for (let i = 1; i <= scene.prompt.length; i++) {
      at(t, () => setTyped(i));
      t += TYPE_MS;
    }
    at(t + 250, () => setPhase("working"));
    t += 1300;
    at(t, () => setPhase("done"));
    const steps = scene.chips ? scene.chips.length + 1 : 2;
    for (let i = 1; i <= steps; i++) at(t + i * 180, () => setRevealed(i));
    t += steps * 180;

    // After the first scene, play the second once, then stop.
    if (autoplay.current && index === 0) {
      at(t + 2600, () => {
        setIndex(1);
        setRun((r) => r + 1);
      });
    } else {
      autoplay.current = false;
    }

    return () => timers.forEach(clearTimeout);
  }, [index, run, scene]);

  const choose = (i) => {
    autoplay.current = false;
    setIndex(i);
    setRun((r) => r + 1);
  };

  return (
    <figure className="flex flex-col gap-3">
      <div role="tablist" aria-label="AI feature replays" className="flex gap-1 text-sm">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            type="button"
            aria-selected={i === index}
            onClick={() => choose(i)}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              i === index ? "bg-ink text-bg" : "text-muted hover:text-ink"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div
        className="panel relative rounded-[6px] p-4 transition-[background-color] duration-500 sm:p-6"
        style={{ "--panel-light": scene.palette.light, "--panel-dark": scene.palette.dark }}
      >
        <p className="sr-only">{scene.summary}</p>

        <div aria-hidden="true" className="flex min-h-[17rem] flex-col gap-4 rounded-[4px] bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,.08),0_14px_36px_-16px_rgba(0,0,0,.35)]">
          {scene.context && <p className="text-sm text-muted">{scene.context}</p>}

          <p className="min-h-[3.2em] rounded-[4px] border border-line bg-bg px-3.5 py-2.5">
            {scene.prompt.slice(0, typed)}
            {phase === "typing" && <span className="caret" />}
          </p>

          <p className={`text-sm text-muted transition-opacity duration-300 ${phase === "working" ? "opacity-100" : "opacity-0"} ${phase === "done" ? "hidden" : ""}`}>
            <span className="pulse-dot" /> {scene.working}
          </p>

          {phase === "done" && scene.chips && (
            <>
              <ul className="flex flex-wrap gap-2">
                {scene.chips.map((chip, i) => (
                  <li
                    key={chip}
                    className={`pop rounded-full border border-line bg-bg px-3 py-1 text-sm ${revealed > i ? "is-in" : ""}`}
                  >
                    {chip}
                  </li>
                ))}
              </ul>
              <p className={`pop text-sm text-muted ${revealed > scene.chips.length ? "is-in" : ""}`}>{scene.result}</p>
            </>
          )}

          {phase === "done" && scene.score && (
            <>
              <div className={`pop ${revealed >= 1 ? "is-in" : ""}`}>
                <p className="flex items-baseline gap-2">
                  <span className="text-xl font-[760] wide">
                    {scene.score.awarded} / {scene.score.max}
                  </span>
                  <span className="text-sm text-muted">marks</span>
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
                    style={{ width: revealed >= 1 ? `${(scene.score.awarded / scene.score.max) * 100}%` : "0%" }}
                  />
                </div>
              </div>
              <p className={`pop text-sm ${revealed >= 2 ? "is-in" : ""}`}>{scene.result}</p>
            </>
          )}
        </div>
      </div>

      <figcaption className="flex items-center justify-between gap-4 text-sm text-muted">
        <span>Replays of AI features from my projects.</span>
        <button type="button" onClick={() => choose(index)} className="shrink-0 underline underline-offset-4 hover:text-ink">
          Replay
        </button>
      </figcaption>
    </figure>
  );
};

export default AiReplay;
