import React from "react";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { isFullScreen } from "~/utils";
import { music } from "~/configs";
import { resumeUrl } from "~/configs/profile";
import type { MacActions } from "~/types";

interface TopBarItemProps {
  hideOnMobile?: boolean;
  forceHover?: boolean;
  children: React.ReactNode;
  className?: string;
  label?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

const TopBarItem = forwardRef(
  (props: TopBarItemProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const hide = props.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex";
    const bg = props.forceHover
      ? "bg-gray-100/30 dark:bg-gray-400/40"
      : "hover:(bg-gray-100/30 dark:bg-gray-400/40)";

    return (
      <div
        ref={ref}
        className={`hstack space-x-1 h-6 px-1 cursor-default rounded ${hide} ${bg} ${
          props.className || ""
        }`}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        aria-label={props.label}
        role={props.onClick ? "button" : undefined}
        tabIndex={props.onClick ? 0 : undefined}
        onKeyDown={
          props.onClick
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  props.onClick?.();
                }
              }
            : undefined
        }
      >
        {props.children}
      </div>
    );
  }
);

const CCMIcon = ({ size }: { size: number }) => {
  return (
    <svg
      viewBox="0 0 29 29"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z" />
    </svg>
  );
};

interface TopBarProps extends MacActions {
  title: string;
  openApp: (id: string) => void;
  setSpotlightBtnRef: (value: React.RefObject<HTMLDivElement>) => void;
  hide: boolean;
  toggleSpotlight: () => void;
}

interface TopBarState {
  date: Date;
  showControlCenter: boolean;
  showWifiMenu: boolean;
  showAppleMenu: boolean;
}

