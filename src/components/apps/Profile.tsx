import { useEffect, useMemo, useRef, useState } from "react";
import {
  experiences,
  expertise,
  resumeUrl,
  type ExperienceTopic,
  type ProfileTab
} from "~/configs/profile";
import { user } from "~/configs";

const copy = {
  en: {
    explore: "EXPLORE",
    profileSections: "Profile sections",
    openToNewOpportunities: "Open to new opportunities",
    viewFullResume: "View full résumé ↗",
    resume: "Résumé",
    devsecopsSreCloudArchitecture: "DEVSECOPS · SRE · CLOUD ARCHITECTURE",
    exploreMyExperience: "Explore my experience",
    viewResume: "View résumé",
    portraitOfAnasDadi: "Portrait of Anas Dadi",
    currentlyAtBnpParibas: "Currently at BNP Paribas",
    findYourWay: "FIND YOUR WAY",
    whatWouldYouLikeTo: "What would you like to explore?",
    cloudPlatforms: "Cloud platforms",
    architectureMigrationAndKubernetesAcross:
      "Architecture, migration and Kubernetes across providers",
    seeRelatedRoles: "See related roles →",
    reliabilityInProduction: "Reliability in production",
    incidentResponseObservabilityAndDelivery:
      "Incident response, observability and delivery",
    dataAi: "Data & AI",
    airflowKafkaAnalyticsAndMachine: "Airflow, Kafka, analytics and machine learning",
    now: "NOW",
    viewThisRole: "View this role ↗",
    career: "CAREER",
    experience: "Experience",
    eightRolesSpanningSoftwareData:
      "Eight roles spanning software, data engineering, cloud architecture and production SRE.",
    searchExperience: "Search experience",
    searchRolesCompaniesOrTools: "Search roles, companies or tools",
    filterExperienceByTopic: "Filter experience by topic",
    noMatchingRolesTryAnother: "No matching roles. Try another topic or search term.",
    forTheCompleteResponsibilitiesAnd:
      "For the complete responsibilities and technology list,",
    viewThePdfResume: "view the PDF résumé ↗",
    toolkit: "TOOLKIT",
    expertise: "Expertise",
    technologiesAndPracticesAcrossMy:
      "Technologies and practices across my work, drawn from my résumé.",
    searchTechnologies: "Search technologies",
    findATechnologyOrDomain: "Find a technology or domain",
    noMatchingTechnologies: "No matching technologies.",
    foundations: "FOUNDATIONS",
    educationCredentials: "Education & credentials",
    engineeringDegreeInComputerScience:
      "Engineering degree in Computer Science, Big Data & Cloud Computing",
    preparatoryClassesInPhysicsAnd:
      "Preparatory classes in Physics and Engineering Science",
    mathematicsScienceA: "Mathematics Science A",
    certifications: "Certifications",
    hadoopFoundationsAdvancedPythonGcp:
      "Hadoop Foundations · Advanced Python · GCP Data Lakes & Warehouses · GCP Streaming Analytics · Huawei Security · Huawei AI · TCF French",
    languages: "Languages",
    arabicNative: "Arabic — native",
    frenchAdvanced: "French — advanced",
    englishAdvanced: "English — advanced",
    getInTouch: "GET IN TOUCH",
    letSBuildSomethingReliable: "Let's build something reliable.",
    basedInParisOpenTo:
      "Based in Paris. Open to hybrid or fully remote roles, permanent positions and freelance engagements via umbrella employment.",
    email: "Email",
    phone: "Phone",
    viewTheFullResume: "View the full résumé"
  },
  fr: {
    explore: "EXPLORER",
    profileSections: "Rubriques du profil",
    openToNewOpportunities: "À l’écoute de nouvelles opportunités",
    viewFullResume: "Voir le CV complet ↗",
    resume: "CV",
    devsecopsSreCloudArchitecture: "DEVSECOPS · SRE · ARCHITECTURE CLOUD",
    exploreMyExperience: "Découvrir mon parcours",
    viewResume: "Voir mon CV",
    portraitOfAnasDadi: "Portrait d’Anas Dadi",
    currentlyAtBnpParibas: "Actuellement chez BNP Paribas",
    findYourWay: "POUR COMMENCER",
    whatWouldYouLikeTo: "Que souhaitez-vous découvrir ?",
    cloudPlatforms: "Plateformes cloud",
    architectureMigrationAndKubernetesAcross:
      "Architecture, migration et Kubernetes sur plusieurs clouds",
    seeRelatedRoles: "Voir les expériences →",
    reliabilityInProduction: "Fiabilité en production",
    incidentResponseObservabilityAndDelivery:
      "Gestion des incidents, observabilité et livraison",
    dataAi: "Données et IA",
    airflowKafkaAnalyticsAndMachine:
      "Airflow, Kafka, analytique et apprentissage automatique",
    now: "AUJOURD’HUI",
    viewThisRole: "Découvrir cette mission ↗",
    career: "PARCOURS",
    experience: "Expérience professionnelle",
    eightRolesSpanningSoftwareData:
      "Huit expériences en développement, ingénierie des données, architecture cloud et SRE en production.",
    searchExperience: "Rechercher une expérience",
    searchRolesCompaniesOrTools: "Rechercher un poste, une entreprise ou un outil",
    filterExperienceByTopic: "Filtrer les expériences par domaine",
    noMatchingRolesTryAnother:
      "Aucune expérience trouvée. Essayez un autre domaine ou mot-clé.",
    forTheCompleteResponsibilitiesAnd: "Pour le détail des missions et des technologies,",
    viewThePdfResume: "consultez le CV en PDF ↗",
    toolkit: "SAVOIR-FAIRE",
    expertise: "Compétences techniques",
    technologiesAndPracticesAcrossMy:
      "Technologies et pratiques issues de mon parcours, telles que présentées dans mon CV.",
    searchTechnologies: "Rechercher une technologie",
    findATechnologyOrDomain: "Rechercher une technologie ou un domaine",
    noMatchingTechnologies: "Aucune technologie trouvée.",
    foundations: "FORMATION",
    educationCredentials: "Formation et certifications",
    engineeringDegreeInComputerScience:
      "Diplôme d’ingénieur en informatique, Big Data et Cloud Computing",
    preparatoryClassesInPhysicsAnd:
      "Classes préparatoires, physique et sciences de l’ingénieur",
    mathematicsScienceA: "Sciences mathématiques A",
    certifications: "Certifications",
    hadoopFoundationsAdvancedPythonGcp:
      "Fondamentaux Hadoop · Python avancé · Data Lakes et entrepôts de données sur GCP · Analyse de flux sur GCP · Sécurité Huawei · IA Huawei · TCF français",
    languages: "Langues",
    arabicNative: "Arabe — langue maternelle",
    frenchAdvanced: "Français — niveau avancé",
    englishAdvanced: "Anglais — niveau avancé",
    getInTouch: "PRENDRE CONTACT",
    letSBuildSomethingReliable: "Échangeons sur votre prochain projet.",
    basedInParisOpenTo:
      "Basé à Paris. Ouvert aux postes hybrides ou entièrement à distance, en CDI ou en freelance via portage salarial.",
    email: "E-mail",
    phone: "Téléphone",
    viewTheFullResume: "Consulter le CV complet"
  }
};

