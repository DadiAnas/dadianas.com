import { format } from "date-fns";
import Profile from "~/components/apps/Profile";
import {
  experiences,
  resumeUrl,
  type ExperienceTopic,
  type ProfileTab
} from "~/configs/profile";
import { user } from "~/configs";

const homeCopy = {
  en: {
    about: "ABOUT ANAS",
    title: "Cloud architect",
    open: "Open profile ↗",
    roles: "roles",
    since: "Since 2019",
    timeline: "Explore timeline ↗",
    aboutApp: "About",
    experience: "Experience",
    education: "Education",
    security: "Security",
    search: "Search experience",
    openProfile: "Open profile",
    back: "Home",
    returnHome: "Return to home"
  },
  fr: {
    about: "À PROPOS D’ANAS",
    title: "Architecte cloud",
    open: "Voir le profil ↗",
    roles: "missions",
    since: "Depuis 2019",
    timeline: "Voir le parcours ↗",
    aboutApp: "Profil",
    experience: "Parcours",
    education: "Formation",
    security: "Sécurité",
    search: "Rechercher une expérience",
    openProfile: "Ouvrir le profil",
    back: "Accueil",
    returnHome: "Retour à l’accueil"
  }
};

export default function MobileHome() {
  const [homePage, setHomePage] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [profileView, setProfileView] = useState<{
    tab: ProfileTab;
    topic?: ExperienceTopic;
    query?: string;
  } | null>(null);
  const [now, setNow] = useState(new Date());
  const dark = useStore((state) => state.dark);
  const french = useStore((state) => state.french);
  const toggleFrench = useStore((state) => state.toggleFrench);
  const text = french ? homeCopy.fr : homeCopy.en;
  const openProfile = (tab: ProfileTab, topic?: ExperienceTopic, query?: string) =>
    setProfileView({ tab, topic, query });
  const swipeHome = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4)
      setHomePage(dx < 0 ? 1 : 0);
  };

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

      <main
        className="ios-home-content ios-home-v2"
        onTouchStart={(event) => {
          touchStart.current = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
          };
        }}
        onTouchEnd={swipeHome}
      >
        {homePage === 0 ? (
          <>
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
                <span>{text.about}</span>
                <strong>
                  {text.title}
                  <br />& SRE
                </strong>
                <small>BNP Paribas · Paris</small>
                <em>{text.open}</em>
              </button>
              <button
                className="ios-career-widget"
                type="button"
                onClick={() => openProfile("experience")}
              >
                <span>{text.experience.toUpperCase()}</span>
                <strong>
                  {experiences.length} <small>{text.roles}</small>
                </strong>
                <p>
                  {text.since}
                  <br />
                  {french ? "Cloud · SRE · Données" : "Cloud · SRE · Data"}
                </p>
                <em>{text.timeline}</em>
              </button>
            </div>

            <div
              className="ios-app-grid"
              role="group"
              aria-label={french ? "Applications du portfolio" : "Portfolio apps"}
            >
              <button type="button" onClick={() => openProfile("overview")}>
                <span className="ios-app-icon">
                  <img src="img/icons/system/finder.svg" alt="" />
                </span>
                <span>{text.aboutApp}</span>
              </button>
              <button type="button" onClick={() => openProfile("experience")}>
                <span className="ios-app-icon">
                  <img src="img/icons/system/work.svg" alt="" />
                </span>
                <span>{text.experience}</span>
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
                  <img src="img/icons/system/education.svg?v=2" alt="" />
                </span>
                <span>{text.education}</span>
              </button>
              <button type="button" onClick={() => openProfile("contact")}>
                <span className="ios-app-icon">
                  <img src="img/icons/contact-mail.svg" alt="" />
                </span>
                <span>Contact</span>
              </button>
              <a
                href="https://github.com/DadiAnas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ios-app-icon">
                  <img src="img/icons/system/github.svg?v=2" alt="" />
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
              <button
                type="button"
                onClick={() => openProfile("experience", "Reliability")}
              >
                <span className="ios-app-icon">
                  <img src="img/icons/system/reliability.svg" alt="" />
                </span>
                <span>SRE</span>
              </button>
              <button type="button" onClick={() => openProfile("experience", "Security")}>
                <span className="ios-app-icon">
                  <img src="img/icons/system/security.svg" alt="" />
                </span>
                <span>{text.security}</span>
              </button>
              <button
                type="button"
                onClick={() => openProfile("experience", "Data & AI")}
              >
                <span className="ios-app-icon">
                  <img src="img/icons/system/data.svg" alt="" />
                </span>
                <span>{french ? "Données et IA" : "Data & AI"}</span>
              </button>
            </div>
            <button
              type="button"
              className="ios-search-pill"
              onClick={() => openProfile("experience")}
            >
              <span className="i-lucide:search" aria-hidden="true" /> {text.search}
            </button>
          </>
        ) : (
          <section className="ios-work-page">
            <div className="ios-home-heading">
              <span>{french ? "PARCOURS · PARIS" : "EXPERIENCE · PARIS"}</span>
              <strong>Anas Dadi</strong>
            </div>
            <div className="ios-work-intro">
              <span>{french ? "DEPUIS 2019" : "SINCE 2019"}</span>
              <h1>
                {french
                  ? "Des systèmes à grande échelle, en production."
                  : "Building and running systems at scale."}
              </h1>
              <p>
                {french
                  ? "Cloud, SRE, DevSecOps et ingénierie des données : découvrez les missions et technologies derrière mon parcours."
                  : "Cloud, SRE, DevSecOps and data engineering: explore the work and technologies across these roles."}
              </p>
            </div>
            <div className="ios-work-list">
              {experiences
                .filter((experience) => experience.kind === "Professional")
                .map((experience) => (
                  <button
                    key={experience.id}
                    type="button"
                    onClick={() =>
                      openProfile("experience", undefined, experience.company)
                    }
                  >
                    <small>{french ? experience.fr.period : experience.period}</small>
                    <strong>{experience.company}</strong>
                    <span>{french ? experience.fr.role : experience.role}</span>
                    <span className="i-lucide:chevron-right" aria-hidden="true" />
                  </button>
                ))}
            </div>
            <div className="ios-work-actions">
              <button type="button" onClick={() => openProfile("experience")}>
                {french ? "Explorer les 8 expériences" : "Explore all 8 roles"} →
              </button>
              <button type="button" onClick={() => openProfile("expertise")}>
                {french ? "Voir les compétences" : "Explore the toolkit"} →
              </button>
            </div>
          </section>
        )}
      </main>

      <div
        className="ios-page-dots"
        role="group"
        aria-label={french ? "Pages d’accueil" : "Home pages"}
      >
        {[0, 1].map((page) => (
          <button
            key={page}
            type="button"
            aria-label={french ? `Page ${page + 1}` : `Page ${page + 1}`}
            aria-current={homePage === page ? "page" : undefined}
            onClick={() => setHomePage(page)}
          />
        ))}
      </div>

      <nav className="ios-dock" aria-label={french ? "Accès rapide" : "Quick contact"}>
        <button
          type="button"
          onClick={() => openProfile("overview")}
          aria-label={text.openProfile}
        >
          <img src="img/icons/system/finder.svg" alt="" />
        </button>
        <a href="tel:+33681421585" aria-label={french ? "Appeler Anas" : "Call Anas"}>
          <img src="img/icons/system/phone.svg" alt="" />
        </a>
        <a
          href="mailto:dadi.anas@hotmail.fr"
          aria-label={french ? "Écrire à Anas" : "Email Anas"}
        >
          <img src="img/icons/contact-mail.svg" alt="" />
        </a>
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={french ? "Ouvrir le CV" : "Open résumé"}
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
          aria-label={french ? "Profil d’Anas Dadi" : "Anas Dadi profile"}
        >
          <div className="ios-dynamic-island" aria-hidden="true" />
          <div className="ios-status ios-profile-status">
            <strong>{format(now, "h:mm")}</strong>
            <div className="ios-status-signals" aria-hidden="true">
              <span className="i-material-symbols:signal-cellular-alt" />
              <span className="i-material-symbols:wifi" />
              <span className="ios-battery" />
            </div>
          </div>
          <header>
            <button
              type="button"
              onClick={() => setProfileView(null)}
              aria-label={text.returnHome}
            >
              <span aria-hidden="true">‹</span> {text.back}
            </button>
            <strong>
              {
                (
                  {
                    overview: french ? "À propos" : "About",
                    experience: french ? "Parcours" : "Experience",
                    expertise: french ? "Compétences" : "Expertise",
                    education: french ? "Formation" : "Education",
                    contact: "Contact"
                  } as Record<ProfileTab, string>
                )[profileView.tab]
              }
            </strong>
            <div className="ios-profile-header-actions">
              <button
                type="button"
                onClick={toggleFrench}
                aria-label={french ? "Switch to English" : "Passer en français"}
              >
                {french ? "EN" : "FR"}
              </button>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                CV ↗
              </a>
            </div>
          </header>
          <Profile
            initialTab={profileView.tab}
            initialTopic={profileView.topic}
            initialQuery={profileView.query}
            onTabChange={(tab) =>
              setProfileView((current) => (current ? { ...current, tab } : current))
            }
          />
          <div className="ios-home-indicator" aria-hidden="true" />
        </section>
      )}
    </div>
  );
}
