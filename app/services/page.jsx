import Link from "next/link";

import PageIntro from "@/components/PageIntro";
import { services } from "@/lib/content";

export const metadata = { title: "Services" };

const Services = () => (
  <>
    <PageIntro title="What I can build for you">
      I take on freelance projects and full-time roles. Most of my work is one of these.
    </PageIntro>

    <div className="container">
      <dl className="grid border-t border-line md:grid-cols-2">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`border-b border-line py-8 md:py-10 ${i % 2 === 0 ? "md:pr-10" : "md:border-l md:pl-10"}`}
          >
            <dt className="h-section">{s.title}</dt>
            <dd className="mt-3 max-w-[48ch] text-muted">{s.body}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 text-lg">
        Have something in mind?{" "}
        <Link href="/contact" className="link">
          Tell me about it
        </Link>
      </p>
    </div>
  </>
);

export default Services;
