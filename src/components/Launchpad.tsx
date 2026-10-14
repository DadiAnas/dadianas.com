import { apps } from "~/configs";

interface LaunchpadProps {
  show: boolean;
  toggleLaunchpad: (target: boolean) => void;
  openApp: (id: string) => void;
}

export default function Launchpad({ show, toggleLaunchpad, openApp }: LaunchpadProps) {
  const french = useStore((state) => state.french);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<"all" | "portfolio" | "links">("all");

  if (!show) return null;

  const results = apps.filter((app) => {
    if (app.id === "launchpad") return false;
    if (category === "portfolio" && !app.desktop) return false;
    if (category === "links" && !app.link) return false;
    const query = searchText.trim().toLowerCase();
    return (
      !query ||
      [app.title, app.titleFr, app.id].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="mac-launchpad-backdrop" onClick={() => toggleLaunchpad(false)}>
      <section
        id="launchpad"
        className="mac-launchpad-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Applications"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") toggleLaunchpad(false);
        }}
      >
        <header className="mac-launchpad-search">
          <span className="i-lucide:app-window" aria-hidden="true" />
          <input
            autoFocus
            type="search"
            aria-label={french ? "Rechercher une application" : "Search applications"}
            placeholder="Applications"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            type="button"
            aria-label={french ? "Fermer les applications" : "Close applications"}
            onClick={() => toggleLaunchpad(false)}
          >
            <span className="i-lucide:x" aria-hidden="true" />
          </button>
        </header>
        <nav
          className="mac-launchpad-categories"
          aria-label={french ? "Filtres" : "Filters"}
        >
          {(
            [
              ["all", french ? "Toutes" : "All"],
              ["portfolio", "Portfolio"],
              ["links", french ? "Liens" : "Links"]
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="mac-launchpad-grid">
          {results.map((app) => {
            const tile = (
              <>
                <img src={app.img} alt="" />
                <span>{french ? app.titleFr ?? app.title : app.title}</span>
              </>
            );
            return app.link ? (
              <a
                key={app.id}
                href={app.link}
                target={app.link.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={() => toggleLaunchpad(false)}
              >
                {tile}
              </a>
            ) : (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  openApp(app.id);
                  toggleLaunchpad(false);
                }}
              >
                {tile}
              </button>
            );
          })}
          {results.length === 0 && (
            <p className="mac-launchpad-empty">
              {french ? "Aucune application trouvée" : "No applications found"}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
