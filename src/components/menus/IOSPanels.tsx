import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { motion, useReducedMotion } from "framer-motion";
import { resumeUrl, type ProfileTab } from "~/configs/profile";
import { music } from "~/configs";

interface IOSPanelProps {
  french: boolean;
  now: Date;
  close: () => void;
  openProfile: (tab: ProfileTab) => void;
  openSkills: () => void;
}

export function IOSControlCenter({
  french,
  now,
  close,
  openProfile,
  openSkills,
  goHome,
  playing,
  toggleAudio,
  setAudioVolume
}: IOSPanelProps & {
  goHome: () => void;
  playing: boolean;
  toggleAudio: () => void;
  setAudioVolume: (value: number) => void;
}) {
  const reducedMotion = useReducedMotion();
  const { wifi, bluetooth, airdrop, dark, brightness, volume } = useStore((state) => ({
    wifi: state.wifi,
    bluetooth: state.bluetooth,
    airdrop: state.airdrop,
    dark: state.dark,
    brightness: state.brightness,
    volume: state.volume
  }));
  const {
    toggleWIFI,
    toggleBluetooth,
    toggleAirdrop,
    toggleDark,
    toggleFrench,
    setBrightness
  } = useStore((state) => ({
    toggleWIFI: state.toggleWIFI,
    toggleBluetooth: state.toggleBluetooth,
    toggleAirdrop: state.toggleAirdrop,
    toggleDark: state.toggleDark,
    toggleFrench: state.toggleFrench,
    setBrightness: state.setBrightness
  }));

  return (
    <motion.section
      className="ios-system-panel ios-cc-panel"
      initial={reducedMotion ? false : { y: -42, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { y: -35, opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={french ? "Centre de contrôle" : "Control Center"}
    >
      <div className="ios-system-topline">
        <span>{format(now, french ? "HH:mm" : "h:mm")}</span>
        <div className="ios-panel-top-actions">
          <span className="i-material-symbols:signal-cellular-alt" aria-hidden="true" />
          <span className="i-material-symbols:wifi" aria-hidden="true" />
          <span className="ios-battery" aria-hidden="true" />
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={french ? "Fermer le centre de contrôle" : "Close Control Center"}
        >
          <span className="i-lucide:x" aria-hidden="true" />
        </button>
      </div>
      <div className="ios-cc-top-grid">
        <div className="ios-cc-connectivity">
          <button type="button" aria-pressed={wifi} onClick={toggleWIFI}>
            <span className="i-lucide:wifi" aria-hidden="true" />
            <small>Wi-Fi</small>
          </button>
          <button type="button" aria-pressed={bluetooth} onClick={toggleBluetooth}>
            <span className="i-lucide:bluetooth" aria-hidden="true" />
            <small>Bluetooth</small>
          </button>
          <button type="button" aria-pressed={airdrop} onClick={toggleAirdrop}>
            <span className="i-lucide:radio-tower" aria-hidden="true" />
            <small>AirDrop</small>
          </button>
          <button type="button" aria-pressed={dark} onClick={toggleDark}>
            <span
              className={dark ? "i-lucide:moon" : "i-lucide:sun"}
              aria-hidden="true"
            />
            <small>{french ? "Apparence" : "Appearance"}</small>
          </button>
        </div>
        <div className="ios-cc-media">
          <span className="ios-cc-album">
            <span className="i-lucide:music-2" aria-hidden="true" />
          </span>
          <div>
            <strong>{music.title}</strong>
            <small>{music.artist}</small>
          </div>
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={
              playing
                ? french
                  ? "Mettre la musique en pause"
                  : "Pause music"
                : french
                  ? "Lancer la musique"
                  : "Play music"
            }
          >
            <span
              className={playing ? "i-lucide:pause" : "i-lucide:play"}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="ios-cc-quick-row">
        <button type="button" onClick={() => openProfile("overview")}>
          <span className="i-lucide:user-round" aria-hidden="true" />
          {french ? "Profil" : "Profile"}
        </button>
        <button type="button" onClick={openSkills}>
          <span className="i-lucide:search" aria-hidden="true" />
          {french ? "Compétences" : "Skills"}
        </button>
      </div>
      <div className="ios-cc-sliders">
        <label>
          <strong>{french ? "Luminosité" : "Brightness"}</strong>
          <input
            type="range"
            min="1"
            max="100"
            value={brightness}
            onChange={(event) => setBrightness(Number(event.target.value))}
            aria-label={french ? "Luminosité du portfolio" : "Portfolio brightness"}
            style={{
              background: `linear-gradient(to top, #fff ${brightness}%, rgba(255,255,255,.22) ${brightness}%)`
            }}
          />
          <span className="i-lucide:sun" aria-hidden="true" />
        </label>
        <label>
          <strong>Volume</strong>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setAudioVolume(Number(event.target.value))}
            aria-label={french ? "Volume du portfolio" : "Portfolio volume"}
            style={{
              background: `linear-gradient(to top, #fff ${volume}%, rgba(255,255,255,.22) ${volume}%)`
            }}
          />
          <span className="i-lucide:volume-2" aria-hidden="true" />
        </label>
      </div>
      <div className="ios-cc-shortcuts">
        <button type="button" onClick={goHome} aria-label={french ? "Accueil" : "Home"}>
          <span className="i-lucide:home" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => openProfile("experience")}
          aria-label={french ? "Parcours" : "Experience"}
        >
          <span className="i-lucide:briefcase-business" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => openProfile("contact")} aria-label="Contact">
          <span className="i-lucide:mail" aria-hidden="true" />
        </button>
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={french ? "Ouvrir le CV" : "Open résumé"}
          onClick={close}
        >
          <span className="i-lucide:file-text" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={toggleFrench}
          aria-label={french ? "Switch to English" : "Passer en français"}
        >
          <span className="i-lucide:languages" aria-hidden="true" />
        </button>
      </div>
      <p className="ios-panel-hint">
        {french ? "Balayez vers le haut pour fermer" : "Swipe up to close"}
      </p>
    </motion.section>
  );
}

