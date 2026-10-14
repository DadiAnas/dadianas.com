import { music } from "~/configs";

interface CCMProps {
  french: boolean;
  toggleControlCenter: () => void;
  toggleAudio: (target: boolean) => void;
  seekAudio: (seconds: number) => void;
  setBrightness: (value: number) => void;
  setVolume: (value: number) => void;
  playing: boolean;
  btnRef: React.RefObject<HTMLDivElement>;
}

export default function ControlCenterMenu({
  french,
  toggleControlCenter,
  toggleAudio,
  seekAudio,
  setBrightness,
  setVolume,
  playing,
  btnRef
}: CCMProps) {
  const controlCenterRef = useRef<HTMLDivElement>(null);
  const { dark, wifi, brightness, bluetooth, airdrop, fullscreen, volume } = useStore(
    (state) => ({
      dark: state.dark,
      wifi: state.wifi,
      brightness: state.brightness,
      bluetooth: state.bluetooth,
      airdrop: state.airdrop,
      fullscreen: state.fullscreen,
      volume: state.volume
    })
  );
  const { toggleWIFI, toggleBluetooth, toggleAirdrop, toggleDark, toggleFullScreen } =
    useStore((state) => ({
      toggleWIFI: state.toggleWIFI,
      toggleBluetooth: state.toggleBluetooth,
      toggleAirdrop: state.toggleAirdrop,
      toggleDark: state.toggleDark,
      toggleFullScreen: state.toggleFullScreen
    }));
  useClickOutside(controlCenterRef, toggleControlCenter, [btnRef]);

  return (
    <section
      className="mac-control-center"
      ref={controlCenterRef}
      aria-label={french ? "Centre de contrôle" : "Control Center"}
    >
      <div className="mac-control-top">
        <div className="mac-control-connectivity">
          <button type="button" aria-pressed={wifi} onClick={toggleWIFI}>
            <span className="mac-control-icon" aria-hidden="true">
              <span className="i-lucide:wifi" />
            </span>
            <span>
              <strong>Wi-Fi</strong>
              <small>
                {wifi
                  ? french
                    ? "Connecté"
                    : "Connected"
                  : french
                    ? "Désactivé"
                    : "Off"}
              </small>
            </span>
            <span
              className="mac-control-chevron i-lucide:chevron-right"
              aria-hidden="true"
            />
          </button>
          <button type="button" aria-pressed={bluetooth} onClick={toggleBluetooth}>
            <span className="mac-control-icon" aria-hidden="true">
              <span className="i-lucide:bluetooth" />
            </span>
            <span>
              <strong>Bluetooth</strong>
              <small>
                {bluetooth ? (french ? "Activé" : "On") : french ? "Désactivé" : "Off"}
              </small>
            </span>
            <span
              className="mac-control-chevron i-lucide:chevron-right"
              aria-hidden="true"
            />
          </button>
          <button type="button" aria-pressed={airdrop} onClick={toggleAirdrop}>
            <span className="mac-control-icon" aria-hidden="true">
              <span className="i-lucide:radio-tower" />
            </span>
            <span>
              <strong>AirDrop</strong>
              <small>
                {airdrop
                  ? french
                    ? "Contacts uniquement"
                    : "Contacts Only"
                  : french
                    ? "Désactivé"
                    : "Off"}
              </small>
            </span>
            <span
              className="mac-control-chevron i-lucide:chevron-right"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="mac-control-media">
          <img className="mac-control-cover" src={music.cover} alt="" />
          <div className="mac-control-track">
            <strong>{music.title}</strong>
            <small>{music.artist}</small>
          </div>
          <div className="mac-control-transport">
            <button
              type="button"
              aria-label={french ? "Reculer de 15 secondes" : "Back 15 seconds"}
              onClick={() => seekAudio(-15)}
            >
              <span className="i-ion:play-skip-back" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={
                playing
                  ? french
                    ? "Mettre la musique en pause"
                    : "Pause music"
                  : french
                    ? "Lancer la musique"
                    : "Play music"
              }
              onClick={() => toggleAudio(!playing)}
            >
              <span
                className={playing ? "i-ion:pause" : "i-ion:play"}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              aria-label={french ? "Avancer de 15 secondes" : "Forward 15 seconds"}
              onClick={() => seekAudio(15)}
            >
              <span className="i-ion:play-skip-forward" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="mac-control-actions">
        <button
          className="mac-control-appearance"
          type="button"
          aria-pressed={dark}
          aria-label={
            dark
              ? french
                ? "Activer le mode clair"
                : "Turn on Light Mode"
              : french
                ? "Activer le mode sombre"
                : "Turn on Dark Mode"
          }
          onClick={toggleDark}
        >
          <span className={dark ? "i-lucide:sun" : "i-lucide:moon"} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-pressed={fullscreen}
          onClick={() => toggleFullScreen(!fullscreen)}
        >
          <span
            className={fullscreen ? "i-lucide:minimize" : "i-lucide:maximize"}
            aria-hidden="true"
          />
          {fullscreen
            ? french
              ? "Quitter le plein écran"
              : "Exit Fullscreen"
            : french
              ? "Plein écran"
              : "Fullscreen"}
        </button>
      </div>
      <label className="mac-control-slider">
        <strong>{french ? "Écran" : "Display"}</strong>
        <span>
          <span className="i-lucide:sun" aria-hidden="true" />
          <input
            type="range"
            min="1"
            max="100"
            value={brightness}
            onChange={(event) => setBrightness(Number(event.target.value))}
            aria-label={french ? "Luminosité de l’écran" : "Display brightness"}
            style={{
              background: `linear-gradient(to right, #f8faff ${brightness}%, #596073 ${brightness}%)`
            }}
          />
          <span className="i-lucide:sun" aria-hidden="true" />
        </span>
      </label>
      <label className="mac-control-slider">
        <strong>{french ? "Son" : "Sound"}</strong>
        <span>
          <span className="i-lucide:volume-1" aria-hidden="true" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label={french ? "Volume sonore" : "Sound volume"}
            style={{
              background: `linear-gradient(to right, #f8faff ${volume}%, #596073 ${volume}%)`
            }}
          />
          <span className="i-lucide:volume-2" aria-hidden="true" />
        </span>
      </label>
    </section>
  );
}
