import type { WebsitesData } from "~/types";

const websites: WebsitesData = {
  favorites: {
    title: "Anas Dadi",
    sites: [
      {
        id: "resume",
        title: "Résumé",
        img: "img/icons/resume.svg",
        link: "/resume.pdf?v=2026-10-12"
      },
      {
        id: "github",
        title: "GitHub",
        img: "img/icons/system/github.svg?v=2",
        link: "https://github.com/DadiAnas"
      },
      {
        id: "linkedin",
        title: "LinkedIn",
        img: "img/icons/system/linkedin.svg",
        link: "https://www.linkedin.com/in/dadianas"
      },
      {
        id: "email",
        title: "Email",
        img: "img/icons/contact-mail.svg",
        link: "mailto:dadi.anas@hotmail.fr"
      }
    ]
  }
};

export default websites;
