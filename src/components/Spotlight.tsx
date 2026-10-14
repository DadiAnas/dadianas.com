import React from "react";
import { apps, launchpadApps } from "~/configs";
import type { LaunchpadData, AppsData } from "~/types";

const APPS: { [key: string]: (LaunchpadData | AppsData)[] } = {
  app: apps,
  portfolio: launchpadApps.filter((item) => !apps.some((app) => app.id === item.id))
};

interface SpotlightProps {
  toggleSpotlight: () => void;
  openApp: (id: string) => void;
  toggleLaunchpad: (target: boolean) => void;
  btnRef: React.RefObject<HTMLDivElement>;
}

export default function Spotlight({
  toggleSpotlight,
  openApp,
  toggleLaunchpad,
  btnRef
}: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [clickedID, setClickedID] = useState("");
  const [doubleClicked, setDoubleClicked] = useState<boolean>(false);

  const [searchText, setSearchText] = useState("");
  const [curDetails, setCurDetails] = useState<any>(null);

  const [appIdList, setAppIdList] = useState<string[]>([]);
  const [appList, setAppList] = useState<JSX.Element | null>(null);
  const french = useStore((state) => state.french);

  const textWhite = "text-white";
  const textUnselected = "text-gray-200";
  const textSelected = "bg-blue-500";

  useClickOutside(spotlightRef, toggleSpotlight, [btnRef]);

  useEffect(() => {
    updateAppList();
  }, [searchText]);

  useEffect(() => {
    updateCurrentDetails();
  }, [selectedIndex]);

  useEffect(() => {
    if (appIdList.length === 0) return;
    // find app's index given its id
    const newSelectedIndex = appIdList.findIndex((item) => {
      return item === clickedID;
    });
    // update index
    updateHighlight(selectedIndex, newSelectedIndex);
    setSelectedIndex(newSelectedIndex);
  }, [clickedID]);

  useEffect(() => {
    if (doubleClicked) {
      launchSelectedApp();
      setDoubleClicked(false);
    }
  }, [doubleClicked]);

  const search = (type: string) => {
    if (searchText === "") return [];

    const text = searchText.toLowerCase();
    return APPS[type].filter(
      (item: LaunchpadData | AppsData) =>
        item.title.toLowerCase().includes(text) || item.id.toLowerCase().includes(text)
    );
  };

  const handleClick = (id: string) => {
    setClickedID(id);
  };

  const handleDoubleClick = (id: string) => {
    setClickedID(id);
    setDoubleClicked(true);
  };

  const launchSelectedApp = () => {
    if (curDetails.type === "app" && !curDetails.link) {
      const id = curDetails.id;
      if (id === "launchpad") toggleLaunchpad(true);
      else openApp(id);
      toggleSpotlight();
    } else {
      window.open(curDetails.link);
      toggleSpotlight();
    }
  };

  const getTypeAppList = (type: string, startIndex: number) => {
    const result = search(type);
    const typeAppList = [];
    const typeAppIdList = [];

    for (const app of result) {
      const curIndex = startIndex + typeAppList.length;
      const bg = curIndex === 0 ? textSelected : "bg-transparent";
      const text = curIndex === 0 ? textWhite : textUnselected;

      if (curIndex === 0) setCurrentDetailsWithType(app, type);

      typeAppList.push(
        <li
          id={`spotlight-${app.id}`}
          key={`spotlight-${app.id}`}
          className={`pr-1 h-7 w-full flex rounded ${bg} ${text} cursor-default`}
          data-app-type={type}
          onClick={() => handleClick(app.id)}
          onDoubleClick={() => handleDoubleClick(app.id)}
        >
          <div className="w-8 flex-center">
            <img w-5 src={app.img} alt={app.title} title={app.title} />
          </div>
          <div className="flex-1 hstack overflow-hidden whitespace-nowrap">
            {app.title}
          </div>
        </li>
      );
      typeAppIdList.push(app.id);
    }

    return {
      appList: typeAppList,
      appIdList: typeAppIdList
    };
  };

  const updateAppList = () => {
    const app = getTypeAppList("app", 0);
    const portfolio = getTypeAppList("portfolio", app.appIdList.length);

    const newAppIdList = [...app.appIdList, ...portfolio.appIdList];
    // don't show app details when there is no associating app
    if (newAppIdList.length === 0) setCurDetails(null);

    const newAppList = (
      <div>
        {app.appList.length !== 0 && (
          <div>
            <div className="spotlight-type">Applications</div>
            <ul className="w-full text-xs">{app.appList}</ul>
          </div>
        )}
        {portfolio.appList.length !== 0 && (
          <div>
            <div className="spotlight-type mt-1.5 before:(content-empty absolute left-0 top-0 ml-2 w-63.5 border-t border-menu)">
              Portfolio
            </div>
            <ul className="w-full text-xs">{portfolio.appList}</ul>
          </div>
        )}
      </div>
    );

    setAppIdList(newAppIdList);
    setAppList(newAppList);
  };

  const setCurrentDetailsWithType = (app: any, type: string) =>
    setCurDetails({
      ...app,
      type
    });

  const updateCurrentDetails = () => {
    if (appIdList.length === 0 || searchText === "") {
      setCurDetails(null);
      return;
    }

    const appId = appIdList[selectedIndex];
    const element = document.querySelector(`#spotlight-${appId}`) as HTMLElement;
    const type = element.dataset.appType as string;
    const app = APPS[type].find((item: LaunchpadData | AppsData) => item.id === appId);

    setCurrentDetailsWithType(app, type);
  };

  const updateHighlight = (prevIndex: number, curIndex: number) => {
    if (appIdList.length === 0) return;

    // remove highlight
    const prevAppId = appIdList[prevIndex];
    const prev = document.querySelector(`#spotlight-${prevAppId}`) as HTMLElement;
    prev.className = prev.className
      .replace(textWhite, textUnselected)
      .replace(textSelected, "bg-transparent");

    // add highlight
    const curAppId = appIdList[curIndex];
    const cur = document.querySelector(`#spotlight-${curAppId}`) as HTMLElement;
    cur.className = cur.className
      .replace(textUnselected, textWhite)
      .replace("bg-transparent", textSelected);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = e.key;
    const numApps = appIdList.length;

    // ----------- select next app -----------
    if (keyCode === "ArrowDown" && selectedIndex < numApps - 1) {
      updateHighlight(selectedIndex, selectedIndex + 1);
      setSelectedIndex(selectedIndex + 1);
    }
    // ----------- select previous app -----------
    else if (keyCode === "ArrowUp" && selectedIndex > 0) {
      updateHighlight(selectedIndex, selectedIndex - 1);
      setSelectedIndex(selectedIndex - 1);
    }
    // ----------- launch app -----------
    else if (keyCode === "Enter") {
      if (!curDetails) return;
      launchSelectedApp();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update highlighted line
    updateHighlight(selectedIndex, 0);
    // current selected id go back to 0
    setSelectedIndex(0);
    // update search text and associating app list
    setSearchText(e.target.value);
  };

  const suggestionDescriptions: Record<string, string> = french
    ? {
        profile: "Présentation et parcours",
        experience: "Mes missions et réalisations",
        expertise: "Outils et technologies utilisés"
      }
    : {
        profile: "Overview and background",
        experience: "Roles and work",
        expertise: "Tools and technologies"
      };

  return (
    <div
      className="spotlight"
      onKeyDown={handleKeyPress}
      onClick={() => inputRef.current?.focus()}
      ref={spotlightRef}
    >
      <div
        className="spotlight-search-row w-full h-12 sm:h-14 bg-transparent"
        grid="~ cols-8 sm:cols-11"
      >
        <div className="col-start-1 col-span-1 flex-center">
          <span className="spotlight-search-icon i-bx:search ml-1 text-[28px]" />
        </div>
        <input
          ref={inputRef}
          className={`col-start-2 col-span-7 ${
            curDetails ? "sm:col-span-9" : "sm:col-span-10"
          } bg-transparent no-outline px-1`}
          text="xl sm:2xl"
          placeholder={french ? "Recherche Spotlight" : "Spotlight Search"}
          aria-label={french ? "Recherche Spotlight" : "Spotlight Search"}
          value={searchText}
          onChange={handleInputChange}
          autoFocus={true}
        />
        {curDetails && (
          <div className="hidden sm:flex col-start-11 col-span-1 flex-center">
            <img
              w-8
              src={curDetails.img}
              alt={curDetails.title}
              title={curDetails.title}
            />
          </div>
        )}
      </div>
      {searchText === "" && (
        <div className="spotlight-suggestions">
          <div className="spotlight-suggestions-label">
            {french ? "Accès rapide" : "Quick access"}
          </div>
          {apps
            .filter((app) => ["profile", "experience", "expertise"].includes(app.id))
            .map((app) => (
              <button
                className="spotlight-suggestion"
                key={app.id}
                type="button"
                onClick={() => {
                  openApp(app.id);
                  toggleSpotlight();
                }}
              >
                <img src={app.img} alt="" />
                <span>
                  <strong>{french ? app.titleFr ?? app.title : app.title}</strong>
                  <small>{suggestionDescriptions[app.id]}</small>
                </span>
              </button>
            ))}
          <p className="spotlight-hint">
            {french
              ? "Recherchez une application ou un lien, puis appuyez sur Entrée."
              : "Search an app or link, then press Return to open it."}
          </p>
        </div>
      )}
      {searchText !== "" && (
        <div className="spotlight-results">
          <div className="spotlight-results-list">
            {appList}
            {appIdList.length === 0 && (
              <p className="spotlight-no-results">
                {french ? "Aucun résultat" : "No matches"}
              </p>
            )}
          </div>
          {curDetails && (
            <div className="spotlight-result-detail">
              <img src={curDetails.img} alt="" />
              <strong>{curDetails.title}</strong>
              <small>
                {curDetails.link
                  ? french
                    ? "Ouvrir le lien"
                    : "Open link"
                  : french
                    ? "Ouvrir l’application"
                    : "Open app"}
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
