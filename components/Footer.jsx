import { socials } from "@/lib/content";

const Footer = () => (
  <footer className="mt-24 border-t border-line">
    <div className="container flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between">
      <p>Mario Iskander, Sydney</p>
      <ul className="flex gap-6">
        <li><a className="hover:text-ink" href={socials.github}>GitHub</a></li>
        <li><a className="hover:text-ink" href={socials.linkedin}>LinkedIn</a></li>
        <li><a className="hover:text-ink" href={`mailto:${socials.email}`}>Email</a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