const navigation: { id: ProfileTab; label: string; labelFr: string; icon: string }[] = [
  { id: "overview", label: "Overview", labelFr: "Présentation", icon: "i-lucide:home" },
  {
    id: "experience",
    label: "Experience",
    labelFr: "Parcours",
    icon: "i-lucide:briefcase-business"
  },
  {
    id: "expertise",
    label: "Expertise",
    labelFr: "Compétences",
    icon: "i-lucide:layers-3"
  },
  {
    id: "education",
    label: "Education",
    labelFr: "Formation",
    icon: "i-lucide:graduation-cap"
  },
  { id: "contact", label: "Contact", labelFr: "Contact", icon: "i-lucide:send" }
];

const topicFr: Record<ExperienceTopic | "All", string> = {
  All: "Tout",
  Cloud: "Cloud",
  Reliability: "Fiabilité",
  Security: "Sécurité",
  "Data & AI": "Données et IA",
  Software: "Développement"
};

const topics: (ExperienceTopic | "All")[] = [
  "All",
  "Cloud",
  "Reliability",
  "Security",
  "Data & AI",
  "Software"
];

interface ProfileProps {
  initialTab?: ProfileTab;
  initialTopic?: ExperienceTopic | "All";
  initialSkillQuery?: string;
  onTabChange?: (tab: ProfileTab) => void;
}

