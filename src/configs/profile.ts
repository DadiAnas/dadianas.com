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
      "Manage multicloud orchestrators across IBM Cloud, AWS and Azure.",
      "Design and implement scalable, highly available Kubernetes clusters.",
      "Develop and maintain CI/CD pipelines for microservices.",
      "Implement infrastructure as code with Terraform and Ansible.",
      "Build and maintain Apache Airflow DAGs for scheduled and event-driven data and infrastructure workflows.",
      "Automate ServiceNow incident creation, enrichment and resolution to reduce manual work and speed up response.",
      "Lead N3/L3 production troubleshooting across Go, Java, Python and Node.js microservices, including root-cause analysis and remediation.",
      "Define SLIs and SLOs, monitor SLAs and write incident-resolution runbooks.",
      "Develop in-house tooling that sends context-aware security notifications to the relevant teams.",
      "Build security pipelines with SAST, DAST, code-quality gates and end-to-end tests.",
      "Optimize container resource allocation and performance.",
      "Establish and enforce cloud security practices.",
      "Design monitoring and alerting with Dynatrace, Prometheus, VictoriaMetrics and Grafana.",
      "Automate routine operations and incident-response procedures.",
      "Plan cloud capacity and optimize costs.",
      "Implement and manage service mesh solutions.",
      "Develop custom Kubernetes operators for business needs.",
      "Lead the adoption of GitOps for infrastructure management.",
      "Manage secrets with HashiCorp Vault.",
      "Tune database performance and implement replication strategies.",
      "Conduct security audits and vulnerability assessments.",
      "Mentor junior team members in DevOps and SRE practices.",
      "Work with development teams to improve application performance and reliability.",
      "Apply chaos engineering to improve system resilience.",
      "Manage and optimize CI/CD artifact repositories.",
      "Maintain documentation for systems and operational processes.",
      "Implement machine-learning workflows for predictive analytics and anomaly detection on system metrics.",
      "Use AI-driven incident prediction to reduce downtime and improve reliability."
    ],
    fr: {
      role: "Ingénieur DevOps / SRE — expert infrastructure et orchestration",
      period: "Août 2024 – Aujourd’hui",
      summary:
        "Exploitation de plateformes de production et d’orchestrateurs multicloud sur IBM Cloud, AWS et Azure.",
      highlights: [
        "Gestion d’orchestrateurs multicloud sur IBM Cloud, AWS et Azure.",
        "Conception et déploiement de clusters Kubernetes évolutifs et hautement disponibles.",
        "Développement et maintenance de pipelines CI/CD pour des microservices.",
        "Déploiement de l’infrastructure en tant que code avec Terraform et Ansible.",
        "Création et maintenance de DAG Apache Airflow pour des traitements de données et d’infrastructure planifiés ou déclenchés par événement.",
        "Automatisation de la création, de l’enrichissement et de la résolution des incidents dans ServiceNow pour réduire les tâches manuelles et accélérer la réponse.",
        "Pilotage du diagnostic N3 des incidents de production sur des microservices Go, Java, Python et Node.js, avec analyse des causes et correction.",
        "Définition des SLI et SLO, suivi des SLA et rédaction de procédures de résolution des incidents.",
        "Développement d’un outil interne envoyant des alertes contextualisées aux équipes concernées selon le contexte de sécurité.",
        "Création de pipelines de sécurité intégrant SAST, DAST, contrôles de qualité du code et tests de bout en bout.",
        "Optimisation des ressources et des performances des conteneurs.",
        "Définition et application des bonnes pratiques de sécurité dans le cloud.",
        "Conception de la supervision et de l’alerting avec Dynatrace, Prometheus, VictoriaMetrics et Grafana.",
        "Automatisation des opérations récurrentes et des procédures de réponse aux incidents.",
        "Planification de la capacité et optimisation des coûts des ressources cloud.",
        "Déploiement et administration de solutions de service mesh.",
        "Développement d’opérateurs Kubernetes adaptés aux besoins métier.",
        "Pilotage de l’adoption de GitOps pour la gestion de l’infrastructure.",
        "Gestion des secrets avec HashiCorp Vault.",
        "Optimisation des performances des bases de données et mise en place de stratégies de réplication.",
        "Réalisation d’audits de sécurité et d’analyses de vulnérabilités.",
        "Accompagnement de profils juniors sur les pratiques DevOps et SRE.",
        "Collaboration avec les équipes de développement pour améliorer les performances et la fiabilité des applications.",
        "Application du chaos engineering pour renforcer la résilience des systèmes.",
        "Gestion et optimisation des dépôts d’artefacts CI/CD.",
        "Rédaction et maintenance de la documentation des systèmes et procédures.",
        "Mise en place de traitements de machine learning pour l’analyse prédictive et la détection d’anomalies dans les métriques.",
        "Utilisation de modèles d’IA pour anticiper les incidents, réduire les interruptions et améliorer la fiabilité."
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
      "Lead the migration of thousands of projects from on-premises data centers to AWS and Azure.",
      "Plan cloud migrations with cross-functional teams and establish landing zones.",
      "Assess risks and compliance with AWS Inspector and Azure Security Center.",
      "Design cloud infrastructure with HCP Terraform, AWS CloudFormation and Azure Resource Manager.",
      "Train teams in cloud technologies and DevSecOps practices to support CI/CD adoption.",
      "Keep stakeholders informed through status dashboards and reports.",
      "Build and maintain secure CI/CD pipelines across cloud accounts and environments.",
      "Integrate security tools and automate infrastructure-as-code documentation.",
      "Manage AWS services including EC2, ELB, RDS, ECS, ECR, Lambda, Route 53, S3, CloudWatch, CloudTrail, IAM, KMS and AWS Shield.",
      "Administer Azure Resource Groups, Key Vault, Disk Encryption Sets, Network Security Groups, Azure Functions and AKS.",
      "Write detailed runbooks for each stage of the cloud migration.",
      "Implement disaster recovery with Azure Site Recovery and AWS Backup.",
      "Optimize cloud costs and benchmark performance regularly.",
      "Audit data-security compliance with AWS Audit Manager and Azure Policy.",
      "Implement AWS multi-account and Azure multi-tenant strategies for security and resource management.",
      "Manage Azure SQL Database, Cosmos DB, Azure Blob Storage and Azure File Storage.",
      "Build Power BI and AWS QuickSight dashboards to track migration performance and security."
    ],
    fr: {
      role: "Architecte cloud / DevSecOps",
      period: "Sept. 2023 – Août 2024",
      summary:
        "Pilotage de migrations à grande échelle de centres de données internes vers AWS et Azure.",
      highlights: [
        "Pilotage de la migration de milliers de projets depuis des centres de données internes vers AWS et Azure.",
        "Planification des migrations avec des équipes pluridisciplinaires et mise en place de landing zones.",
        "Évaluation des risques et de la conformité avec AWS Inspector et Azure Security Center.",
        "Conception d’infrastructures cloud avec HCP Terraform, AWS CloudFormation et Azure Resource Manager.",
        "Formation des équipes aux technologies cloud et aux pratiques DevSecOps pour favoriser l’adoption de la CI/CD.",
        "Communication de l’avancement aux parties prenantes à l’aide de tableaux de bord et de rapports.",
        "Création et maintenance de pipelines CI/CD sécurisés dans plusieurs comptes et environnements cloud.",
        "Intégration d’outils de sécurité et automatisation de la documentation de l’infrastructure en tant que code.",
        "Administration des services AWS EC2, ELB, RDS, ECS, ECR, Lambda, Route 53, S3, CloudWatch, CloudTrail, IAM, KMS et AWS Shield.",
        "Administration d’Azure Resource Groups, Key Vault, Disk Encryption Sets, Network Security Groups, Azure Functions et AKS.",
        "Rédaction de procédures détaillées pour chaque étape de la migration cloud.",
        "Mise en place de plans de reprise d’activité avec Azure Site Recovery et AWS Backup.",
        "Optimisation régulière des coûts et évaluation des performances des ressources cloud.",
        "Audit de la conformité des données avec AWS Audit Manager et Azure Policy.",
        "Mise en place de stratégies multicomptes sur AWS et multilocataires sur Azure pour renforcer la sécurité et la gestion des ressources.",
        "Administration d’Azure SQL Database, Cosmos DB, Azure Blob Storage et Azure File Storage.",
        "Création de tableaux de bord Power BI et AWS QuickSight pour suivre les performances et la sécurité des migrations."
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
      "Design, build and manage CI/CD systems with GitLab CI and Jenkins for regular deployments.",
      "Containerize FastAPI, Django, Flask, Laravel and Symfony web projects.",
      "Migrate workloads from vSphere to Kubernetes clusters on LXD hypervisors.",
      "Implement monitoring and logging with Grafana, Prometheus, VictoriaMetrics, Zabbix, Loki and Promtail.",
      "Manage and optimize Redis, PostgreSQL, Elasticsearch and MariaDB.",
      "Manage secrets with HashiCorp Vault and External Secrets.",
      "Configure distributed storage with Rook Ceph, GlusterFS, Longhorn and OpenEBS.",
      "Write automation scripts in Python, Bash and Go.",
      "Analyze data and automate reporting with Python and Jupyter Notebooks."
    ],
    fr: {
      role: "Consultant DevOps / SRE",
      period: "Août 2022 – Août 2023",
      summary:
        "Modernisation des déploiements et de l’exploitation, avec migration de vSphere vers Kubernetes.",
      highlights: [
        "Conception et administration de chaînes CI/CD avec GitLab CI et Jenkins pour assurer des déploiements réguliers.",
        "Conteneurisation de projets web FastAPI, Django, Flask, Laravel et Symfony.",
        "Migration de charges de travail depuis vSphere vers des clusters Kubernetes sur des hyperviseurs LXD.",
        "Mise en place de la supervision et de la journalisation avec Grafana, Prometheus, VictoriaMetrics, Zabbix, Loki et Promtail.",
        "Administration et optimisation de Redis, PostgreSQL, Elasticsearch et MariaDB.",
        "Gestion des secrets avec HashiCorp Vault et External Secrets.",
        "Configuration du stockage distribué avec Rook Ceph, GlusterFS, Longhorn et OpenEBS.",
        "Développement de scripts d’automatisation en Python, Bash et Go.",
        "Analyse de données et automatisation de rapports avec Python et Jupyter Notebooks."
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
      "Manage AWS infrastructure with Terraform and CloudFormation.",
      "Automate server configuration with Ansible.",
      "Deploy and operate large-scale applications on Kubernetes and Amazon EKS.",
      "Optimize AWS RDS, DynamoDB and Elasticsearch databases.",
      "Manage secrets with AWS Secrets Manager and HashiCorp Vault.",
      "Set up monitoring with CloudWatch, Grafana and Prometheus.",
      "Write automation scripts in Python and Bash.",
      "Create Kubernetes operators for Traefik IngressRoute and PrometheusRules.",
      "Implement Apache Kafka for real-time data streams.",
      "Apply machine learning to detect anomalies in logs.",
      "Develop and deploy image-recognition solutions.",
      "Implement object detection with YOLO and SSD models.",
      "Build recommendation engines to personalize the user experience.",
      "Create real-time analytics dashboards for marketplace insights.",
      "Use NLP and machine learning to improve search relevance and item categorization."
    ],
    fr: {
      role: "Ingénieur DevOps / Cloud",
      period: "Sept. 2021 – Août 2022",
      summary:
        "Exploitation d’infrastructures AWS et EKS, avec réalisation de projets de données et d’apprentissage automatique.",
      highlights: [
        "Gestion de l’infrastructure AWS avec Terraform et CloudFormation.",
        "Automatisation de la configuration des serveurs avec Ansible.",
        "Déploiement et exploitation d’applications à grande échelle sur Kubernetes et Amazon EKS.",
        "Optimisation des bases de données AWS RDS, DynamoDB et Elasticsearch.",
        "Gestion des secrets avec AWS Secrets Manager et HashiCorp Vault.",
        "Mise en place de la supervision avec CloudWatch, Grafana et Prometheus.",
        "Développement de scripts d’automatisation en Python et Bash.",
        "Création d’opérateurs Kubernetes pour Traefik IngressRoute et PrometheusRules.",
        "Mise en œuvre d’Apache Kafka pour le traitement de flux de données en temps réel.",
        "Utilisation du machine learning pour détecter les anomalies dans les journaux.",
        "Développement et déploiement de solutions de reconnaissance d’images.",
        "Mise en place de la détection d’objets avec des modèles YOLO et SSD.",
        "Création de moteurs de recommandation pour personnaliser l’expérience utilisateur.",
        "Création de tableaux de bord analytiques en temps réel pour la place de marché.",
        "Utilisation du traitement automatique des langues et du machine learning pour améliorer la recherche et la catégorisation."
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
      "Implement an IT monitoring and reporting business-intelligence solution.",
      "Worked with Zabbix, VMware ESXi, Kubernetes, Helm, Docker, Grafana, Elasticsearch, Fluent Bit and Kibana."
    ],
    fr: {
      role: "Ingénieur BI / Big Data",
      period: "Fév. 2021 – Juin 2021",
      summary:
        "Réalisation d’une solution de supervision et de reporting décisionnel pour l’informatique.",
      highlights: [
        "Réalisation d’une solution décisionnelle de supervision et de reporting informatique.",
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
      "Develop an AI chatbot with Python, Flask and TensorFlow on the backend.",
      "Deploy on Heroku and build the mobile app with React Native."
    ],
    fr: {
      role: "Développeur logiciel IA",
      period: "Oct. 2020 – Déc. 2020",
      summary: "Développement d’un chatbot IA avec backend Python et application mobile.",
      highlights: [
        "Développement d’un chatbot IA avec Python, Flask et TensorFlow côté serveur.",
        "Déploiement sur Heroku et développement de l’application mobile avec React Native."
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
      "Design and develop a web application for stock management.",
      "Build the NestJS backend and React frontend, with UI/UX designs in Figma."
    ],
    fr: {
      role: "Ingénieur full stack",
      period: "Juil. 2020 – Août 2020",
      summary: "Conception et développement d’une application web de gestion des stocks.",
      highlights: [
        "Conception et développement d’une application web de gestion des stocks.",
        "Développement du backend avec NestJS et de l’interface avec React ; conception UI/UX sur Figma."
      ]
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
    highlights: [
      "Develop a furniture-management web application with Python and Flask.",
      "Lead a team of three developers on a PHP web project."
    ],
    fr: {
      role: "Chef d’équipe projet",
      period: "Juil. 2019 – Août 2019",
      summary:
        "Encadrement de trois développeurs pour des outils internes de gestion du mobilier.",
      highlights: [
        "Développement d’une application web de gestion du mobilier avec Python et Flask.",
        "Encadrement d’une équipe de trois développeurs sur un projet web en PHP."
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
      "On-premises",
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
