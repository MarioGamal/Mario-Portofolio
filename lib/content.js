// All site copy lives here so pages stay layout-only.

export const socials = {
  github: "https://github.com/MarioGamal",
  linkedin: "https://www.linkedin.com/in/marioiskandar",
  email: "mario.iskander0@gmail.com",
};

// Each project carries its own palette; the site frame stays neutral
// and lets the work bring the color.
export const projects = [
  {
    slug: "radlaunchpad",
    name: "RadLaunchPad",
    summary: "Exam practice for radiology trainees, marked by AI.",
    description:
      "A subscription study platform for trainees sitting the RANZCR Part 2 written exam. Trainees practise multiple-choice questions and write free-text reports on real cases, then track streaks, accuracy and progress across ten subspecialties.",
    highlight: {
      title: "AI marking",
      body: "Trainees type a report the way they would in the exam. Claude marks it against a marking rubric and model answer, and returns a score and short feedback within seconds. If marking fails, the answer is kept and can be re-marked with one tap. The question bank itself was generated with Claude from curated study notes and reference articles.",
    },
    features: [
      "Claude marks free-text short-case reports against a rubric, with validated structured output",
      "An original question bank generated with Claude",
      "Seven practice modes, from quick mixed sets to full exam-style sessions",
      "Stripe subscriptions with free, Unlimited and Ultra tiers",
      "Google and email sign-in, study-reminder emails, and an admin area",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Claude API", "Supabase", "Stripe", "Vercel"],
    live: "https://radlaunchpad.com",
    repo: null,
    images: [
      { src: "/assets/work/radlaunchpad-1.png", alt: "RadLaunchPad landing page: the headline 'Master the Radiology Written Exams' beside a sample multiple-choice question" },
      { src: "/assets/work/radlaunchpad-2.png", alt: "RadLaunchPad dashboard with streak and accuracy counters, practice session cards, and monthly progress by subspecialty" },
    ],
    palette: { light: "#D3E7E6", dark: "#13262B" },
  },
  {
    slug: "makaan",
    name: "Makaan",
    summary: "A map-first property marketplace for Cairo, with an AI search assistant.",
    description:
      "Cairo's rental and sale listings mostly live in Facebook groups and spam-heavy classifieds. Makaan puts verified listings on one interactive map, labels whether a seller is the owner or an agent, and shows approximate pins so owners' exact addresses stay private.",
    highlight: {
      title: "AI search assistant",
      body: "Instead of filling in filters, people can ask in plain English or Arabic, for example \u201can apartment to rent in Maadi\u201d. The assistant turns the request into area, budget and bedroom filters, suggests matching homes from published listings, and answers questions about how the site works. It's rate-limited and labels every reply as automated.",
    },
    features: [
      "Bilingual AI assistant that turns plain-language requests into search filters",
      "Interactive Mapbox map with price pins and buy/rent filters",
      "Full Arabic and English, including right-to-left layout",
      "Owner and agent labels on every listing",
      "Light, dark and system themes",
    ],
    stack: ["Next.js", "React", "AI assistant", "Mapbox", "Vercel"],
    live: "https://makaan-zeta.vercel.app/",
    repo: "https://github.com/MarioGamal/Makaan",
    images: [
      { src: "/assets/work/makaan-1.png", alt: "Makaan home page: a search bar over a photo of Cairo villas, above a dark map of Cairo with listing prices pinned on it" },
      { src: "/assets/work/makaan-2.png", alt: "Makaan featured homes with prices, owner and agent labels, and a list of the platform's privacy features" },
    ],
    palette: { light: "#D8E6E0", dark: "#1B302A" },
  },
  {
    slug: "egyptian-village",
    name: "Egyptian Village",
    summary: "Ordering for a Sydney home kitchen, at $0 a month.",
    description:
      "A small business selling homemade Egyptian sweets and savoury food across Sydney. Customers browse the menu in English or Arabic, build a cart with notes for each item, and choose a pickup location and date. The owner confirms each order on WhatsApp, which matches how the kitchen already works.",
    highlight: {
      title: "$0 a month to run",
      body: "The brief was that the site could not add running costs, and that shaped every choice. There's no database: the menu, prices, pickup locations and availability live in Google Sheets, and the photos are in Google Drive, so the owner updates the site from tools they already use. Orders are written to a sheet and emailed to the owner. Hosting, email and spam protection all run on free tiers.",
    },
    features: [
      "Google Sheets as the database for menu, locations, availability and orders",
      "Menu photos stored in Google Drive",
      "Order emails through Resend, with SMTP as a fallback",
      "Rate limiting on orders to stop spam",
      "English and Arabic with right-to-left layout",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "Google Sheets API", "Google Drive", "Resend", "Upstash", "Vercel"],
    live: "https://egyptian-village.vercel.app/",
    repo: null,
    images: [
      { src: "/assets/work/egyptian-village-1.png", alt: "Egyptian Village home page with 'View menu' and 'Pickup locations' buttons and a four-step explanation of how ordering works" },
      { src: "/assets/work/egyptian-village-2.png", alt: "Egyptian Village cart with three desserts on the left and a checkout form with pickup location and date on the right" },
    ],
    palette: { light: "#EFE3C6", dark: "#33291A" },
  },
];

export const services = [
  {
    title: "Web apps, designed and built",
    body: "Dashboards, marketplaces and ordering flows, from layout and type through to deployment in Next.js and React, with light and dark themes and accessibility from the start.",
  },
  {
    title: "AI features",
    body: "Assistants, search and marking built on the Claude API, with structured output, rate limits and clear fallbacks when the model can't answer.",
  },
  {
    title: "Bilingual and right-to-left sites",
    body: "Arabic and English sites where the layout mirrors properly, the type is set for each script, and neither language feels like a translation.",
  },
  {
    title: "APIs and integrations",
    body: "Connecting a front end to payment providers, maps, messaging, CRMs or legacy systems. Several years as an integration consultant taught me the back end too.",
  },
];

export const experience = [
  {
    org: "Independent",
    role: "Front-end developer",
    dates: "2026",
    note: "Designed and built Makaan, RadLaunchPad and Egyptian Village.",
  },
  {
    org: "Telus Agriculture & Consumer Goods",
    role: "Integration consultant",
    dates: "June 2022 – present",
  },
  {
    org: "Inspire for Solutions",
    role: "Front-end developer, freelance",
    dates: "October 2021 – present",
  },
  {
    org: "Ejada",
    role: "Integration consultant",
    dates: "June 2022 – present",
  },
];

export const education = [
  {
    org: "Ain Shams University, Cairo",
    role: "Bachelor of Computer Engineering",
    dates: "2014 – 2019",
  },
  {
    org: "Online course",
    role: "Full-stack web development",
    dates: "2020",
  },
];

export const skills = [
  { group: "Front end", items: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Design", items: ["Figma", "Design systems", "Responsive layout", "Accessibility"] },
  { group: "Back end and integration", items: ["Node.js", "REST and SOAP APIs", "Mapbox", "Vercel"] },
];

export const languages = ["English", "Arabic", "French"];
