import { format } from "date-fns";
import Bear from "~/components/apps/Bear";
import { user } from "~/configs";

export default function MobileHome() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const dark = useStore((state) => state.dark);

  useInterval(() => setNow(new Date()), 60_000);

  useEffect(() => {
    if (!profileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [profileOpen]);

  return (
    <div className={`ios-home mac-wallpaper ${dark ? "mac-wallpaper-dark" : ""}`}>
      <div className="ios-status" aria-label={`Time ${format(now, "h:mm")}`}>
        <strong>{format(now, "h:mm")}</strong>
        <div className="ios-status-signals" aria-hidden="true">
          <span className="i-material-symbols:signal-cellular-alt" />
          <span className="i-material-symbols:wifi" />
          <span className="ios-battery" />
        </div>
      </div>

      <main className="ios-home-content">
        <p className="ios-home-label">ANAS DADI</p>
        <h1>
          Cloud platforms.
          <br />
          Built to last.
        </h1>
        <p className="ios-home-subtitle">DevSecOps · SRE · Cloud architecture</p>

        <button
          className="ios-profile-widget"
          type="button"
          onClick={() => setProfileOpen(true)}
        >
          <div className="ios-widget-top">
            <img src={user.avatar} alt="" />
            <span>PROFILE</span>
          </div>
          <strong>Hi, I’m Anas.</strong>
          <p>
            I design and operate reliable cloud systems across Kubernetes, automation and
            security.
          </p>
          <span className="ios-widget-action">
            View experience <span aria-hidden="true">↗</span>
          </span>
        </button>

        <div className="ios-app-grid" aria-label="Portfolio apps">
          <button type="button" onClick={() => setProfileOpen(true)}>
            <span className="ios-app-icon">
              <img src={user.avatar} alt="" />
            </span>
            <span>Profile</span>
          </button>
          <a href="/resume.pdf?v=2026-10-12" target="_blank" rel="noopener noreferrer">
            <span className="ios-app-icon">
              <img src="img/icons/resume.svg" alt="" />
            </span>
            <span>Résumé</span>
          </a>
          <a href="https://github.com/DadiAnas" target="_blank" rel="noopener noreferrer">
            <span className="ios-app-icon">
              <img src="img/icons/github.png" alt="" />
            </span>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/dadianas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ios-app-icon">
              <img src="img/icons/launchpad/linkedin.png" alt="" />
            </span>
            <span>LinkedIn</span>
          </a>
        </div>
      </main>

      <nav className="ios-dock" aria-label="Quick contact">
        <a href="mailto:dadi.anas@hotmail.fr" aria-label="Email Anas">
          <img src="img/icons/contact-mail.svg" alt="" />
        </a>
        <a href="tel:+33681421585" aria-label="Call Anas" className="ios-phone-icon">
          <span aria-hidden="true">☎</span>
        </a>
        <a
          href="/resume.pdf?v=2026-10-12"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open résumé"
        >
          <img src="img/icons/resume.svg" alt="" />
        </a>
      </nav>
      <div className="ios-home-indicator" aria-hidden="true" />

      {profileOpen && (
        <section
          className="ios-profile-app"
          role="dialog"
          aria-modal="true"
          aria-label="Anas Dadi profile"
        >
          <header>
            <button
              type="button"
              onClick={() => setProfileOpen(false)}
              aria-label="Close profile"
            >
              Done
            </button>
            <strong>Profile</strong>
            <span />
          </header>
          <Bear />
        </section>
      )}
    </div>
  );
}
