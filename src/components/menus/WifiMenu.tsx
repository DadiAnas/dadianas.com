interface WifiMenuProps {
  toggleWifiMenu: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
  french: boolean;
  openControlCenter: () => void;
}

export default function WifiMenu({
  toggleWifiMenu,
  btnRef,
  french,
  openControlCenter
}: WifiMenuProps) {
  const wifiRef = useRef<HTMLElement>(null);
  const { wifi, toggleWIFI } = useStore((state) => ({
    wifi: state.wifi,
    toggleWIFI: state.toggleWIFI
  }));

  useClickOutside(wifiRef, toggleWifiMenu, [btnRef]);

  return (
    <section
      className="mac-wifi-menu"
      ref={wifiRef}
      role="dialog"
      aria-label={french ? "Menu Wi-Fi" : "Wi-Fi menu"}
    >
      <header className="mac-wifi-header">
        <strong>Wi-Fi</strong>
        <label className="mac-wifi-switch">
          <input
            type="checkbox"
            checked={wifi}
            onChange={toggleWIFI}
            aria-label={
              wifi
                ? french
                  ? "Désactiver le Wi-Fi"
                  : "Turn Wi-Fi off"
                : french
                  ? "Activer le Wi-Fi"
                  : "Turn Wi-Fi on"
            }
          />
          <span aria-hidden="true" />
        </label>
      </header>
      {wifi ? (
        <>
          <p className="mac-wifi-current">
            {french ? "Connecté à Anas Space" : "Connected to Anas Space"}
          </p>
          <div className="mac-wifi-group">
            <h3>{french ? "Partage de connexion" : "Personal Hotspot"}</h3>
            <div className="mac-wifi-row mac-wifi-muted">
              <span className="mac-wifi-icon" aria-hidden="true">
                <span className="i-lucide:link-2" />
              </span>
              {french ? "Aucun partage connecté" : "No hotspot connected"}
            </div>
          </div>
          <div className="mac-wifi-group">
            <h3>{french ? "Réseau connu" : "Known Network"}</h3>
            <div className="mac-wifi-row">
              <span className="mac-wifi-icon mac-wifi-icon-active" aria-hidden="true">
                <span className="i-lucide:wifi" />
              </span>
              <span>Anas Space</span>
              <span className="i-lucide:lock-keyhole mac-wifi-lock" aria-hidden="true" />
            </div>
          </div>
          <details className="mac-wifi-other">
            <summary>
              {french ? "Autres réseaux" : "Other Networks"}
              <span className="i-lucide:chevron-right" aria-hidden="true" />
            </summary>
            <p>
              {french
                ? "Les réseaux à proximité sont gérés par votre appareil."
                : "Nearby networks are managed by your device."}
            </p>
          </details>
        </>
      ) : (
        <p className="mac-wifi-off">{french ? "Wi-Fi désactivé" : "Wi-Fi is off"}</p>
      )}
      <button className="mac-wifi-settings" type="button" onClick={openControlCenter}>
        {french ? "Réglages Wi-Fi…" : "Wi-Fi Settings…"}
      </button>
    </section>
  );
}
