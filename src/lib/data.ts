export const personalInfo = {
  name: "Anubhav Kumar Rao",
  title: "Software Engineer",
  tagline: "Building systems at scale — from distributed databases to LLM-powered platforms.",
  location: "India",
  email: "anubhav100rao@gmail.com",
  github: "https://github.com/anubhav100rao",
  linkedin: "https://linkedin.com/in/anubhav100rao",
  resumeUrl:
    "https://drive.google.com/file/d/1nhTYvt1FnTJ6nMsw7eqvgBLDrxiC7Ydy/view?usp=sharing",
};

export const experiences = [
  {
    company: "Coinbase",
    role: "Software Engineer",
    period: "Jun 2025 – Present",
    location: "Remote, India",
    logo: "C",
    color: "#0052FF",
    highlights: [
      "Spearheading expansion of Coinbase International Exchange & derivatives to the UK and EU — extending regulated crypto trading to millions of users.",
      "Built an LLM-powered customer issue aggregation platform ingesting trading, compliance, and verification signals — reducing support contact rate by 15%, saving millions annually.",
      "Classified customer chat transcripts at scale using LLMs; engineered ETL pipelines cutting project estimation timelines by 50%.",
    ],
  },
  {
    company: "D.E. Shaw & Co.",
    role: "Member Technical (Software Engineer)",
    period: "Aug 2024 – Jun 2025",
    location: "Hyderabad, India",
    logo: "D",
    color: "#7c3aed",
    highlights: [
      "Integrated RAG-based LLM solution into DESTerm, enabling semantic search across 13M+ financial instruments for quant analysts.",
      "Architected high-throughput batch processing and log storage for large-scale trading reports, scaling to 2TB with Redis caching for sub-second access.",
      "Built a time series library powering EOD & intraday data retrieval across 13M+ tickers and 100+ fields — adopted by 10+ teams.",
      "Engineered quantitative analysis tools (quantile regression, seasonality adjustment) handling up to 12TB of time series data.",
    ],
  },
  {
    company: "Rubrik",
    role: "Software Engineering Intern",
    period: "Jan 2024 – Jun 2024",
    location: "Bangalore, India",
    logo: "R",
    color: "#00c7a3",
    highlights: [
      "Scaled archival storage backup 4× (8TB → 32TB) for Azure VMs and managed disks.",
      "Integrated GCP cloud metrics into Rubrik's reporting infra, increasing monitoring coverage by 10% and driving a 17% increase in report traffic.",
      "Designed a unified reporting, metrics, and licensing framework adopted across all engineering teams.",
      "Built multi-cloud cost and storage comparison tooling for VMs, Disks, and Databases across Azure, AWS, and GCP.",
    ],
  },
  {
    company: "Razorpay",
    role: "Software Engineering Intern",
    period: "May 2023 – Jul 2023",
    location: "Bangalore, India",
    logo: "R",
    color: "#3395FF",
    highlights: [
      "Engineered department-level payout filters for XPayroll across 50+ organizations with 100% data migration and zero data loss.",
      "Designed scalable MySQL schemas, RESTful APIs, and React frontend supporting seamless department onboarding across 50+ enterprise clients.",
      "Introduced tax deduction schemes for Sections 80DDB, 80TTA, and 80TTB ensuring regulatory compliance across enterprise payroll.",
    ],
  },
];

