import Image from "next/image";

// Screenshot(s) framed on the project's own color. With two images the
// second overlaps the first, so a visitor sees two screens of the product.
const ProjectPanel = ({ project, count = 1, priority = false }) => {
  const [first, second] = project.images;
  const showSecond = count > 1 && second;

  return (
    <div
      className="panel relative overflow-hidden rounded-[6px] p-4 sm:p-8"
      style={{ "--panel-light": project.palette.light, "--panel-dark": project.palette.dark }}
    >
      <div className={`relative ${showSecond ? "w-[88%]" : "w-full"}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] shadow-[0_1px_2px_rgba(0,0,0,.12),0_12px_32px_-12px_rgba(0,0,0,.35)]">
          <Image
            src={first.src}
            alt={first.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
      {showSecond && (
        <div className="drift relative -mt-[18%] ml-auto w-[58%]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] shadow-[0_1px_2px_rgba(0,0,0,.12),0_16px_40px_-12px_rgba(0,0,0,.45)]">
            <Image
              src={second.src}
              alt={second.alt}
              fill
              sizes="(min-width: 1024px) 480px, 60vw"
              className="object-cover object-left-top"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPanel;