export function IOSNotifications({
  french,
  now,
  close,
  openProfile,
  openSkills
}: IOSPanelProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.section
      className="ios-system-panel ios-notifications-panel"
      initial={reducedMotion ? false : { y: -42, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { y: -35, opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={french ? "Centre de notifications" : "Notification Center"}
    >
      <div className="ios-system-topline">
        <span>Notifications</span>
        <button
          type="button"
          onClick={close}
          aria-label={french ? "Fermer les notifications" : "Close notifications"}
        >
          <span className="i-lucide:x" aria-hidden="true" />
        </button>
      </div>
      <div className="ios-notifications-clock">
        <span>
          {format(now, french ? "EEEE d MMMM" : "EEEE, MMMM d", {
            locale: french ? fr : enUS
          })}
        </span>
        <strong>{format(now, french ? "HH:mm" : "h:mm")}</strong>
      </div>
      <div className="ios-notifications-stack">
        <div className="ios-notifications-heading">
          <strong>{french ? "À découvrir" : "Highlights"}</strong>
          <small>ANAS SPACE</small>
        </div>
        <button
          type="button"
          className="ios-notification-card"
          onClick={() => openProfile("experience")}
        >
          <img src="img/icons/system/work.svg" alt="" />
          <span>
            <small>{french ? "PARCOURS" : "EXPERIENCE"}</small>
            <strong>
              {french ? "Mon travail chez BNP Paribas" : "My work at BNP Paribas"}
            </strong>
            <em>
              {french
                ? "DevOps, SRE et orchestration multicloud"
                : "DevOps, SRE and multicloud orchestration"}
            </em>
          </span>
        </button>
        <button type="button" className="ios-notification-card" onClick={openSkills}>
          <img src="img/icons/system/skills.svg" alt="" />
          <span>
            <small>{french ? "COMPÉTENCES" : "SKILLS"}</small>
            <strong>
              {french ? "Explorer mes technologies" : "Explore the technologies"}
            </strong>
            <em>
              {french
                ? "Cloud, sécurité, données et logiciels"
                : "Cloud, security, data and software"}
            </em>
          </span>
        </button>
        <a
          className="ios-notification-card"
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          <img src="img/icons/resume.svg" alt="" />
          <span>
            <small>{french ? "CV" : "RÉSUMÉ"}</small>
            <strong>{french ? "Mon CV complet" : "The full résumé"}</strong>
            <em>{french ? "Consulter le PDF" : "Open the PDF"}</em>
          </span>
        </a>
      </div>
      <p className="ios-panel-hint">
        {french ? "Balayez vers le haut pour fermer" : "Swipe up to close"}
      </p>
    </motion.section>
  );
}
