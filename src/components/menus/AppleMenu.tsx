import React from "react";
import { resumeUrl } from "~/configs/profile";

interface AppleMenuProps {
  french: boolean;
  logout: () => void;
  shut: (e: React.MouseEvent) => void;
  restart: (e: React.MouseEvent) => void;
  sleep: (e: React.MouseEvent) => void;
  openProfile: () => void;
  openExperience: () => void;
  openControlCenter: () => void;
  toggleAppleMenu: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
}

export default function AppleMenu({
  french,
  logout,
  shut,
  restart,
  sleep,
  openProfile,
  openExperience,
  openControlCenter,
  toggleAppleMenu,
  btnRef
}: AppleMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, toggleAppleMenu, [btnRef]);
  const run = (action: () => void) => () => {
    toggleAppleMenu();
    action();
  };

  return (
    <div
      className="mac-apple-menu"
      ref={ref}
      role="menu"
      aria-label={french ? "Menu Pomme" : "Apple menu"}
    >
      <div className="mac-apple-menu-group">
        <button type="button" role="menuitem" onClick={run(openProfile)}>
          <span className="i-lucide:contact" aria-hidden="true" />{" "}
          {french ? "À propos d’Anas Dadi" : "About Anas Dadi"}
        </button>
      </div>
      <div className="mac-apple-menu-group">
        <button type="button" role="menuitem" onClick={run(openControlCenter)}>
          <span className="i-lucide:sliders-horizontal" aria-hidden="true" />{" "}
          {french ? "Centre de contrôle…" : "Control Center…"}
        </button>
        <button type="button" role="menuitem" onClick={run(openExperience)}>
          <span className="i-lucide:briefcase-business" aria-hidden="true" />{" "}
          {french ? "Parcours" : "Experience"}
          <span className="mac-apple-chevron" aria-hidden="true">
            ›
          </span>
        </button>
        <a
          role="menuitem"
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={toggleAppleMenu}
        >
          <span className="i-lucide:file-text" aria-hidden="true" />{" "}
          {french ? "CV" : "Résumé"}
        </a>
      </div>
      <div className="mac-apple-menu-group">
        <button type="button" role="menuitem" onClick={sleep}>
          {french ? "Mettre en veille" : "Sleep"}
        </button>
        <button type="button" role="menuitem" onClick={restart}>
          {french ? "Redémarrer…" : "Restart…"}
        </button>
        <button type="button" role="menuitem" onClick={shut}>
          {french ? "Éteindre…" : "Shut Down…"}
        </button>
      </div>
      <div className="mac-apple-menu-group">
        <button type="button" role="menuitem" onClick={logout}>
          {french ? "Verrouiller l’écran" : "Lock Screen"}
        </button>
        <button type="button" role="menuitem" onClick={logout}>
          {french ? "Fermer la session d’Anas DADI…" : "Log Out Anas DADI…"}
        </button>
      </div>
    </div>
  );
}
