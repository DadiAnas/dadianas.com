import type { AppsData } from "~/types";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/launchpad.png"
  },
  {
    id: "bear",
    title: "Profile",
    desktop: true,
    width: 1000,
    height: 500,
    show: true,
    y: -40,
    img: "img/icons/bear.png",
    content: <Bear />
  },
  {
    id: "resume",
    title: "Résumé",
    desktop: false,
    img: "img/icons/resume.svg",
    link: "/resume.pdf?v=2026-10-12"
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    x: -20,
    img: "img/icons/safari.png",
    content: <Safari />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    img: "img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "linkedin",
    title: "Linkedin",
    desktop: false,
    img: "img/icons/launchpad/linkedin.png",
    link: "https://linkedin.com/in/dadianas"
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/icons/github.png",
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
