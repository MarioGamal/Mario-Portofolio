const PageIntro = ({ title, children }) => (
  <header className="container pb-12 pt-8 xl:pb-16 xl:pt-14">
    <h1 className="h-page max-w-[22ch]">{title}</h1>
    {children && <p className="mt-4 max-w-[56ch] text-lg text-muted">{children}</p>}
  </header>
);

export default PageIntro;
