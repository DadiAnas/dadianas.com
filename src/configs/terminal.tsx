import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>Anas Dadi · DevSecOps / SRE Engineer and Cloud Architect in Paris.</div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content:
          "DevOps / Cloud Computing / Security / Big Data / Artificial Intelligence"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content: "Open to hybrid and fully remote roles and freelance engagements."
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:dadi.anas@hotmail.fr"
                target="_blank"
                rel="noreferrer"
              >
                dadi.anas@hotmail.fr
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/dadianas"
                target="_blank"
                rel="noreferrer"
              >
                @DadiAnas
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/dadianas"
                target="_blank"
                rel="noreferrer"
              >
                dadianas
              </a>
            </li>
            <li>
              Personal Website:{" "}
              <a
                className="text-blue-300"
                href="https://dadianas.com"
                target="_blank"
                rel="noreferrer"
              >
                https://dadianas.com
              </a>
            </li>
          </ul>
        )
      }
    ]
  }
];

export default terminal;
