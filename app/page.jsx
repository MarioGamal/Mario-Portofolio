import Link from "next/link";

import AiReplay from "@/components/AiReplay";
import Highlight from "@/components/Highlight";
import ProjectPanel from "@/components/ProjectPanel";
import ProjectLinks from "@/components/ProjectLinks";
import { projects } from "@/lib/content";

const Home = () => {
  return (
    <>
      <section className="container grid items-center gap-12 pb-20 pt-8 lg:grid-cols-12 lg:gap-10 xl:pb-28 xl:pt-16">
        <div className="lg:col-span-7">
          <h1 className="h-hero max-w-[18ch] rise">
            I build web apps that solve real problems, and put AI to work inside them.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg text-muted rise" style={{ "--d": "120ms" }}>
            Front-end developer in Sydney. Recently: an exam platform where Claude marks trainees&rsquo;
            reports, a Cairo property marketplace with a search assistant, and an ordering site that
            costs nothing to run.
          </p>
          <p className="mt-8 flex flex-wrap items-center gap-6 rise" style={{ "--d": "220ms" }}>
            <Link href="/work" className="btn">
              See the work
            </Link>
            <Link href="/contact" className="link">
              Start a conversation
            </Link>
          </p>
        </div>
        <div className="lg:col-span-5 rise" style={{ "--d": "320ms" }}>
          <AiReplay />
        </div>
      </section>

      <section aria-labelledby="work-heading" className="container">
        <h2 id="work-heading" className="sr-only">
          Recent work
        </h2>
        <ul className="flex flex-col gap-20 xl:gap-28">
          {projects.map((project) => (
            <li key={project.slug} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4 lg:pt-2">
                <h3 className="h-section">{project.name}</h3>
                <p className="mt-2 text-lg">{project.summary}</p>
                <div className="mt-5">
                  <Highlight highlight={project.highlight} />
                </div>
                <p className="mt-5 text-sm text-muted">{project.stack.join(", ")}</p>
                <div className="mt-5">
                  <ProjectLinks project={project} />
                </div>
              </div>
              <div className="lg:col-span-8">
                <ProjectPanel project={project} count={2} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container mt-24 grid gap-6 border-t border-line pt-10 lg:grid-cols-12">
        <h2 className="h-section lg:col-span-4">Before this</h2>
        <div className="lg:col-span-8">
          <p className="max-w-[60ch] text-lg">
            I worked as an integration consultant, connecting enterprise systems through APIs and
            middleware so data moves reliably between them. Alongside that, I built websites and
            front ends as a freelance developer. It&rsquo;s why I&rsquo;m as comfortable with the
            services behind a screen as with the screen itself.
          </p>
          <p className="mt-5 flex flex-wrap gap-6">
            <Link href="/resume" className="link">Read my resume</Link>
            <Link href="/contact" className="link">Get in touch</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
