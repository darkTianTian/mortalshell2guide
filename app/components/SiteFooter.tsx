import FeedbackLink from "./FeedbackLink";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="wordmark" href="/" aria-label="Shellbound home">
        <span className="sigil" aria-hidden="true">II</span>
        <span className="wordmark-copy">
          <strong>Mortal Shell II</strong>
          <small>Shellbound field guide</small>
        </span>
      </a>

      <p className="site-footer-legal">
        An independent fan-made guide. Game names and official imagery belong to
        Cold Symmetry and Playstack; all rights remain with their respective owners.
      </p>

      <div className="site-footer-feedback">
        <span>Corrections &amp; feedback</span>
        <p>
          The email draft includes this page and asks for the exact item, current
          value, correction, and supporting source.
        </p>
        <FeedbackLink className="site-footer-feedback-link">
          feedback@mortalshell2guide.org ↗
        </FeedbackLink>
      </div>
    </footer>
  );
}
