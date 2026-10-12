import type { AppsData } from "~/types";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/system/apps.svg"
  },
  {
    id: "profile",
    title: "About Anas",
    desktop: true,
    width: 1120,
    height: 640,
    show: true,
    y: -15,
    img: "img/icons/system/finder.svg",
    content: <Profile />
  },
  {
    id: "resume",
    title: "Résumé",
    desktop: false,
    img: "img/icons/resume.svg",
    link: "/resume.pdf?v=2026-10-12"
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    desktop: false,
    img: "img/icons/system/linkedin.svg",
    link: "https://linkedin.com/in/dadianas"
  },
  {
    id: "github",
    title: "GitHub",
    desktop: false,
    img: "img/icons/system/github.svg",
    link: "https://github.com/dadianas"
  },
  {
    id: "email",
    title: "Email",
    desktop: false,
    img: "img/icons/contact-mail.svg",
    link: "mailto:dadi.anas@hotmail.fr"
  }
];

export default apps;
