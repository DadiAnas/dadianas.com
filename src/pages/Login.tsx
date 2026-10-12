import React from "react";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { user } from "~/configs";
import type { MacActions } from "~/types";

export default function Login(props: MacActions) {
  const dark = useStore((state) => state.dark);
  const french = useStore((state) => state.french);
  const { winWidth } = useWindowSize();
  const [now, setNow] = useState(new Date());
  const touchStart = useRef(0);

  useInterval(() => setNow(new Date()), 60_000);

  if (winWidth < 640) {
    return (
      <div
        className={`ios-lock mac-wallpaper ${dark ? "mac-wallpaper-dark" : ""}`}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientY;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current - event.changedTouches[0].clientY > 60)
            props.setLogin(true);
        }}
      >
        <div className="ios-dynamic-island" aria-hidden="true" />
        <div className="ios-lock-date">
          {format(now, french ? "EEEE d MMMM" : "EEEE, MMMM d", {
            locale: french ? fr : enUS
          })}
        </div>
        <div className="ios-lock-time">{format(now, "h:mm")}</div>
        <div className="ios-lock-bottom">
          <span className="ios-lock-owner">Anas Dadi · DevSecOps / SRE</span>
          <button
            type="button"
            onClick={() => props.setLogin(true)}
            aria-label={french ? "Ouvrir le portfolio" : "Open portfolio"}
          >
            <span className="i-lucide:chevron-up" aria-hidden="true" />
            <span>
              {french ? "Balayer vers le haut pour ouvrir" : "Swipe up to open"}
            </span>
          </button>
        </div>
        <div className="ios-home-indicator" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`mac-lock mac-wallpaper ${dark ? "mac-wallpaper-dark" : ""}`}>
      <div className="mac-lock-clock">
        <span>
          {format(now, french ? "EEEE d MMMM" : "EEEE, MMMM d", {
            locale: french ? fr : enUS
          })}
        </span>
        <strong>{format(now, "h:mm")}</strong>
      </div>
      <div className="mac-lock-user">
        <img src={user.avatar} alt="" />
        <h1>{user.name}</h1>
        <p>DevSecOps · SRE · {french ? "Architecture cloud" : "Cloud architecture"}</p>
        <button
          type="button"
          onClick={() => props.setLogin(true)}
          aria-label={
            french ? "Ouvrir le portfolio d’Anas Dadi" : "Open Anas Dadi portfolio"
          }
        >
          <span className="i-lucide:arrow-right" aria-hidden="true" />
        </button>
      </div>
      <div className="mac-lock-actions">
        <button type="button" onClick={(event) => props.sleepMac(event)}>
          <span className="mac-action-icon">
            <span className="i-lucide:moon" aria-hidden="true" />
          </span>
          {french ? "Mettre en veille" : "Sleep"}
        </button>
        <button type="button" onClick={(event) => props.restartMac(event)}>
          <span className="mac-action-icon">
            <span className="i-lucide:rotate-cw" aria-hidden="true" />
          </span>
          {french ? "Redémarrer" : "Restart"}
        </button>
        <button type="button" onClick={(event) => props.shutMac(event)}>
          <span className="mac-action-icon">
            <span className="i-lucide:power" aria-hidden="true" />
          </span>
          {french ? "Éteindre" : "Shut down"}
        </button>
      </div>
    </div>
  );
}
