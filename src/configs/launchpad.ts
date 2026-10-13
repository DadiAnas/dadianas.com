import type { LaunchpadData } from "~/types";
import { resumeUrl } from "~/configs/profile";

const launchpadApps: LaunchpadData[] = [
  {
    id: "resume",
    title: "Résumé",
    img: "img/icons/resume.svg",
    link: resumeUrl
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    img: "img/icons/system/linkedin.svg",
    link: "https://www.linkedin.com/in/dadianas"
  },
  {
    id: "github",
    title: "GitHub",
    img: "img/icons/system/github.svg?v=2",
    link: "https://github.com/DadiAnas"
  }
];

export default launchpadApps;
