import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Anas Dadi",
    icon: "i-iconamoon:profile-duotone",
    md: [
      {
        id: "about-me",
        title: "Overview",
        file: "markdown/profile/about-me.md",
        icon: "i-lucide:user-round",
        excerpt: "Cloud architecture, DevSecOps and SRE"
      },
      {
        id: "about-me-fr",
        title: "En français",
        file: "markdown/profile/about-me-fr.md",
        icon: "i-circle-flags:fr",
        excerpt: "Parcours, expertise et expérience"
      },
      {
        id: "contact",
        title: "Contact",
        file: "markdown/profile/contacts.md",
        icon: "i-lucide:mail",
        excerpt: "Let's work together"
      }
    ]
  }
];

export default bear;
