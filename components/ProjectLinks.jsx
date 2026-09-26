const ProjectLinks = ({ project }) => (
  <p className="flex flex-wrap gap-x-6 gap-y-2">
    <a className="link" href={project.live}>
      Visit {project.name} demo
    </a>
    {project.repo && (
      <a className="link" href={project.repo}>
        Code on GitHub
      </a>
    )}
  </p>
);

export default ProjectLinks;
