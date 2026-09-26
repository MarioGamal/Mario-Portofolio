import PageIntro from "@/components/PageIntro";
import ProjectPanel from "@/components/ProjectPanel";
import ProjectLinks from "@/components/ProjectLinks";
import Highlight from "@/components/Highlight";
import { projects } from "@/lib/content";

export const metadata = { title: "Work" };

const Work = () => (
  <>
    <PageIntro title="Work">
      Three products I designed and built recently. Two put AI to work for their users; one had to cost nothing to run.
    </PageIntro>

    <div className="container flex flex-col gap-24 xl:gap-32">
      {projects.map((project, i) => (
        <article key={project.slug} id={project.slug} className="scroll-mt-8">
          <ProjectPanel project={project} count={2} priority={i === 0} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="h-page">{project.name}</h2>
              <p className="mt-3 text-lg">{project.summary}</p>
              <div className="mt-5">
                <ProjectLinks project={project} />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-[62ch]">{project.description}</p>
              <div className="mt-8">
                <Highlight highlight={project.highlight} as="h3" />
              </div>
              <h3 className="mt-8 font-semibold">What I built</h3>
              <ul className="mt-3 flex flex-col gap-2 border-l-2 border-line pl-5 text-muted">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <h3 className="mt-8 font-semibold">Built with</h3>
              <p className="mt-2 text-muted">{project.stack.join(", ")}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </>
);

export default Work;
