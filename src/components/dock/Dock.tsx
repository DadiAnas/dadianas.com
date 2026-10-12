import { useMotionValue } from "framer-motion";
import { apps } from "~/configs";

interface DockProps {
  open: (id: string) => void;
  showApps: {
    [key: string]: boolean;
  };
  showLaunchpad: boolean;
  toggleLaunchpad: (target: boolean) => void;
  hide: boolean;
}

export default function Dock({
  open,
  showApps,
  showLaunchpad,
  toggleLaunchpad,
  hide
}: DockProps) {
  const { dockSize, dockMag, french } = useStore((state) => ({
    dockSize: state.dockSize,
    dockMag: state.dockMag,
    french: state.french
  }));

  const openApp = (id: string) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue<number | null>(null);

  return (
    <div
      className={`dock fixed inset-x-0 mx-auto bottom-2 ${hide ? "z-0" : "z-50"}`}
      w="full sm:max"
      overflow="x-scroll sm:x-visible"
    >
      <ul
        className="flex space-x-1.5 px-2 backdrop-blur-2xl mac-dock"
        border="~ c-400/40 rounded-none sm:rounded-xl"
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          height: `${(dockSize + 12) / 16}rem`
        }}
      >
        {apps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={french ? app.titleFr ?? app.title : app.title}
            french={french}
            img={app.img}
            mouseX={mouseX}
            openApp={openApp}
            isOpen={app.desktop && showApps[app.id]}
            link={app.link}
            dockSize={dockSize}
            dockMag={dockMag}
          />
        ))}
      </ul>
    </div>
  );
}
