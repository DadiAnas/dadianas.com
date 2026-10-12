import type { StateCreator } from "zustand";
import { enterFullScreen, exitFullScreen } from "~/utils";

export interface SystemSlice {
  french: boolean;
  dark: boolean;
  volume: number;
  brightness: number;
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  fullscreen: boolean;
  toggleDark: () => void;
  toggleFrench: () => void;
  toggleWIFI: () => void;
  toggleBluetooth: () => void;
  toggleAirdrop: () => void;
  toggleFullScreen: (v: boolean) => void;
  setVolume: (v: number) => void;
  setBrightness: (v: number) => void;
}

const savedLanguage = localStorage.getItem("portfolio-language");
const initialFrench = savedLanguage
  ? savedLanguage === "fr"
  : navigator.language.startsWith("fr");
document.documentElement.lang = initialFrench ? "fr" : "en";

export const createSystemSlice: StateCreator<SystemSlice> = (set) => ({
  french: initialFrench,
  dark: false,
  volume: 100,
  brightness: 80,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  fullscreen: false,
  toggleDark: () =>
    set((state) => {
      if (!state.dark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return { dark: !state.dark };
    }),
  toggleFrench: () =>
    set((state) => {
      const french = !state.french;
      localStorage.setItem("portfolio-language", french ? "fr" : "en");
      document.documentElement.lang = french ? "fr" : "en";
      return { french };
    }),
  toggleWIFI: () => set((state) => ({ wifi: !state.wifi })),
  toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
  toggleAirdrop: () => set((state) => ({ airdrop: !state.airdrop })),
  toggleFullScreen: (v) =>
    set(() => {
      v ? enterFullScreen() : exitFullScreen();
      return { fullscreen: v };
    }),
  setVolume: (v) => set(() => ({ volume: v })),
  setBrightness: (v) => set(() => ({ brightness: v }))
});
