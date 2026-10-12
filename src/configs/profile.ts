export type ProfileTab =
  | "overview"
  | "experience"
  | "expertise"
  | "education"
  | "contact";
export type ExperienceTopic =
  | "Cloud"
  | "Reliability"
  | "Security"
  | "Data & AI"
  | "Software";

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  kind: "Professional" | "Internship";
  topics: ExperienceTopic[];
  summary: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "bnp",
    company: "BNP Paribas",
    role: "DevOps / SRE — Infrastructure & Orchestration Expert",
    period: "Aug 2024 – Present",
    kind: "Professional",
    topics: ["Cloud", "Reliability", "Security", "Data & AI"],
    summary:
      "Operating multicloud orchestration and production platforms across IBM Cloud, AWS and Azure.",
    highlights: [
      "Design and operate highly available Kubernetes clusters, CI/CD pipelines, and Terraform and Ansible infrastructure.",
      "Build Airflow workflows for scheduled and event-driven infrastructure and data operations.",
      "Lead N3/L3 incident response across Go, Java, Python and Node.js services; define SLIs, SLOs and runbooks.",
      "Automate ServiceNow incident workflows and context-aware security notifications.",
      "Enforce SAST, DAST and quality gates; manage secrets with Vault and adopt GitOps practices.",
      "Build observability with Dynatrace, Prometheus, VictoriaMetrics and Grafana, and improve capacity and cost."
    ]
  },
  {
    id: "stellantis",
    company: "Coral-io / Stellantis",
    role: "Cloud / DevSecOps Architect",
    period: "Sep 2023 – Aug 2024",
    kind: "Professional",
    topics: ["Cloud", "Security"],
    summary: "Led large-scale migration from on-premises data centers to AWS and Azure.",
    highlights: [
      "Planned migrations of thousands of projects, coordinating teams and establishing cloud landing zones.",
      "Designed infrastructure with HCP Terraform, CloudFormation and Azure Resource Manager.",
      "Built secure CI/CD pipelines and integrated security checks and IaC documentation.",
      "Created migration runbooks and disaster recovery strategies using Azure Site Recovery and AWS Backup.",
      "Assessed risk, compliance, performance and cost across multicloud accounts and tenants."
    ]
  },
  {
    id: "icade",
    company: "Coral-io / Icade",
    role: "DevOps / SRE Consultant",
    period: "Aug 2022 – Aug 2023",
    kind: "Professional",
    topics: ["Cloud", "Reliability", "Security"],
    summary:
      "Modernized application delivery and operations, including a move from vSphere to Kubernetes.",
    highlights: [
      "Built GitLab CI and Jenkins delivery systems and containerized FastAPI, Django, Flask, Laravel and Symfony services.",
      "Migrated workloads from vSphere to Kubernetes clusters on LXD hypervisors.",
      "Established monitoring and logs with Grafana, Prometheus, VictoriaMetrics, Zabbix, Loki and Promtail.",
      "Managed PostgreSQL, Redis, Elasticsearch and MariaDB; secured secrets with Vault and ExternalSecrets.",
      "Automated operations with Python, Bash and Go and configured Ceph, GlusterFS, Longhorn and OpenEBS storage."
    ]
  },
  {
    id: "avito",
    company: "Avito.ma / Frontier Digital Ventures",
    role: "DevOps / Cloud Engineer",
    period: "Sep 2021 – Aug 2022",
    kind: "Professional",
    topics: ["Cloud", "Reliability", "Data & AI"],
    summary:
      "Operated AWS infrastructure and EKS while building data and machine-learning workflows.",
    highlights: [
      "Managed AWS infrastructure with Terraform and CloudFormation and automated configuration with Ansible.",
      "Operated Kubernetes on EKS, databases, secrets and CloudWatch, Grafana and Prometheus monitoring.",
      "Created Kubernetes operators for Traefik IngressRoute and PrometheusRules.",
      "Implemented Kafka streams, log anomaly detection, image recognition and recommendation systems.",
      "Developed analytics dashboards and used NLP to improve search and categorization."
    ]
  },
  {
    id: "dxc",
    company: "DXC Technology",
    role: "BI / Big Data Engineer",
    period: "Feb 2021 – Jun 2021",
    kind: "Internship",
    topics: ["Reliability", "Data & AI"],
    summary: "Implemented an IT monitoring and reporting business-intelligence solution.",
    highlights: [
      "Worked with Zabbix, VMware ESXi, Kubernetes, Helm, Docker, Grafana, Elasticsearch, Fluent Bit and Kibana."
    ]
  },
  {
    id: "enset",
    company: "ENSET Mohammedia",
    role: "AI Software Developer",
    period: "Oct 2020 – Dec 2020",
    kind: "Internship",
    topics: ["Data & AI", "Software"],
    summary: "Built an AI chatbot with a Python backend and a mobile interface.",
    highlights: [
      "Used Flask and TensorFlow, deployed on Heroku, and developed the mobile app with React Native."
    ]
  },
  {
    id: "abboud",
    company: "Abboud Foodstuff Trading",
    role: "Full Stack Engineer",
    period: "Jul 2020 – Aug 2020",
    kind: "Internship",
    topics: ["Software"],
    summary: "Designed and developed a web-based stock management application.",
    highlights: [
      "Built the backend in NestJS, the frontend in React, and the interface designs in Figma."
    ]
  },
  {
    id: "barid",
    company: "Barid-Al-Maghrib",
    role: "Project Team Manager",
    period: "Jul 2019 – Aug 2019",
    kind: "Internship",
    topics: ["Software"],
    summary: "Led a three-developer team and built internal furniture-management tools.",
    highlights: ["Developed a Flask application and led a PHP web project."]
  }
];

export const expertise = [
  {
    title: "Cloud & infrastructure",
    description: "Designing and operating platforms across providers.",
    skills: [
      "AWS",
      "Azure",
      "IBM Cloud",
      "GCP",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Ansible",
      "Helm"
    ]
  },
  {
    title: "Delivery & security",
    description: "Keeping changes repeatable, reviewable and secure.",
    skills: [
      "GitLab CI",
      "Jenkins",
      "GitHub Actions",
      "GitOps",
      "HashiCorp Vault",
      "SAST / DAST",
      "Trivy",
      "SonarQube"
    ]
  },
  {
    title: "Reliability & observability",
    description: "Making production systems understandable and resilient.",
    skills: [
      "Prometheus",
      "Grafana",
      "VictoriaMetrics",
      "Dynatrace",
      "Loki",
      "ServiceNow",
      "SLIs / SLOs",
      "Incident response"
    ]
  },
  {
    title: "Data & engineering",
    description: "Connecting platform operations with data workloads.",
    skills: [
      "Apache Airflow",
      "Kafka",
      "Python",
      "Go",
      "PostgreSQL",
      "Elasticsearch",
      "TensorFlow",
      "PyTorch"
    ]
  }
];

export const resumeUrl = "/resume.pdf?v=2026-10-12";
