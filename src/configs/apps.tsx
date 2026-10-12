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
    titleFr: "À propos d’Anas",
    desktop: true,
    width: 1120,
    height: 640,
    show: true,
    y: -15,
    img: "img/icons/system/finder.svg",
    content: <Profile />
  },
  {
    id: "experience",
    title: "Experience",
    titleFr: "Parcours",
    desktop: true,
    width: 1120,
    height: 640,
    img: "img/icons/system/work.svg",
    content: <Profile initialTab="experience" />
  },
  {
    id: "expertise",
    title: "Expertise",
    titleFr: "Compétences",
    desktop: true,
    width: 1120,
    height: 640,
    img: "img/icons/system/skills.svg",
    content: <Profile initialTab="expertise" />
  },
  {
    id: "resume",
    title: "Résumé",
    titleFr: "CV",
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
    titleFr: "E-mail",
    desktop: false,
    img: "img/icons/contact-mail.svg",
    link: "mailto:dadi.anas@hotmail.fr"
  }
];

export default apps;