export default function Profile({
  initialTab = "overview",
  initialTopic = "All",
  initialSkillQuery = "",
  onTabChange
}: ProfileProps) {
  const [tab, setTab] = useState<ProfileTab>(initialTab);
  const [topic, setTopic] = useState<ExperienceTopic | "All">(initialTopic);
  const [query, setQuery] = useState("");
  const [skillQuery, setSkillQuery] = useState(initialSkillQuery);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const french = useStore((state) => state.french);
  const toggleFrench = useStore((state) => state.toggleFrench);
  const text = french ? copy.fr : copy.en;
  const tr = (en: string, fr: string) => (french ? fr : en);

  useEffect(() => setTab(initialTab), [initialTab]);

  const visibleExpertise = useMemo(() => {
    const search = skillQuery.trim().toLocaleLowerCase();
    return expertise
      .map((group) => ({
        ...group,
        skills:
          !search ||
          [group.title, group.titleFr, group.description, group.descriptionFr].some(
            (title) => title.toLocaleLowerCase().includes(search)
          )
            ? group.skills
            : group.skills.filter((skill) => skill.toLocaleLowerCase().includes(search))
      }))
      .filter((group) => group.skills.length > 0);
  }, [skillQuery]);

  const featuredSkills = [
    "Kubernetes",
    "Terraform",
    "Prometheus",
    "Apache Airflow",
    "Apache Kafka",
    "HashiCorp Vault"
  ];
  const quickSkills = expertise
    .flatMap((group) => {
      const search = skillQuery.trim().toLocaleLowerCase();
      const matchesGroup = [group.title, group.titleFr].some((title) =>
        title.toLocaleLowerCase().includes(search)
      );
      return group.skills
        .filter((skill) =>
          search
            ? matchesGroup || skill.toLocaleLowerCase().includes(search)
            : featuredSkills.includes(skill)
        )
        .map((skill) => ({ skill, group: french ? group.titleFr : group.title }));
    })
    .filter(
      (item, index, all) => all.findIndex((match) => match.skill === item.skill) === index
    )
    .slice(0, 8);

  const visibleExperiences = useMemo(() => {
    const search = query.trim().toLowerCase();
    return experiences.filter((experience) => {
      const matchesTopic = topic === "All" || experience.topics.includes(topic);
      const text = [
        experience.company,
        experience.role,
        experience.kind,
        experience.period,
        experience.summary,
        experience.fr.role,
        experience.fr.summary,
        ...experience.topics,
        ...experience.highlights,
        ...experience.fr.highlights
      ]
        .join(" ")
        .toLowerCase();
      return matchesTopic && (!search || text.includes(search));
    });
  }, [query, topic]);

  const changeTab = (nextTab: ProfileTab) => {
    setTab(nextTab);
    onTabChange?.(nextTab);
  };

  const openExperience = (nextTopic: ExperienceTopic | "All" = "All") => {
    setTopic(nextTopic);
    setQuery("");
    changeTab("experience");
  };

  const swipeSection = (event: React.TouchEvent) => {
    if (!touchStart.current || window.innerWidth >= 640) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    const index = navigation.findIndex((item) => item.id === tab);
    changeTab(
      navigation[Math.max(0, Math.min(navigation.length - 1, index + (dx < 0 ? 1 : -1)))]
        .id
    );
  };

  return (
    <div
      className="profile-app"
      onTouchStart={(event) => {
        if (
          event.target instanceof HTMLElement &&
          event.target.closest("input, textarea")
        )
          return;
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={swipeSection}
    >
      <aside className="profile-sidebar">
        <div className="profile-brand">
          <img src={user.avatar} alt="" />
          <div>
            <strong>Anas Dadi</strong>
            <span>Portfolio</span>
          </div>
        </div>
        <p className="profile-sidebar-label">{text.explore}</p>
        <nav aria-label={text.profileSections}>
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={tab === item.id ? "active" : ""}
              aria-current={tab === item.id ? "page" : undefined}
              onClick={() => changeTab(item.id)}
            >
              <span className={item.icon} aria-hidden="true" />
              <span>{french ? item.labelFr : item.label}</span>
            </button>
          ))}
        </nav>
        <div className="profile-sidebar-bottom">
          <span className="profile-availability-dot" /> {text.openToNewOpportunities}
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            {text.viewFullResume}
          </a>
        </div>
      </aside>

      <div className="profile-main">
        <div className="profile-toolbar">
          <span>
            ANAS DADI <b>/</b>{" "}
            {(french
              ? navigation.find((item) => item.id === tab)?.labelFr
              : navigation.find((item) => item.id === tab)?.label
            )?.toUpperCase()}
          </span>
          <div className="profile-toolbar-actions">
            <button
              type="button"
              onClick={toggleFrench}
              lang={french ? "en" : "fr"}
              aria-label={french ? "Switch to English" : "Passer en français"}
            >
              {french ? "EN" : "FR"}
            </button>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              {text.resume} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="profile-scroll" key={tab} lang={french ? "fr" : "en"}>
          {tab === "overview" && (
            <>
              <section className="profile-hero">
                <div className="profile-hero-copy">
                  <span className="profile-eyebrow">
                    {text.devsecopsSreCloudArchitecture}
                  </span>
                  <h1>
                    {french
                      ? "Des plateformes cloud fiables et sécurisées."
                      : "Cloud platforms built for reliability and security."}
                  </h1>
                  <p>
                    {french
                      ? "Ingénieur DevSecOps et SRE, j’interviens de l’architecture multicloud à l’exploitation en production : Kubernetes, infrastructure as code, sécurité, observabilité, données et gestion des incidents."
                      : "I work across cloud architecture and production operations: Kubernetes, infrastructure as code, security, observability, data systems and incident response."}
                  </p>
                  <div className="profile-hero-actions">
                    <button type="button" onClick={() => openExperience()}>
                      {text.exploreMyExperience} <span aria-hidden="true">→</span>
                    </button>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                      {text.viewResume}
                    </a>
                  </div>
                  <div className="profile-quick-search">
                    <span className="profile-quick-search-label">
                      {french
                        ? "RECHERCHER UNE COMPÉTENCE"
                        : "FIND A TECHNOLOGY I’VE USED"}
                    </span>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        changeTab("expertise");
                      }}
                    >
                      <span className="i-lucide:search" aria-hidden="true" />
                      <input
                        aria-label={
                          french
                            ? "Rechercher une compétence"
                            : "Search technologies I have used"
                        }
                        type="search"
                        value={skillQuery}
                        onChange={(event) => setSkillQuery(event.target.value)}
                        placeholder={
                          french
                            ? "Kubernetes, Kafka, Terraform…"
                            : "Kubernetes, Kafka, Terraform…"
                        }
                      />
                      <button type="submit">
                        {french ? "Voir les résultats" : "See results"}
                      </button>
                    </form>
                    <div className="profile-quick-results" aria-live="polite">
                      {quickSkills.length ? (
                        quickSkills.map(({ skill, group }) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => {
                              setSkillQuery(skill);
                              changeTab("expertise");
                            }}
                            title={group}
                          >
                            {skill}
                          </button>
                        ))
                      ) : (
                        <span>
                          {french
                            ? "Aucun outil trouvé dans le CV."
                            : "No matching tool in the résumé."}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="profile-portrait">
                  <img src={user.avatar} alt={text.portraitOfAnasDadi} />
                  <div>
                    <span className="profile-availability-dot" />{" "}
                    {text.currentlyAtBnpParibas}
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <div className="profile-section-heading">
                  <span>{text.findYourWay}</span>
                  <h2>{text.whatWouldYouLikeTo}</h2>
                </div>
                <div className="profile-route-grid">
                  <button type="button" onClick={() => openExperience("Cloud")}>
                    <span className="i-lucide:cloud" aria-hidden="true" />
                    <strong>{text.cloudPlatforms}</strong>
                    <small>{text.architectureMigrationAndKubernetesAcross}</small>
                    <em>{text.seeRelatedRoles}</em>
                  </button>
                  <button type="button" onClick={() => openExperience("Reliability")}>
                    <span className="i-lucide:activity" aria-hidden="true" />
                    <strong>{text.reliabilityInProduction}</strong>
                    <small>{text.incidentResponseObservabilityAndDelivery}</small>
                    <em>{text.seeRelatedRoles}</em>
                  </button>
                  <button type="button" onClick={() => openExperience("Data & AI")}>
                    <span className="i-lucide:workflow" aria-hidden="true" />
                    <strong>{text.dataAi}</strong>
                    <small>{text.airflowKafkaAnalyticsAndMachine}</small>
                    <em>{text.seeRelatedRoles}</em>
                  </button>
                </div>
              </section>

              <section className="profile-current">
                <div>
                  <span>{text.now}</span>
                  <strong>BNP Paribas</strong>
                  <p>{tr(experiences[0].role, experiences[0].fr.role)}</p>
                </div>
                <button type="button" onClick={() => openExperience("Reliability")}>
                  {text.viewThisRole}
                </button>
              </section>
            </>
          )}

          {tab === "experience" && (
            <section className="profile-section profile-experience">
              <div className="profile-section-heading">
                <span>{text.career}</span>
                <h1>{text.experience}</h1>
                <p>{text.eightRolesSpanningSoftwareData}</p>
              </div>
              <div className="profile-search-row">
                <label className="profile-search">
                  <span className="i-lucide:search" aria-hidden="true" />
                  <span className="sr-only">{text.searchExperience}</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={text.searchRolesCompaniesOrTools}
                  />
                </label>
                <span aria-live="polite">
                  {french
                    ? `${visibleExperiences.length} ${visibleExperiences.length === 1 ? "expérience" : "expériences"} sur ${experiences.length}`
                    : `${visibleExperiences.length} of ${experiences.length} roles`}
                </span>
              </div>
              <div
                className="profile-filters"
                role="group"
                aria-label={text.filterExperienceByTopic}
              >
                {topics.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={topic === item}
                    onClick={() => setTopic(item)}
                  >
                    {french ? topicFr[item] : item}
                  </button>
                ))}
              </div>
              <div className="profile-timeline">
                {visibleExperiences.map((experience) => (
                  <details key={experience.id} className="profile-role">
                    <summary>
                      <span className="profile-role-marker" aria-hidden="true" />
                      <span className="profile-role-main">
                        <span className="profile-role-meta">
                          {french ? experience.fr.period : experience.period} <b>·</b>{" "}
                          {french
                            ? experience.kind === "Internship"
                              ? "Stage"
                              : "Poste"
                            : experience.kind}
                        </span>
                        <strong>{french ? experience.fr.role : experience.role}</strong>
                        <span className="profile-role-company">{experience.company}</span>
                        <span className="profile-role-summary">
                          {french ? experience.fr.summary : experience.summary}
                        </span>
                        <span className="profile-role-tags">
                          {experience.topics.map((tag) => (
                            <small key={tag}>{french ? topicFr[tag] : tag}</small>
                          ))}
                        </span>
                      </span>
                      <span className="profile-role-expand" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <ul>
                      {(french ? experience.fr.highlights : experience.highlights).map(
                        (highlight) => (
                          <li key={highlight}>{highlight}</li>
                        )
                      )}
                    </ul>
                  </details>
                ))}
                {visibleExperiences.length === 0 && (
                  <div className="profile-no-results">
                    {text.noMatchingRolesTryAnother}
                  </div>
                )}
              </div>
              <p className="profile-footnote">
                {text.forTheCompleteResponsibilitiesAnd}{" "}
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  {text.viewThePdfResume}
                </a>
                .
              </p>
            </section>
          )}

          {tab === "expertise" && (
            <section className="profile-section">
              <div className="profile-section-heading">
                <span>{text.toolkit}</span>
                <h1>{text.expertise}</h1>
                <p>{text.technologiesAndPracticesAcrossMy}</p>
              </div>
              <label className="profile-search profile-skill-search">
                <span className="i-lucide:search" aria-hidden="true" />
                <span className="sr-only">{text.searchTechnologies}</span>
                <input
                  value={skillQuery}
                  onChange={(event) => setSkillQuery(event.target.value)}
                  placeholder={text.findATechnologyOrDomain}
                />
              </label>
              <div className="profile-expertise-grid">
                {visibleExpertise.map((group) => (
                  <article key={group.title}>
                    <h2>{french ? group.titleFr : group.title}</h2>
                    <p>{french ? group.descriptionFr : group.description}</p>
                    <div>
                      {group.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              {visibleExpertise.length === 0 && (
                <p className="profile-no-results">{text.noMatchingTechnologies}</p>
              )}
            </section>
          )}

          {tab === "education" && (
            <section className="profile-section">
              <div className="profile-section-heading">
                <span>{text.foundations}</span>
                <h1>{text.educationCredentials}</h1>
              </div>
              <div className="profile-education-list">
                <article>
                  <span>2018 – 2021</span>
                  <h2>ENSET Mohammedia</h2>
                  <p>{text.engineeringDegreeInComputerScience}</p>
                </article>
                <article>
                  <span>2016 – 2018</span>
                  <h2>CPGE</h2>
                  <p>{text.preparatoryClassesInPhysicsAnd}</p>
                </article>
                <article>
                  <span>2013 – 2016</span>
                  <h2>Tarik Ibnou Ziad High School</h2>
                  <p>{text.mathematicsScienceA}</p>
                </article>
              </div>
              <div className="profile-credential-grid">
                <div>
                  <h2>{text.certifications}</h2>
                  <p>{text.hadoopFoundationsAdvancedPythonGcp}</p>
                </div>
                <div>
                  <h2>{text.languages}</h2>
                  <p>
                    {text.arabicNative}
                    <br />
                    {text.frenchAdvanced}
                    <br />
                    {text.englishAdvanced}
                  </p>
                </div>
              </div>
            </section>
          )}

          {tab === "contact" && (
            <section className="profile-section profile-contact">
              <div className="profile-section-heading">
                <span>{text.getInTouch}</span>
                <h1>{text.letSBuildSomethingReliable}</h1>
                <p>{text.basedInParisOpenTo}</p>
              </div>
              <div className="profile-contact-list">
                <a href="mailto:dadi.anas@hotmail.fr">
                  <span>{text.email}</span>
                  <strong>dadi.anas@hotmail.fr</strong>
                  <em>↗</em>
                </a>
                <a
                  href="https://www.linkedin.com/in/dadianas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                  <strong>linkedin.com/in/dadianas</strong>
                  <em>↗</em>
                </a>
                <a
                  href="https://github.com/DadiAnas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <strong>github.com/DadiAnas</strong>
                  <em>↗</em>
                </a>
                <a href="tel:+33681421585">
                  <span>{text.phone}</span>
                  <strong>+33 6 81 42 15 85</strong>
                  <em>↗</em>
                </a>
              </div>
              <a
                className="profile-contact-resume"
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.viewTheFullResume} <span aria-hidden="true">↗</span>
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