const TopBar = (props: TopBarProps) => {
  const appleBtnRef = useRef<HTMLDivElement>(null);
  const controlCenterBtnRef = useRef<HTMLDivElement>(null);
  const wifiBtnRef = useRef<HTMLDivElement>(null);
  const spotlightBtnRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<TopBarState>({
    date: new Date(),
    showControlCenter: false,
    showWifiMenu: false,
    showAppleMenu: false
  });

  const [audio, audioState, controls, audioRef] = useAudio({
    src: music.audio,
    autoReplay: true
  });
  const { winWidth, winHeight } = useWindowSize();

  const { volume, wifi, french } = useStore((state) => ({
    volume: state.volume,
    wifi: state.wifi,
    french: state.french
  }));
  const { toggleFullScreen, setVolume, setBrightness } = useStore((state) => ({
    toggleFullScreen: state.toggleFullScreen,
    setVolume: state.setVolume,
    setBrightness: state.setBrightness
  }));

  useInterval(() => {
    setState((current) => ({ ...current, date: new Date() }));
  }, 60 * 1000);

  useEffect(() => {
    props.setSpotlightBtnRef(spotlightBtnRef);
    controls.volume(volume / 100);
  }, []);

  useEffect(() => {
    const isFull = isFullScreen();
    toggleFullScreen(isFull);
  }, [winWidth, winHeight]);

  const setAudioVolume = (value: number): void => {
    setVolume(value);
    controls.volume(value / 100);
  };

  const setSiteBrightness = (value: number): void => {
    setBrightness(value);
  };

  const toggleControlCenter = (): void => {
    setState((current) => ({
      ...current,
      showControlCenter: !current.showControlCenter,
      showAppleMenu: false,
      showWifiMenu: false
    }));
  };

  const toggleAppleMenu = (): void => {
    setState((current) => ({
      ...current,
      showAppleMenu: !current.showAppleMenu,
      showControlCenter: false,
      showWifiMenu: false
    }));
  };

  const toggleWifiMenu = (): void => {
    setState((current) => ({
      ...current,
      showWifiMenu: !current.showWifiMenu,
      showControlCenter: false,
      showAppleMenu: false
    }));
  };

  const logout = (): void => {
    controls.pause();
    props.setLogin(false);
  };

  const shut = (e: React.MouseEvent): void => {
    controls.pause();
    props.shutMac(e);
  };

  const restart = (e: React.MouseEvent): void => {
    controls.pause();
    props.restartMac(e);
  };

  const sleep = (e: React.MouseEvent): void => {
    controls.pause();
    props.sleepMac(e);
  };

  return (
    <div
      className={`w-full h-8 px-2 fixed top-0 hstack justify-between ${
        props.hide ? "z-0" : "z-20"
      } text-sm text-white bg-gray-700/10 backdrop-blur-2xl transition mac-menubar`}
    >
      <div className="hstack space-x-1">
        <TopBarItem
          className="px-2"
          label={french ? "Menu Pomme" : "Apple menu"}
          forceHover={state.showAppleMenu}
          onClick={toggleAppleMenu}
          ref={appleBtnRef}
        >
          <span className="i-ri:apple-fill text-base" />
        </TopBarItem>
        <TopBarItem
          className="font-semibold px-2"
          onMouseEnter={() => {
            if (state.showAppleMenu) toggleAppleMenu();
          }}
        >
          {french
            ? (
                {
                  "About Anas": "À propos d’Anas",
                  Experience: "Parcours",
                  Expertise: "Compétences"
                } as Record<string, string>
              )[props.title] ?? props.title
            : props.title}
        </TopBarItem>
        <a
          className="mac-menu-link"
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {french ? "CV" : "Résumé"}
        </a>
        <a className="mac-menu-link" href="mailto:dadi.anas@hotmail.fr">
          Contact
        </a>
      </div>

      {/* Open this when clicking on Apple logo */}
      {state.showAppleMenu && (
        <AppleMenu
          logout={logout}
          shut={shut}
          restart={restart}
          sleep={sleep}
          french={french}
          openProfile={() => props.openApp("profile")}
          openExperience={() => props.openApp("experience")}
          openControlCenter={toggleControlCenter}
          toggleAppleMenu={toggleAppleMenu}
          btnRef={appleBtnRef}
        />
      )}

      <div className="hstack flex-row justify-end space-x-2">
        <TopBarItem hideOnMobile={true}>
          <Battery />
        </TopBarItem>
        <TopBarItem
          hideOnMobile={true}
          label="Wi-Fi"
          forceHover={state.showWifiMenu}
          onClick={toggleWifiMenu}
          ref={wifiBtnRef}
        >
          {wifi ? (
            <span className="i-material-symbols:wifi text-lg" />
          ) : (
            <span className="i-material-symbols:wifi-off text-lg" />
          )}
        </TopBarItem>
        <TopBarItem
          ref={spotlightBtnRef}
          onClick={props.toggleSpotlight}
          label="Spotlight"
        >
          <span className="i-bx:search text-[17px]" />
        </TopBarItem>
        <TopBarItem
          forceHover={state.showControlCenter}
          label={french ? "Centre de contrôle" : "Control Center"}
          onClick={toggleControlCenter}
          ref={controlCenterBtnRef}
        >
          <CCMIcon size={16} />
        </TopBarItem>

        {/* Open this when clicking on Wifi button */}
        {state.showWifiMenu && (
          <WifiMenu
            toggleWifiMenu={toggleWifiMenu}
            btnRef={wifiBtnRef}
            french={french}
            openControlCenter={() => {
              toggleWifiMenu();
              toggleControlCenter();
            }}
          />
        )}

        {/* Open this when clicking on Control Center button */}
        {state.showControlCenter && (
          <ControlCenterMenu
            playing={audioState.playing}
            french={french}
            toggleAudio={controls.toggle}
            setVolume={setAudioVolume}
            setBrightness={setSiteBrightness}
            toggleControlCenter={toggleControlCenter}
            btnRef={controlCenterBtnRef}
          />
        )}

        <TopBarItem>
          <span>
            {format(state.date, french ? "EEE d MMM" : "eee MMM d", {
              locale: french ? fr : enUS
            })}
          </span>
          <span>
            {format(state.date, french ? "HH:mm" : "h:mm aa", {
              locale: french ? fr : enUS
            })}
          </span>
        </TopBarItem>
      </div>
    </div>
  );
};

export default TopBar;
