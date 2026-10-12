import { useMemo, useState } from "react";
import {
  experiences,
  expertise,
  resumeUrl,
  type ExperienceTopic,
  type ProfileTab
} from "~/configs/profile";
import { user } from "~/configs";

const navigation: { id: ProfileTab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "i-lucide:home" },
  { id: "experience", label: "Experience", icon: "i-lucide:briefcase-business" },
  { id: "expertise", label: "Expertise", icon: "i-lucide:layers-3" },
  { id: "education", label: "Education", icon: "i-lucide:graduation-cap" },
  { id: "contact", label: "Contact", icon: "i-lucide:send" }
];

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
}

export default function Profile({
  initialTab = "overview",
  initialTopic = "All"
}: ProfileProps) {
  const [tab, setTab] = useState<ProfileTab>(initialTab);
  const [topic, setTopic] = useState<ExperienceTopic | "All">(initialTopic);
  const [query, setQuery] = useState("");
  const [french, setFrench] = useState(false);

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
        ...experience.topics,
        ...experience.highlights
      ]
        .join(" ")
        .toLowerCase();
      return matchesTopic && (!search || text.includes(search));
    });
  }, [query, topic]);

  const openExperience = (nextTopic: ExperienceTopic | "All" = "All") => {
    setTopic(nextTopic);
    setQuery("");
    setTab("experience");
  };

  return (
    <div className="profile-app">
      <aside className="profile-sidebar">
        <div className="profile-brand">
          <img src={user.avatar} alt="" />
          <div>
            <strong>Anas Dadi</strong>
            <span>Portfolio</span>
          </div>
        </div>
        <p className="profile-sidebar-label">EXPLORE</p>
        <nav aria-label="Profile sections">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={tab === item.id ? "active" : ""}
              aria-current={tab === item.id ? "page" : undefined}
              onClick={() => setTab(item.id)}
            >
              <span className={item.icon} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="profile-sidebar-bottom">
          <span className="profile-availability-dot" /> Available for new opportunities
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Open full résumé ↗
          </a>
        </div>
      </aside>

      <div className="profile-main">
        <div className="profile-toolbar">
          <span>
            ANAS DADI <b>/</b>{" "}
            {navigation.find((item) => item.id === tab)?.label.toUpperCase()}
          </span>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="profile-scroll" key={tab}>
          {tab === "overview" && (
            <>
              <section className="profile-hero">
                <div className="profile-hero-copy">
                  <span className="profile-eyebrow">
                    DEVSECOPS · SRE · CLOUD ARCHITECTURE
                  </span>
                  <h1>
                    {french
                      ? "Des systèmes fiables, à toute échelle."
                      : "Reliable systems, made understandable."}
                  </h1>
                  <p>
                    {french
                      ? "Je conçois et exploite des plateformes cloud. Mon travail relie Kubernetes, automatisation, sécurité et réponse aux incidents de production."
                      : "I design and operate cloud platforms. My work connects Kubernetes, automation, security and hands-on production incident response."}
                  </p>
                  <div className="profile-hero-actions">
                    <button type="button" onClick={() => openExperience()}>
                      Explore all experience <span aria-hidden="true">→</span>
                    </button>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                      Download résumé
                    </a>
                  </div>
                  <button
                    type="button"
                    className="profile-language"
                    onClick={() => setFrench(!french)}
                  >
                    {french ? "Read in English" : "Lire en français"}
                  </button>
                </div>
                <div className="profile-portrait">
                  <img src={user.avatar} alt="Portrait of Anas Dadi" />
                  <div>
                    <span className="profile-availability-dot" /> Currently at BNP Paribas
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <div className="profile-section-heading">
                  <span>FIND YOUR WAY</span>
                  <h2>What would you like to know?</h2>
                </div>
                <div className="profile-route-grid">
                  <button type="button" onClick={() => openExperience("Cloud")}>
                    <span className="i-lucide:cloud" aria-hidden="true" />
                    <strong>Cloud platforms</strong>
                    <small>Architecture, migration and Kubernetes across providers</small>
                    <em>See related roles →</em>
                  </button>
                  <button type="button" onClick={() => openExperience("Reliability")}>
                    <span className="i-lucide:activity" aria-hidden="true" />
                    <strong>Reliability in production</strong>
                    <small>Incident response, observability and delivery</small>
                    <em>See related roles →</em>
                  </button>
                  <button type="button" onClick={() => openExperience("Data & AI")}>
                    <span className="i-lucide:workflow" aria-hidden="true" />
                    <strong>Data & AI</strong>
                    <small>Airflow, Kafka, analytics and machine learning</small>
                    <em>See related roles →</em>
                  </button>
                </div>
              </section>

              <section className="profile-current">
                <div>
                  <span>NOW</span>
                  <strong>BNP Paribas</strong>
                  <p>DevOps / SRE — Infrastructure & Orchestration Expert</p>
                </div>
                <button type="button" onClick={() => openExperience("Reliability")}>
                  View the work ↗
                </button>
              </section>
            </>
          )}

          {tab === "experience" && (
            <section className="profile-section profile-experience">
              <div className="profile-section-heading">
                <span>CAREER</span>
                <h1>Experience</h1>
                <p>
                  Eight roles, from software and data to cloud architecture and production
                  SRE.
                </p>
              </div>
              <div className="profile-search-row">
                <label className="profile-search">
                  <span className="i-lucide:search" aria-hidden="true" />
                  <span className="sr-only">Search experience</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search roles, companies or tools"
                  />
                </label>
                <span aria-live="polite">
                  {visibleExperiences.length} of {experiences.length} roles
                </span>
              </div>
              <div
                className="profile-filters"
                role="group"
                aria-label="Filter experience by topic"
              >
                {topics.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={topic === item}
                    onClick={() => setTopic(item)}
                  >
                    {item}
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
                          {experience.period} <b>·</b> {experience.kind}
                        </span>
                        <strong>{experience.role}</strong>
                        <span className="profile-role-company">{experience.company}</span>
                        <span className="profile-role-summary">{experience.summary}</span>
                        <span className="profile-role-tags">
                          {experience.topics.map((tag) => (
                            <small key={tag}>{tag}</small>
                          ))}
                        </span>
                      </span>
                      <span className="profile-role-expand" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <ul>
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </details>
                ))}
                {visibleExperiences.length === 0 && (
                  <div className="profile-no-results">
                    No matching roles. Try another topic or search term.
                  </div>
                )}
              </div>
              <p className="profile-footnote">
                For the full responsibilities and technology list,{" "}
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  open the PDF résumé ↗
                </a>
                .
              </p>
            </section>
          )}

          {tab === "expertise" && (
            <section className="profile-section">
              <div className="profile-section-heading">
                <span>TOOLKIT</span>
                <h1>Expertise</h1>
                <p>Tools I have used to deliver, secure and operate real systems.</p>
              </div>
              <div className="profile-expertise-grid">
                {expertise.map((group) => (
                  <article key={group.title}>
                    <h2>{group.title}</h2>
                    <p>{group.description}</p>
                    <div>
                      {group.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {tab === "education" && (
            <section className="profile-section">
              <div className="profile-section-heading">
                <span>FOUNDATIONS</span>
                <h1>Education & credentials</h1>
              </div>
              <div className="profile-education-list">
                <article>
                  <span>2018 – 2021</span>
                  <h2>ENSET Mohammedia</h2>
                  <p>
                    Engineering degree in Computer Science, Big Data & Cloud Computing
                  </p>
                </article>
                <article>
                  <span>2016 – 2018</span>
                  <h2>CPGE</h2>
                  <p>Preparatory classes in Physics and Engineering Science</p>
                </article>
                <article>
                  <span>2013 – 2016</span>
                  <h2>Tarik Ibnou Ziad High School</h2>
                  <p>Mathematics Science A</p>
                </article>
              </div>
              <div className="profile-credential-grid">
                <div>
                  <h2>Certifications</h2>
                  <p>
                    Hadoop Foundations · Advanced Python · GCP Data Lakes & Warehouses ·
                    GCP Streaming Analytics · Huawei Security · Huawei AI · TCF French
                  </p>
                </div>
                <div>
                  <h2>Languages</h2>
                  <p>
                    Arabic — native
                    <br />
                    French — advanced
                    <br />
                    English — advanced
                  </p>
                </div>
              </div>
            </section>
          )}

          {tab === "contact" && (
            <section className="profile-section profile-contact">
              <div className="profile-section-heading">
                <span>GET IN TOUCH</span>
                <h1>Let's build something reliable.</h1>
                <p>
                  Based in Paris, open to hybrid and fully remote roles, and freelance
                  engagements.
                </p>
              </div>
              <div className="profile-contact-list">
                <a href="mailto:dadi.anas@hotmail.fr">
                  <span>Email</span>
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
                  <span>Phone</span>
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
                Open the full résumé <span aria-hidden="true">↗</span>
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
