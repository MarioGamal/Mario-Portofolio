import PageIntro from "@/components/PageIntro";
import { education, experience, languages, skills, socials } from "@/lib/content";

export const metadata = { title: "Resume" };

const Entries = ({ items }) => (
  <ol className="flex flex-col">
    {items.map((item) => (
      <li
        key={`${item.org}-${item.role}`}
        className="grid gap-1 border-t border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
      >
        <p className="text-sm text-muted sm:pt-1">{item.dates}</p>
        <div>
          <p className="font-semibold">{item.role}</p>
          <p className="text-muted">{item.org}</p>
          {item.note && <p className="mt-2 max-w-[56ch]">{item.note}</p>}
        </div>
      </li>
    ))}
  </ol>
);

const Section = ({ title, children }) => (
  <section className="grid gap-4 lg:grid-cols-12 lg:gap-10">
    <h2 className="h-section lg:col-span-3 lg:pt-5">{title}</h2>
    <div className="lg:col-span-9">{children}</div>
  </section>
);

const Resume = () => (
  <>
    <PageIntro title="Resume">
      Computer engineer turned front-end developer, with a background in systems integration.
    </PageIntro>

    <div className="container flex flex-col gap-16">
      <Section title="Experience">
        <Entries items={experience} />
      </Section>

      <Section title="Education">
        <Entries items={education} />
      </Section>

      <Section title="Skills">
        <dl className="flex flex-col">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-sm text-muted sm:pt-1">{s.group}</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
          <div className="grid gap-1 border-t border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="text-sm text-muted sm:pt-1">Languages</dt>
            <dd>{languages.join(", ")}</dd>
          </div>
        </dl>
      </Section>

      <Section title="Contact">
        <p className="border-t border-line pt-5">
          <a className="link" href={`mailto:${socials.email}`}>{socials.email}</a>, based in Sydney,
          available for freelance work.
        </p>
      </Section>
    </div>
  </>
);

export default Resume;
