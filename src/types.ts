export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: "Full Stack" | "Machine Learning" | "Data Analytics" | "Databases";
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  metrics: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  gradient: string;
}

export interface Certificate {
  name: string;
  issuer?: string;
  url?: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Aditya Bet",
    title: "AI Engineer & Data Analyst",
    email: "adityabet214@gmail.com",
    phone: "7083353166",
    location: "Pune, India",
    linkedin: "https://linkedin.com/in/aditya-bet-592372219",
    github: "https://github.com/adityabet",
    bio: "Detail-oriented Software Developer and Data Analyst with experience in AI-assisted software development, business intelligence, and data-driven decision-making. Skilled in Python, SQL, Power BI, Excel, and AI tools. Passionate about developing innovative applications, optimizing business processes, and creating impactful digital products.",
    stats: [
      { label: "AI Products Engineered", value: "3+" },
      { label: "Dashboard KPIs Delivered", value: "20+" },
      { label: "Data Records Handled", value: "10K+" },
      { label: "Database Tables Designed", value: "6+" }
    ]
  },
  experiences: [
    {
      id: "exp-1",
      role: "Software Developer Intern",
      company: "AmbuGrid System LLP",
      duration: "Jun 2026 - Present",
      location: "Pune, India",
      bullets: [
        "Developing 3 AI-assisted products: Restaurant Management Platform, Café Business Website, and AI Financial Consultant.",
        "Built 10+ responsive web pages featuring QR ordering, AR menu, payment integration, and admin analytics.",
        "Designed 15+ application workflows covering customer, admin, payment, and dashboard modules.",
        "Collaborated using Git/GitHub and AI development tools to accelerate feature implementation and testing."
      ]
    },
    {
      id: "exp-2",
      role: "Data Analyst Intern",
      company: "Yadgreen Saudi Arabia",
      duration: "Feb 2026 - May 2026",
      location: "Pune, India",
      bullets: [
        "Analyzed and cleaned 10K+ records using SQL and EDA techniques.",
        "Developed 5+ Power BI dashboards for KPI reporting and business insights.",
        "Optimized 15+ SQL queries and ETL workflows to improve reporting performance.",
        "Delivered 20+ business KPIs through interactive dashboards and visualizations."
      ]
    }
  ] as Experience[],
  projects: [
    {
      id: "proj-1",
      title: "AR Restaurant Platform",
      subtitle: "AI-Assisted Restaurant Management & AR Ordering Platform",
      date: "Feb 2026 - Present",
      category: "Full Stack",
      overview: "A highly sophisticated full-stack restaurant ordering ecosystem featuring futuristic Augmented Reality menu visualizations and complex multi-module workflows.",
      problem: "Traditional physical menus lack visual richness, leading to mismatched customer expectations and high support latency in peak hours.",
      solution: "Engineered an AI-assisted web system leveraging advanced web rendering, QR ordering, and custom metrics dashboards.",
      techStack: ["React", "PostgreSQL", "Supabase", "Tailwind CSS", "REST APIs", "Framer Motion"],
      features: [
        "Immersive AR Menu Viewers for digital dish simulation.",
        "Interactive QR-code based ordering pipeline.",
        "Robust admin dashboard analyzing 8+ business KPIs in real-time.",
        "Custom payments and automated bill splitting."
      ],
      metrics: [
        "6+ core system modules",
        "10+ highly responsive application pages",
        "Under 2s visual loading latency",
        "Fully optimized table routing algorithm"
      ],
      githubUrl: "https://github.com/adityabet",
      imageUrl: "https://picsum.photos/seed/restaurant/800/600"
    },
    {
      id: "proj-2",
      title: "Stock Market Predictor",
      subtitle: "AI-Powered Stock Market Prediction Dashboard",
      date: "Jan 2026 - Feb 2026",
      category: "Machine Learning",
      overview: "An interactive forecasting platform engineered in Python that applies Machine Learning on historical stock data to deliver trend predictions and buy/sell trading signals.",
      problem: "Financial markets are filled with noise, making it difficult for traders to distinguish genuine trend shifts from short-term fluctuations.",
      solution: "Engineered a time-series forecasting system using Linear Regression and calculated custom technical indicators to generate automated alerts.",
      techStack: ["Python", "Streamlit", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      features: [
        "Machine Learning-based price trend forecasting.",
        "Automated signal generation using Moving Averages (MA100, MA200) and RSI.",
        "Robust time-series train-test splits with R² score validation.",
        "High-fidelity charts and historical market volatility indexes."
      ],
      metrics: [
        "High-confidence forecasting model",
        "Dual Moving Average trading filters",
        "5+ dynamic visualizations",
        "Real-time processing with Pandas pipelines"
      ],
      githubUrl: "https://github.com/adityabet",
      imageUrl: "https://picsum.photos/seed/stocks/800/600"
    },
    {
      id: "proj-3",
      title: "Weather Forecast KPI",
      subtitle: "API-Integrated Weather Forecasting KPI Dashboard",
      date: "Oct 2025 - Nov 2025",
      category: "Data Analytics",
      overview: "A business intelligence command center connecting live weather REST APIs with Power BI to analyze seasonal temperature, humidity, and atmospheric patterns.",
      problem: "Disorganized weather records lack clean structuring, making historical comparison and long-term climate reporting highly manual.",
      solution: "Built a robust ETL process loading API data directly, creating a rich DAX mapping and interactive slicer-based maps.",
      techStack: ["Power BI", "Power Query", "DAX", "REST APIs", "Advanced Excel"],
      features: [
        "Real-time API integration with automatic database scheduled refresh.",
        "Created 10+ custom DAX measures for forecast metrics and averages.",
        "Map visuals and weather pattern segmentation filters.",
        "Historical temperature correlation plots."
      ],
      metrics: [
        "10+ custom DAX formulas",
        "5+ interactive dashboard tabs",
        "Automatic hourly refreshes",
        "Accurate location-based reporting overlays"
      ],
      githubUrl: "https://github.com/adityabet",
      imageUrl: "https://picsum.photos/seed/weather/800/600"
    },
    {
      id: "proj-4",
      title: "Bank Fraud Detection",
      subtitle: "Database Suspicious Transaction Anomaly Detection",
      date: "Aug 2025 - Sep 2025",
      category: "Databases",
      overview: "An enterprise-grade database transaction auditor utilizing complex MySQL analytical logic to automatically screen, score, and flag potential banking anomalies.",
      problem: "Manual review of high-volume banking transactions is slow, costly, and fails to prevent real-time fraudulent events.",
      solution: "Engineered nested SQL subqueries, CASE condition branches, and window partition functions to identify extreme transaction values and duplicate records.",
      techStack: ["MySQL", "SQL Optimizations", "Analytical Queries", "Database Schemas"],
      features: [
        "Automated pattern screening covering millions of rows.",
        "Custom window partition algorithms to score risk multipliers.",
        "Comprehensive fraud reporting comparing fake vs legitimate transactions.",
        "Highly optimized nested queries for high-throughput databases."
      ],
      metrics: [
        "40% reduction in manual verification overhead",
        "Sub-second check latency on massive database tables",
        "Complex partition window scripts",
        "Zero-trust risk grouping structures"
      ],
      githubUrl: "https://github.com/adityabet",
      imageUrl: "https://picsum.photos/seed/fraud/800/600"
    }
  ] as Project[],
  skillCategories: [
    {
      title: "Languages & Programming",
      skills: ["Python", "JavaScript", "SQL (PostgreSQL, MySQL)", "PL/SQL", "HTML5", "CSS3"],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Machine Learning & AI",
      skills: ["Linear Regression", "Logistic Regression", "KNN", "Decision Trees", "XGBoost", "Scikit-Learn", "GenAI Prompting"],
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "Data Analytics & BI",
      skills: ["Power BI", "Power Query", "DAX", "VBA Macros", "Excel (Pivot Tables)", "Tableau (basic)", "Pandas", "NumPy", "EDA"],
      gradient: "from-amber-400 to-orange-500"
    },
    {
      title: "Tools & Platforms",
      skills: ["Git & GitHub", "Supabase", "VS Code", "Jupyter Notebook", "REST APIs", "Agile / Scrum", "XAMPP"],
      gradient: "from-emerald-400 to-teal-500"
    }
  ] as SkillCategory[],
  certificates: [
    { name: "GenAI-Powered Data Analytics Job Simulation (Forage)", url: "https://linkedin.com/in/aditya-bet-592372219" },
    { name: "SQL Mastery (Data Analytics)", url: "https://linkedin.com/in/aditya-bet-592372219" },
    { name: "Advanced Excel Mastery (Data Analytics)", url: "https://linkedin.com/in/aditya-bet-592372219" },
    { name: "Introduction to Data Analytics", url: "https://linkedin.com/in/aditya-bet-592372219" },
    { name: "Internship in CodSoft", url: "https://linkedin.com/in/aditya-bet-592372219" }
  ] as Certificate[],
  interests: [
    { title: "Database & Optimization", description: "Designing schemas and writing highly optimized queries." },
    { title: "Financial Markets", description: "Analyzing stocks and option volatility trends using ML forecasting." },
    { title: "AI & Automation", description: "Exploring LLMs and multi-agent systems to augment software creation." },
    { title: "Creative Visualization", description: "Designing elegant charts and custom interfaces to present data narrative." }
  ],
  education: [
    { degree: "Bachelor in Computer Science", institution: "Pune Vidyarthi Griha's College of Science", duration: "2022 - 2025", score: "8.50 CGPA" },
    { degree: "Higher Secondary Certificate", institution: "Bharati Vidyapeeth Yashwantrao Mohite College", duration: "2021 - 2022", score: "60.00 %" },
    { degree: "Secondary School Certificate", institution: "Vishwakarma Vidyalaya English Medium School", duration: "2019 - 2020", score: "79.80 %" }
  ]
};
