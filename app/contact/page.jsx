import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/PageIntro";
import { socials } from "@/lib/content";

export const metadata = { title: "Contact" };

const channels = [
  { label: "Email", value: socials.email, href: `mailto:${socials.email}` },
  { label: "LinkedIn", value: "in/marioiskandar", href: socials.linkedin },
  { label: "GitHub", value: "MarioGamal", href: socials.github },
];

const Contact = () => (
  <>
    <PageIntro title="Let's talk about your project">
      Tell me what you&rsquo;re building, who it&rsquo;s for and when you need it. The message goes
      straight to my inbox.
    </PageIntro>

    <div className="container grid gap-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <ContactForm />
      </div>

      <aside className="lg:col-span-4 lg:col-start-9">
        <h2 className="font-semibold">Or reach me directly</h2>
        <dl className="mt-4">
          {channels.map((c) => (
            <div key={c.label} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line py-4">
              <dt className="text-muted">{c.label}</dt>
              <dd className="min-w-0">
                <a className="hover:text-accent" href={c.href}>
                  {/* Wrap long addresses at the @, not mid-word. */}
                  {c.value.includes("@") ? (
                    <>
                      {c.value.split("@")[0]}
                      <wbr />@{c.value.split("@")[1]}
                    </>
                  ) : (
                    c.value
                  )}
                </a>
              </dd>
            </div>
          ))}
          <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line py-4">
            <dt className="text-muted">Based in</dt>
            <dd>Sydney, Australia</dd>
          </div>
        </dl>
      </aside>
    </div>
  </>
);

export default Contact;
