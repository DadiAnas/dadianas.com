import { format } from "date-fns";
import Profile from "~/components/apps/Profile";
import {
  experiences,
  resumeUrl,
  type ExperienceTopic,
  type ProfileTab
} from "~/configs/profile";
import { user } from "~/configs";

export default function MobileHome() {
  const [profileView, setProfileView] = useState<{
    tab: ProfileTab;
    topic?: ExperienceTopic;
  } | null>(null);
  const [now, setNow] = useState(new Date());
  const dark = useStore((state) => state.dark);
  const openProfile = (tab: ProfileTab, topic?: ExperienceTopic) =>
    setProfileView({ tab, topic });

  useInterval(() => setNow(new Date()), 60_000);
  useEffect(() => {
    if (!profileView) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileView(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [profileView]);

  return (
    <div className={`ios-home mac-wallpaper ${dark ? "mac-wallpaper-dark" : ""}`}>
      <div className="ios-dynamic-island" aria-hidden="true" />
      <div className="ios-status">
        <strong>{format(now, "h:mm")}</strong>
        <div className="ios-status-signals" aria-hidden="true">
          <span className="i-material-symbols:signal-cellular-alt" />
          <span className="i-material-symbols:wifi" />
          <span className="ios-battery" />
        </div>
      </div>

      <main className="ios-home-content ios-home-v2">
        <div className="ios-home-heading">
          <span>PORTFOLIO · PARIS</span>
          <strong>Anas Dadi</strong>
        </div>
        <div className="ios-widget-grid">
          <button
            className="ios-profile-widget"
            type="button"
            onClick={() => openProfile("overview")}
          >
            <img src={user.avatar} alt="" />
            <span>ABOUT ANAS</span>
            <strong>
              Cloud architect
              <br />& SRE
            </strong>
            <small>BNP Paribas · Paris</small>
            <em>Open profile ↗</em>
          </button>
          <button
            className="ios-career-widget"
            type="button"
            onClick={() => openProfile("experience")}
          >
            <span>EXPERIENCE</span>
            <strong>
              {experiences.length} <small>roles</small>
            </strong>
            <p>
              Since 2019
              <br />
              Cloud · SRE · Data
            </p>
            <em>Explore timeline ↗</em>
          </button>
        </div>

        <div className="ios-app-grid" role="group" aria-label="Portfolio apps">
          <button type="button" onClick={() => openProfile("overview")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/finder.svg" alt="" />
            </span>
            <span>About</span>
          </button>
          <button type="button" onClick={() => openProfile("experience")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/work.svg" alt="" />
            </span>
            <span>Experience</span>
          </button>
          <button type="button" onClick={() => openProfile("expertise")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/skills.svg" alt="" />
            </span>
            <span>Expertise</span>
          </button>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <span className="ios-app-icon">
              <img src="img/icons/resume.svg" alt="" />
            </span>
            <span>Résumé</span>
          </a>
          <button type="button" onClick={() => openProfile("education")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/education.svg" alt="" />
            </span>
            <span>Education</span>
          </button>
          <button type="button" onClick={() => openProfile("contact")}>
            <span className="ios-app-icon">
              <img src="img/icons/contact-mail.svg" alt="" />
            </span>
            <span>Contact</span>
          </button>
          <a href="https://github.com/DadiAnas" target="_blank" rel="noopener noreferrer">
            <span className="ios-app-icon">
              <img src="img/icons/system/github.svg" alt="" />
            </span>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/dadianas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ios-app-icon">
              <img src="img/icons/system/linkedin.svg" alt="" />
            </span>
            <span>LinkedIn</span>
          </a>
          <button type="button" onClick={() => openProfile("experience", "Cloud")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/cloud.svg" alt="" />
            </span>
            <span>Cloud</span>
          </button>
          <button type="button" onClick={() => openProfile("experience", "Reliability")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/reliability.svg" alt="" />
            </span>
            <span>SRE</span>
          </button>
          <button type="button" onClick={() => openProfile("experience", "Security")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/security.svg" alt="" />
            </span>
            <span>Security</span>
          </button>
          <button type="button" onClick={() => openProfile("experience", "Data & AI")}>
            <span className="ios-app-icon">
              <img src="img/icons/system/data.svg" alt="" />
            </span>
            <span>Data & AI</span>
          </button>
        </div>
        <button
          type="button"
          className="ios-search-pill"
          onClick={() => openProfile("experience")}
        >
          <span className="i-lucide:search" aria-hidden="true" /> Search experience
        </button>
      </main>

      <nav className="ios-dock" aria-label="Quick contact">
        <button
          type="button"
          onClick={() => openProfile("overview")}
          aria-label="Open profile"
        >
          <img src="img/icons/system/finder.svg" alt="" />
        </button>
        <a href="tel:+33681421585" aria-label="Call Anas">
          <img src="img/icons/system/phone.svg" alt="" />
        </a>
        <a href="mailto:dadi.anas@hotmail.fr" aria-label="Email Anas">
          <img src="img/icons/contact-mail.svg" alt="" />
        </a>
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open résumé"
        >
          <img src="img/icons/resume.svg" alt="" />
        </a>
      </nav>
      <div className="ios-home-indicator" aria-hidden="true" />

      {profileView && (
        <section
          className="ios-profile-app"
          role="dialog"
          aria-modal="true"
          aria-label="Anas Dadi profile"
        >
          <header>
            <button
              type="button"
              onClick={() => setProfileView(null)}
              aria-label="Return to home"
            >
              <span aria-hidden="true">‹</span> Home
            </button>
            <strong>About Anas</strong>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              CV ↗
            </a>
          </header>
          <Profile
            key={`${profileView.tab}-${profileView.topic ?? "all"}`}
            initialTab={profileView.tab}
            initialTopic={profileView.topic}
          />
        </section>
      )}
    </div>
  );
}
