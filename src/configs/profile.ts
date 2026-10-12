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
  fr: { role: string; period: string; summary: string; highlights: string[] };
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
      "Build observability with Dynatrace, Prometheus, VictoriaMetrics and Grafana, and improve capacity and cost.",
      "Develop custom Kubernetes operators and service mesh solutions for platform needs.",
      "Improve resilience through chaos engineering, database tuning and replication strategies.",
      "Mentor junior engineers, maintain runbooks and documentation, and optimize CI/CD artifact repositories.",
      "Apply machine learning to system metrics for anomaly detection and predictive incident analysis."
    ],
    fr: {
      role: "Ingénieur DevOps / SRE — expert infrastructure et orchestration",
      period: "Août 2024 – Aujourd’hui",
      summary:
        "Exploitation de plateformes de production et d’orchestrateurs multicloud sur IBM Cloud, AWS et Azure.",
      highlights: [
        "Conception de clusters Kubernetes hautement disponibles, de pipelines CI/CD et d’infrastructures Terraform et Ansible.",
        "Orchestration des traitements de données et d’infrastructure avec Apache Airflow, par planification et événements.",
        "Pilotage des incidents N3 sur des services Go, Java, Python et Node.js ; définition des SLI, SLO et procédures d’intervention.",
        "Automatisation des incidents ServiceNow et des notifications de sécurité contextualisées.",
        "Mise en place de contrôles SAST, DAST et qualité ; gestion des secrets avec Vault et adoption de GitOps.",
        "Observabilité avec Dynatrace, Prometheus, VictoriaMetrics et Grafana ; optimisation de la capacité et des coûts.",
        "Développement d’opérateurs Kubernetes et de solutions de service mesh adaptées aux besoins de la plateforme.",
        "Amélioration de la résilience par le chaos engineering, l’optimisation des bases de données et la réplication.",
        "Accompagnement d’ingénieurs juniors, rédaction de procédures et optimisation des dépôts d’artefacts CI/CD.",
        "Application de l’apprentissage automatique aux métriques pour détecter les anomalies et anticiper les incidents."
      ]
    }
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
      "Assessed risk, compliance, performance and cost across multicloud accounts and tenants.",
      "Operated AWS and Azure services including EC2, RDS, Lambda, IAM, KMS, Azure SQL and Cosmos DB; built Power BI and QuickSight dashboards."
    ],
    fr: {
      role: "Architecte cloud / DevSecOps",
      period: "Sept. 2023 – Août 2024",
      summary:
        "Pilotage de migrations à grande échelle de centres de données internes vers AWS et Azure.",
      highlights: [
        "Planification de la migration de milliers de projets, coordination des équipes et création de landing zones cloud.",
        "Conception de l’infrastructure avec HCP Terraform, CloudFormation et Azure Resource Manager.",
        "Sécurisation des pipelines CI/CD, intégration des contrôles de sécurité et documentation automatisée de l’IaC.",
        "Rédaction de procédures de migration et de plans de reprise avec Azure Site Recovery et AWS Backup.",
        "Analyse des risques, de la conformité, des performances et des coûts dans des environnements multicomptes et multilocataires.",
        "Exploitation de services AWS et Azure, notamment EC2, EKS/AKS, RDS, Lambda, IAM, KMS, Azure SQL et Cosmos DB ; tableaux de bord Power BI et QuickSight."
      ]
    }
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
    ],
    fr: {
      role: "Consultant DevOps / SRE",
      period: "Août 2022 – Août 2023",
      summary:
        "Modernisation des déploiements et de l’exploitation, avec migration de vSphere vers Kubernetes.",
      highlights: [
        "Mise en place de GitLab CI et Jenkins ; conteneurisation de services FastAPI, Django, Flask, Laravel et Symfony.",
        "Migration de charges vSphere vers des clusters Kubernetes sur des hyperviseurs LXD.",
        "Supervision et journalisation avec Grafana, Prometheus, VictoriaMetrics, Zabbix, Loki et Promtail.",
        "Administration de PostgreSQL, Redis, Elasticsearch et MariaDB ; gestion des secrets avec Vault et External Secrets.",
        "Automatisation en Python, Bash et Go ; stockage distribué avec Ceph, GlusterFS, Longhorn et OpenEBS."
      ]
    }
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
      "Developed analytics dashboards and used NLP to improve search and categorization.",
      "Developed YOLO and SSD object detection models and image recognition solutions."
    ],
    fr: {
      role: "Ingénieur DevOps / Cloud",
      period: "Sept. 2021 – Août 2022",
      summary:
        "Exploitation d’infrastructures AWS et EKS, avec réalisation de projets de données et d’apprentissage automatique.",
      highlights: [
        "Gestion de l’infrastructure AWS avec Terraform et CloudFormation et automatisation des configurations avec Ansible.",
        "Exploitation de Kubernetes sur EKS, des bases de données, des secrets et de la supervision CloudWatch, Grafana et Prometheus.",
        "Création d’opérateurs Kubernetes pour Traefik IngressRoute et PrometheusRules.",
        "Mise en œuvre de flux Kafka, de la détection d’anomalies dans les journaux, de la reconnaissance d’images et de systèmes de recommandation.",
        "Création de tableaux de bord analytiques et utilisation du TAL pour améliorer la recherche et la catégorisation.",
        "Développement de modèles de détection d’objets YOLO et SSD et de solutions de reconnaissance d’images."
      ]
    }
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
    ],
    fr: {
      role: "Ingénieur BI / Big Data",
      period: "Fév. 2021 – Juin 2021",
      summary:
        "Réalisation d’une solution de supervision et de reporting décisionnel pour l’informatique.",
      highlights: [
        "Utilisation de Zabbix, VMware ESXi, Kubernetes, Helm, Docker, Grafana, Elasticsearch, Fluent Bit et Kibana."
      ]
    }
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
    ],
    fr: {
      role: "Développeur logiciel IA",
      period: "Oct. 2020 – Déc. 2020",
      summary: "Développement d’un chatbot IA avec backend Python et application mobile.",
      highlights: [
        "Backend Flask et TensorFlow, déploiement sur Heroku et application mobile React Native."
      ]
    }
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
    ],
    fr: {
      role: "Ingénieur full stack",
      period: "Juil. 2020 – Août 2020",
      summary: "Conception et développement d’une application web de gestion des stocks.",
      highlights: ["Backend NestJS, interface React et maquettes conçues avec Figma."]
    }
  },
  {
    id: "barid",
    company: "Barid-Al-Maghrib",
    role: "Project Team Manager",
    period: "Jul 2019 – Aug 2019",
    kind: "Internship",
    topics: ["Software"],
    summary: "Led a three-developer team and built internal furniture-management tools.",
    highlights: ["Developed a Flask application and led a PHP web project."],
    fr: {
      role: "Chef d’équipe projet",
      period: "Juil. 2019 – Août 2019",
      summary:
        "Encadrement de trois développeurs pour des outils internes de gestion du mobilier.",
      highlights: [
        "Développement d’une application Flask et pilotage d’un projet web PHP."
      ]
    }
  }
];

