// The one decision that defines a project (its AI feature, or its cost brief).
const Highlight = ({ highlight, as: Heading = "h4" }) => (
  <div className="border-l-2 border-accent pl-4">
    <Heading className="font-semibold">{highlight.title}</Heading>
    <p className="mt-1 max-w-[60ch] text-muted">{highlight.body}</p>
  </div>
);

export default Highlight;
