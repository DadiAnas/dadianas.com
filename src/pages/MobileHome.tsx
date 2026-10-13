import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import Profile from "~/components/apps/Profile";
import { IOSControlCenter, IOSNotifications } from "~/components/menus/IOSPanels";
import { music } from "~/configs";
import { useAudio } from "~/hooks/useAudio";
import {
  experiences,
  expertise,
  groupIcons,
  resumeUrl,
  skillIcons,
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
    returnHome: "Retour à l’accueil"
  }
};

export default function MobileHome() {
  const [homePage, setHomePage] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const edgeTouchStart = useRef<{ x: number; y: number } | null>(null);
  const [topPanel, setTopPanel] = useState<"control" | "notifications" | null>(null);
  const [skillsSearch, setSkillsSearch] = useState("");
  const [profileView, setProfileView] = useState<{
    tab: ProfileTab;
    topic?: ExperienceTopic;
    skillQuery?: string;
  } | null>(null);
  const [now, setNow] = useState(new Date());
  const dark = useStore((state) => state.dark);
  const brightness = useStore((state) => state.brightness);
  const volume = useStore((state) => state.volume);
  const setVolume = useStore((state) => state.setVolume);
  const [, audioState, audioControls] = useAudio({ src: music.audio, autoReplay: true });
  const french = useStore((state) => state.french);
  const toggleFrench = useStore((state) => state.toggleFrench);
  const text = french ? homeCopy.fr : homeCopy.en;
  useEffect(() => audioControls.volume(volume / 100), [volume]);
  const openProfile = (tab: ProfileTab, topic?: ExperienceTopic, skillQuery?: string) =>
    setProfileView({ tab, topic, skillQuery });
  const swipeHome = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4)
      setHomePage((current) => Math.max(-1, Math.min(1, current + (dx < 0 ? 1 : -1))));
  };
  const swipeFromEdge = (event: React.TouchEvent) => {
    if (!edgeTouchStart.current) return;
    const { x, y } = edgeTouchStart.current;
    const dx = event.changedTouches[0].clientX - x;
    const dy = event.changedTouches[0].clientY - y;
    edgeTouchStart.current = null;
    if (Math.abs(dy) < 65 || Math.abs(dy) < Math.abs(dx) * 1.4) return;
    if (topPanel && dy < 0) setTopPanel(null);
    else if (y < 70 && dy > 0)
      setTopPanel(x > window.innerWidth * 0.58 ? "control" : "notifications");
    else if (profileView && y > window.innerHeight - 48 && dy < 0) setProfileView(null);
  };
  const search = skillsSearch.trim().toLocaleLowerCase();
  const matchingSkills = expertise
    .map((group) => ({
      ...group,
      skills:
        search &&
        ![group.title, group.titleFr].some((title) =>
          title.toLocaleLowerCase().includes(search)
        )
          ? group.skills.filter((skill) => skill.toLocaleLowerCase().includes(search))
          : group.skills
    }))
    .filter((group) => group.skills.length > 0);
  const secondaryApps = [
    {
      id: "cloud",
      label: "Cloud",
      img: "img/icons/system/cloud.svg",
      open: () => openProfile("experience", "Cloud")
    },
    {
      id: "sre",
      label: "SRE",
      img: "img/icons/system/reliability.svg",
      open: () => openProfile("experience", "Reliability")
    },
    {
      id: "security",
      label: text.security,
      img: "img/icons/system/security.svg",
      open: () => openProfile("experience", "Security")
    },
    {
      id: "data",
      label: french ? "Données et IA" : "Data & AI",
      img: "img/icons/system/data.svg",
      open: () => openProfile("experience", "Data & AI")
    },
    {
      id: "software",
      label: french ? "Logiciel" : "Software",
      icon: "i-lucide:code-2",
      color: "#ec8b79",
      open: () => openProfile("experience", "Software")
    },
    {
      id: "kubernetes",
      label: "Kubernetes",
      icon: "i-lucide:boxes",
      color: "#537be4",
      open: () => openProfile("expertise", undefined, "Kubernetes")
    },
    {
      id: "terraform",
      label: "Terraform",
      icon: "i-lucide:blocks",
      color: "#886be4",
      open: () => openProfile("expertise", undefined, "Terraform")
    },
    {
      id: "skills",
      label: french ? "Rechercher" : "Skill Search",
      icon: "i-lucide:search",
      color: "#3fa5ad",
      open: () => setHomePage(-1)
    }
  ];

  useInterval(() => setNow(new Date()), 60_000);
  useEffect(() => {
    if (!profileView && !topPanel) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (topPanel) setTopPanel(null);
        else setProfileView(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [profileView, topPanel]);

  return (
    <div
      className={`ios-home mac-wallpaper ${dark ? "mac-wallpaper-dark" : ""}`}
      style={{ filter: `brightness(${brightness * 0.7 + 50}%)` }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (
          touch.clientY < 70 ||
          topPanel ||
          (profileView && touch.clientY > window.innerHeight - 48)
        )
          edgeTouchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={swipeFromEdge}
    >
      <div className="ios-dynamic-island" aria-hidden="true" />
      <div className="ios-status">
        <strong>{format(now, "h:mm")}</strong>
        <div className="ios-status-signals" aria-hidden="true">
          <span className="i-material-symbols:signal-cellular-alt" />
          <span className="i-material-symbols:wifi" />
          <span className="ios-battery" />
        </div>
        <button
          type="button"
          className="ios-status-trigger ios-status-trigger-left"
          aria-label={french ? "Afficher les notifications" : "Open notifications"}
          onClick={() => setTopPanel("notifications")}
        />
        <button
          type="button"
          className="ios-status-trigger"
          aria-label={french ? "Ouvrir le centre de contrôle" : "Open Control Center"}
          onClick={() => setTopPanel("control")}
        />
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
        {homePage === -1 ? (
          <section className="ios-skills-page">
            <div className="ios-home-heading">
              <span>{french ? "RECHERCHE · COMPÉTENCES" : "SEARCH · SKILLS"}</span>
              <strong>Anas Dadi</strong>
            </div>
            <div className="ios-skills-intro">
              <span className="i-lucide:search" aria-hidden="true" />
              <h1>{french ? "Technologies et outils" : "Technologies & tools"}</h1>
              <p>
                {french
                  ? "Recherchez une technologie utilisée dans mon parcours."
                  : "Find technologies and tools used across the roles in my résumé."}
              </p>
            </div>
            <form
              className="ios-skills-form"
              onSubmit={(event) => {
                event.preventDefault();
                openProfile("expertise", undefined, skillsSearch);
              }}
            >
              <span className="i-lucide:search" aria-hidden="true" />
              <input
                type="search"
                value={skillsSearch}
                onChange={(event) => setSkillsSearch(event.target.value)}
                aria-label={french ? "Rechercher une technologie" : "Search technologies"}
                placeholder={
                  french ? "AWS, GCP, Azure, VMware…" : "AWS, GCP, Azure, on-premises…"
                }
              />
              <button
                type="submit"
                aria-label={french ? "Voir les résultats" : "See results"}
              >
                →
              </button>
            </form>
            <p className="ios-skills-count" aria-live="polite">
              {matchingSkills.length} {french ? "domaines" : "areas"} ·{" "}
              {new Set(matchingSkills.flatMap((group) => group.skills)).size}{" "}
              {french ? "technologies" : "technologies"}
            </p>
            <div className="ios-skills-groups">
              {matchingSkills.map((group) => (
                <section key={group.title}>
                  <button
                    type="button"
                    className="ios-skills-group-title"
                    onClick={() =>
                      openProfile(
                        "expertise",
                        undefined,
                        french ? group.titleFr : group.title
                      )
                    }
                  >
                    <span className={groupIcons[group.title]} aria-hidden="true" />
                    <strong>{french ? group.titleFr : group.title}</strong>
                    <span aria-hidden="true">›</span>
                  </button>
                  <div>
                    {group.skills.slice(0, search ? 16 : 6).map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => openProfile("expertise", undefined, skill)}
                      >
                        <span
                          className={skillIcons[skill] ?? "i-lucide:circle-help"}
                          aria-hidden="true"
                        />
                        {skill}
                      </button>
                    ))}
                    {!search && group.skills.length > 6 && (
                      <small>+{group.skills.length - 6}</small>
                    )}
                  </div>
                </section>
              ))}
              {matchingSkills.length === 0 && (
                <p>
                  {french
                    ? "Aucun outil trouvé. Essayez un autre mot-clé."
                    : "No matching tools. Try another search."}
                </p>
              )}
            </div>
          </section>
        ) : homePage === 0 ? (
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
          <section className="ios-secondary-page">
            <div className="ios-home-heading">
              <span>{french ? "AUTRES APPS · PARIS" : "MORE APPS · PARIS"}</span>
              <strong>Anas Dadi</strong>
            </div>
            <div className="ios-widget-grid">
              <button
                className="ios-career-widget"
                type="button"
                onClick={() => openProfile("experience")}
              >
                <span>{text.experience.toUpperCase()}</span>
                <strong>
                  {experiences.length} <small>{text.roles}</small>
                </strong>
                <p>{french ? "Cloud · SRE · Données" : "Cloud · SRE · Data"}</p>
                <em>{text.timeline}</em>
              </button>
              <button
                className="ios-profile-widget"
                type="button"
                onClick={() => setHomePage(-1)}
              >
                <img src="img/icons/system/skills.svg" alt="" />
                <span>{french ? "RECHERCHE" : "SEARCH"}</span>
                <strong>{french ? "Outils et compétences" : "Tools and skills"}</strong>
                <small>
                  {expertise.length} {french ? "domaines" : "areas"}
                </small>
                <em>{french ? "Rechercher un outil ↗" : "Find a tool ↗"}</em>
              </button>
            </div>
            <div
              className="ios-app-grid ios-secondary-grid"
              role="group"
              aria-label={french ? "Autres applications" : "More apps"}
            >
              {secondaryApps.map((app) => (
                <button key={app.id} type="button" onClick={app.open}>
                  <span className="ios-app-icon">
                    {app.img ? (
                      <img src={app.img} alt="" />
                    ) : (
                      <span
                        className="ios-category-tile"
                        style={{ background: app.color }}
                      >
                        <span className={app.icon} aria-hidden="true" />
                      </span>
                    )}
                  </span>
                  <span>{app.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="ios-search-pill"
              onClick={() => setHomePage(-1)}
            >
              <span className="i-lucide:search" aria-hidden="true" />{" "}
              {french ? "Rechercher mes technologies" : "Search technologies"}
            </button>
          </section>
        )}
      </main>

      <div
        className="ios-page-dots"
        role="group"
        aria-label={french ? "Pages d’accueil" : "Home pages"}
      >
        {[-1, 0, 1].map((page) => (
          <button
            key={page}
            type="button"
            aria-label={
              page === -1
                ? french
                  ? "Recherche de technologies"
                  : "Technology search"
                : page === 0
                  ? french
                    ? "Accueil"
                    : "Home"
                  : french
                    ? "Autres applications"
                    : "More apps"
            }
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
            <button
              type="button"
              className="ios-status-trigger ios-status-trigger-left"
              aria-label={french ? "Afficher les notifications" : "Open notifications"}
              onClick={() => setTopPanel("notifications")}
            />
            <button
              type="button"
              className="ios-status-trigger"
              aria-label={french ? "Ouvrir le centre de contrôle" : "Open Control Center"}
              onClick={() => setTopPanel("control")}
            />
          </div>
          <nav
            className="ios-profile-nav"
            aria-label={french ? "Navigation du profil" : "Profile navigation"}
          >
            <button
              type="button"
              onClick={() => setProfileView(null)}
              aria-label={text.returnHome}
            >
              <span className="i-lucide:chevron-left" aria-hidden="true" />{" "}
              {french ? "Accueil" : "Home"}
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
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </nav>
          <Profile
            initialTab={profileView.tab}
            initialTopic={profileView.topic}
            initialSkillQuery={profileView.skillQuery}
            onTabChange={(tab) =>
              setProfileView((current) => (current ? { ...current, tab } : current))
            }
          />
          <button
            type="button"
            className="ios-home-indicator"
            aria-label={text.returnHome}
            onClick={() => setProfileView(null)}
          />
        </section>
      )}
      <AnimatePresence mode="wait">
        {topPanel === "control" && (
          <IOSControlCenter
            key="control"
            french={french}
            now={now}
            playing={audioState.playing}
            toggleAudio={audioControls.toggle}
            setAudioVolume={setVolume}
            close={() => setTopPanel(null)}
            openProfile={(tab) => {
              setTopPanel(null);
              openProfile(tab);
            }}
            openSkills={() => {
              setTopPanel(null);
              setProfileView(null);
              setHomePage(-1);
            }}
            goHome={() => {
              setTopPanel(null);
              setProfileView(null);
              setHomePage(0);
            }}
          />
        )}
        {topPanel === "notifications" && (
          <IOSNotifications
            key="notifications"
            french={french}
            now={now}
            close={() => setTopPanel(null)}
            openProfile={(tab) => {
              setTopPanel(null);
              openProfile(tab);
            }}
            openSkills={() => {
              setTopPanel(null);
              setProfileView(null);
              setHomePage(-1);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