export const expertise = [
  {
    title: "Cloud platforms",
    titleFr: "Plateformes cloud",
    description: "Multicloud architecture, migration and operations.",
    descriptionFr: "Architecture multicloud, migration et exploitation.",
    skills: [
      "AWS",
      "Azure",
      "IBM Cloud",
      "GCP",
      "DigitalOcean",
      "EC2",
      "ELB",
      "ECS",
      "ECR",
      "Route 53",
      "EKS",
      "AKS",
      "GKE",
      "Lambda",
      "RDS",
      "DynamoDB",
      "Cosmos DB",
      "Azure Functions",
      "CloudWatch",
      "CloudTrail",
      "IAM",
      "KMS",
      "AWS Shield",
      "AWS Application Migration Service",
      "AWS DMS",
      "Azure Resource Groups",
      "Azure Key Vault",
      "Azure Disk Encryption Sets",
      "Azure Network Security Groups",
      "Azure SQL Database",
      "Azure File Storage",
      "GCP Compute Engine",
      "GCP Cloud Storage",
      "Azure Policy",
      "AWS Backup",
      "Azure Site Recovery"
    ]
  },
  {
    title: "Containers & orchestration",
    titleFr: "Conteneurs et orchestration",
    description: "Building and running resilient application platforms.",
    descriptionFr: "Conception et exploitation de plateformes applicatives résilientes.",
    skills: [
      "Kubernetes",
      "Docker",
      "LXD",
      "Docker Swarm",
      "Helm",
      "Kubernetes Operators",
      "Service Mesh",
      "Traefik",
      "EKS",
      "AKS",
      "GKE"
    ]
  },
  {
    title: "Infrastructure as code",
    titleFr: "Infrastructure as code",
    description: "Reproducible cloud and system configuration.",
    descriptionFr: "Configuration reproductible du cloud et des systèmes.",
    skills: [
      "Terraform",
      "HCP Terraform",
      "Ansible",
      "AWX",
      "AWS CloudFormation",
      "Azure ARM",
      "terraform-docs",
      "TFLint",
      "tfsec"
    ]
  },
  {
    title: "CI/CD & GitOps",
    titleFr: "CI/CD et GitOps",
    description: "Automated build, release and artifact workflows.",
    descriptionFr: "Automatisation des builds, des livraisons et des artefacts.",
    skills: [
      "GitLab CI/CD",
      "Jenkins",
      "GitHub Actions",
      "Azure DevOps",
      "Travis CI",
      "AWS CodePipeline",
      "AWS CodeCommit",
      "CodeBuild",
      "CodeDeploy",
      "Spinnaker",
      "Octopus Deploy",
      "FluxCD",
      "Nexus",
      "JFrog",
      "TeamCity"
    ]
  },
  {
    title: "Security & compliance",
    titleFr: "Sécurité et conformité",
    description: "Security checks from code to cloud operations.",
    descriptionFr: "Contrôles de sécurité, du code à l’exploitation cloud.",
    skills: [
      "HashiCorp Vault",
      "AWS Secrets Manager",
      "External Secrets",
      "cert-manager",
      "Trivy",
      "OWASP ZAP",
      "SonarQube",
      "SAST",
      "DAST",
      "AWS Inspector",
      "Azure Security Center",
      "AWS Audit Manager",
      "Azure Policy",
      "Keycloak"
    ]
  },
  {
    title: "SRE & observability",
    titleFr: "SRE et observabilité",
    description: "Monitoring, incident response and reliability engineering.",
    descriptionFr: "Supervision, gestion des incidents et ingénierie de la fiabilité.",
    skills: [
      "Prometheus",
      "Grafana",
      "Mimir",
      "Tempo",
      "Alloy",
      "Alertmanager",
      "VictoriaMetrics",
      "Dynatrace",
      "Zabbix",
      "CloudWatch",
      "Azure Monitor",
      "ELK",
      "Loki",
      "Fluent Bit",
      "Promtail",
      "Blackbox Exporter",
      "ServiceNow",
      "Opsgenie",
      "SLI / SLO",
      "N3 / L3"
    ]
  },
  {
    title: "Data engineering & AI",
    titleFr: "Ingénierie des données et IA",
    description: "Pipelines, analytics and machine learning systems.",
    descriptionFr:
      "Pipelines, analyse de données et systèmes d’apprentissage automatique.",
    skills: [
      "Apache Airflow",
      "Apache Kafka",
      "Spark",
      "Hadoop",
      "HDFS",
      "Hive",
      "MapReduce",
      "Pig",
      "ZooKeeper",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "MLflow",
      "Kubeflow",
      "YOLO",
      "SSD",
      "NLP",
      "Jupyter",
      "Power BI",
      "QuickSight",
      "KNN",
      "Linear Regression",
      "Logistic Regression",
      "ANN",
      "CNN",
      "RNN"
    ]
  },
  {
    title: "Databases & storage",
    titleFr: "Bases de données et stockage",
    description: "Relational, NoSQL, search and distributed storage.",
    descriptionFr: "Bases relationnelles, NoSQL, recherche et stockage distribué.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MariaDB",
      "SQLite",
      "MongoDB",
      "Redis",
      "DynamoDB",
      "Cosmos DB",
      "Elasticsearch",
      "Ceph",
      "Rook",
      "GlusterFS",
      "OpenZFS",
      "OpenEBS",
      "Longhorn",
      "S3",
      "Azure Blob Storage",
      "Azure File Storage",
      "MinIO"
    ]
  },
  {
    title: "Languages & development",
    titleFr: "Langages et développement",
    description: "Automation, backend, frontend and application services.",
    descriptionFr: "Automatisation, backend, frontend et services applicatifs.",
    skills: [
      "Python",
      "Go",
      "Java",
      "C / C++",
      "Bash",
      "PowerShell",
      "JavaScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Node.js",
      "PHP",
      "React",
      "React Native",
      "Next.js",
      "Spring",
      "Spring Boot",
      "Java EE",
      "Django",
      "Flask",
      "FastAPI",
      "NestJS",
      "Laravel",
      "Symfony"
    ]
  },
  {
    title: "Networks & collaboration",
    titleFr: "Réseaux et collaboration",
    description: "The wider tools used to ship and support systems.",
    descriptionFr: "Les outils complémentaires de livraison et d’exploitation.",
    skills: [
      "AWS VPC",
      "Azure VNet",
      "VPN",
      "PHPIPAM",
      "Git",
      "GitHub",
      "GitLab",
      "Jira",
      "Confluence",
      "VMware ESXi",
      "vSphere",
      "Vagrant",
      "Docker Hub",
      "AWS ECR",
      "Azure Container Registry",
      "GitLab Container Registry",
      "Slack",
      "Microsoft Teams",
      "Webex",
      "Apache Solr",
      "Figma",
      "UML",
      "Merise",
      "pre-commit"
    ]
  }
];

export const resumeUrl = "/resume.pdf?v=2026-10-12";