export const projects = [
  {
    name: "AnubhavOS",
    subtitle: "Educational Operating System",
    description:
      "A from-scratch, educational 32-bit x86 operating system written in C and NASM assembly. Boots via GRUB, runs an interactive shell with syscalls, keyboard input, filesystem, and VGA text-mode display — all with zero external dependencies.",
    tags: ["C", "Assembly", "x86", "Operating System", "GRUB"],
    category: "Operating System",
    period: "Feb 2026",
    github: "https://github.com/anubhav100rao/lightstreak-os",
    color: "#ef4444",
  },
  {
    name: "Trade Agent",
    subtitle: "Multi-Market AI Agent",
    description:
      "A 5-agent LLM-powered equity analysis system using LangGraph orchestration, integrating RAG over financial reports via Qdrant and real-time sentiment analysis. Delivers structured BUY/SELL/HOLD signals with confidence scores across RSI, MACD, and Bollinger Band indicators.",
    tags: ["Python", "LangGraph", "FastAPI", "Qdrant", "LLM", "RAG"],
    category: "AI Systems",
    period: "Feb 2025 – Mar 2025",
    github: "https://github.com/anubhav100rao",
    color: "#f59e0b",
  },
  {
    name: "MiniDB",
    subtitle: "Transactional Database Engine",
    description:
      "SQL-compliant database built from scratch with LSM Tree storage, Write-Ahead Logging for crash recovery, and MVCC-based ACID transactions. Achieves 3× faster writes than B-Tree implementations for write-heavy workloads with 10K+ transactions/sec.",
    tags: ["Go", "LSM Tree", "MVCC", "WAL", "ACID"],
    category: "Database System",
    period: "Dec 2024 – Jan 2025",
    github: "https://github.com/anubhav100rao",
    color: "#3b82f6",
  },
  {
    name: "Rafty",
    subtitle: "Raft Consensus Visualizer",
    description:
      "Real-time distributed consensus visualizer simulating a 5-node Raft cluster with a virtual networking layer. Enables deterministic fault injection and demonstrates 99.9% consensus achievement under network partitions and node failures.",
    tags: ["Go", "React", "WebSockets", "Distributed Systems", "Raft"],
    category: "Distributed Systems",
    period: "Nov 2024 – Dec 2024",
    github: "https://github.com/anubhav100rao",
    color: "#10b981",
  },
  {
    name: "CRDTs",
    subtitle: "Collaborative Document Editor",
    description:
      "A real-time collaborative document editor built from scratch using CRDTs (Conflict-free Replicated Data Types). Implements the RGA algorithm with tombstone-based deletion, an insert backlog for out-of-order operations, and deterministic tie-breaking — enabling conflict-free multi-user editing over WebSockets with zero central coordination.",
    tags: ["TypeScript", "React", "WebSockets", "CRDTs", "Monaco Editor", "Node.js"],
    category: "Distributed Systems",
    period: "Mar 2026",
    github: "https://github.com/anubhav100rao/crdts_docs",
    color: "#06b6d4",
  },
  {
    name: "Linux FS Simulator",
    subtitle: "File System Engine",
    description:
      "Production-grade file system simulator implementing ext2/ext3 architecture with inode-based storage, directory management, and bitmap allocation. Reduces storage lookup complexity from O(n) to O(1) for 1000+ files.",
    tags: ["Java", "Inodes", "Bitmaps", "ext2/ext3", "Storage Engine"],
    category: "Storage Engine",
    period: "Jan 2025 – Feb 2025",
    github: "https://github.com/anubhav100rao",
    color: "#8b5cf6",
  },
];

export const skills = {
  Languages: ["Go", "Python", "Java", "TypeScript", "JavaScript", "SQL", "Bash"],
  "Backend & Systems": ["FastAPI", "Node.js", "RESTful APIs", "gRPC", "LSM Trees", "WAL", "MVCC"],
  "AI & ML": ["LangGraph", "RAG", "LLMs", "Qdrant", "Prompt Engineering", "ETL Pipelines"],
  "Data & Infrastructure": [
    "Redis",
    "PostgreSQL",
    "MySQL",
    "Apache Kafka",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
  ],
  Frontend: ["React", "Next.js", "Tailwind CSS", "WebSockets"],
  "Core CS": [
    "Distributed Systems",
    "Database Internals",
    "System Design",
    "Algorithms & Data Structures",
    "OS & Networking",
  ],
};

export const education = [
  {
    institution: "Indian Institute of Information Technology Allahabad",
    degree: "B.Tech — Electronics & Communication Engineering",
    period: "Nov 2020 – May 2024",
    gpa: "8.65 / 10",
  },
  {
    institution: "Sri Aurobindo Public School",
    degree: "Class 12",
    period: "Apr 2017 – Apr 2019",
    gpa: "96.2%",
  },
];

export const achievements = [
  {
    platform: "Codeforces",
    rating: "Expert (1700+)",
    description: "Achieved ranks of 300th, 561st, 725th, and 739th out of 40,000 participants across over 120 contests.",
    link: "https://codeforces.com/profile/anubhav100rao",
    color: "#3b82f6",
  },
  {
    platform: "CodeChef",
    rating: "5-Star (2077)",
    description: "Attained 5-star rating, securing global ranks of 35th, 43rd, 65th, 81st, and 87th among 20,000 participants.",
    link: "https://www.codechef.com/users/anubhav100rao",
    color: "#8b5cf6",
  },
  {
    platform: "LeetCode",
    rating: "Guardian (2404)",
    description: "Top 0.37% of users worldwide. Ranked 40th and 95th globally among 30,000 users.",
    link: "https://leetcode.com/anubhav100rao/",
    color: "#f59e0b",
  },
  {
    platform: "Community & Leadership",
    rating: "Roles",
    description: "LeetCode rated contest tester. Problem setter on CodeChef, Codeforces, and HackerEarth. GDSC IIITA wing lead.",
    link: "",
    color: "#10b981",
  },
];
