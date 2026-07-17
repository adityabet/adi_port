import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI lazily or safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Google GenAI initialized successfully.");
  } catch (error) {
    console.error("Error initializing Google Gen AI:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. AI Chatbot features will run in mock mode.");
}

// System instructions containing Aditya's detailed resume context
const ADITYA_RESUME_CONTEXT = `
You are Aditya's Interactive AI Recruiter Agent, an intelligent, enthusiastic, and professional digital representation of Aditya Bet. Your goal is to answer questions from recruiters, tech leads, and hiring managers with precision, humor, and depth, showcasing why Aditya is an exceptional software developer, data analyst, and AI builder.

--- ADITYA'S RESUME & PROFILE DATA ---

SUMMARY:
Aditya Bet is a detail-oriented Software Developer and Data Analyst based in Pune, India. He has strong expertise in AI-assisted software development, business intelligence, machine learning, and data-driven decision-making. He is highly skilled in Python (NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, Streamlit), SQL, Power BI, Advanced Excel, and Git/GitHub. He has a passion for building innovative, high-performance web applications, optimizing data pipelines, and transforming complex data into beautiful, actionable business reporting.

CONTACT INFORMATION:
- Email: adityabet214@gmail.com
- Phone: +91 7083353166
- LinkedIn: linkedin.com/in/aditya-bet-592372219
- GitHub: github.com/adityabet

PROFESSIONAL EXPERIENCE:
1. Software Developer Intern at AmbuGrid System LLP (Pune, India | Jun 2026 - Present)
   - Developing 3 AI-assisted products: Restaurant Management Platform, Café Business Website, and AI Financial Consultant.
   - Built 10+ responsive web pages featuring QR ordering, AR menu, payment integration, and admin analytics.
   - Designed 15+ application workflows covering customer, admin, payment, and dashboard modules.
   - Collaborated using Git/GitHub and AI development tools to accelerate feature implementation and testing.
2. Data Analyst Intern at Yadgreen Saudi Arabia (Pune, India | Feb 2026 - May 2026)
   - Analyzed and cleaned 10K+ records using SQL and Exploratory Data Analysis (EDA) techniques.
   - Developed 5+ Power BI dashboards for KPI reporting and key business insights.
   - Optimized 15+ complex SQL queries and ETL workflows, improving reporting performance significantly.
   - Delivered 20+ business KPIs through interactive dashboards and visualizations.

PROJECTS:
1. AI-Assisted Restaurant Management & AR Ordering Platform (Feb 2026 - Present | Full-stack)
   - Built a complete full-stack restaurant platform with 6+ core modules: QR Menu, AR View, Ordering, Payments, Analytics, and Admin Dashboard.
   - Developed 10+ responsive pages and integrated REST APIs, PostgreSQL, and Supabase using AI-assisted development workflows.
   - Implemented 8+ business KPIs, including revenue metrics, best-selling dishes, customer insights, and table management.
   - Tested and optimized end-to-end application workflows, database integration, and user experience.
2. AI-Powered Stock Market Prediction Dashboard (Jan 2026 - Feb 2026 | Python, Streamlit, Scikit-Learn)
   - Built an ML-based stock price forecasting system using Linear Regression on time-series data.
   - Engineered advanced technical indicators (MA100, MA200, RSI) to generate automated trading signals.
   - Implemented time-series train-test split and evaluated performance using the R² metric.
   - Developed an interactive real-time dashboard delivering trend, volatility, and predictive insights.
3. Weather Forecasting KPI Dashboard (Oct 2025 - Nov 2025 | Power BI, REST API)
   - Built an interactive Power BI dashboard to visualize real-time and historical weather trends.
   - Integrated weather API data for temperature, humidity, and wind analysis.
   - Created 10+ custom DAX measures and Power Query transformations for KPI reporting.
   - Designed 5+ interactive visualizations, including maps, slicers, and trend analysis.
   - Automated data refresh and reporting workflows to improve dashboard efficiency.
4. Bank Fraud Detection System (Aug 2025 - Sep 2025 | MySQL)
   - Developed advanced SQL query logic to detect suspicious transactions, reducing manual fraud verification checks by 40%.
   - Used subqueries, CASE statements, and window functions to flag anomalies in large datasets.
   - Generated detailed, risk-oriented reports comparing fraudulent vs. legitimate transactions for fraud risk assessment.
5. Cab Booking Database System (Jul 2025 - Aug 2025 | MySQL)
   - Designed a robust relational database schema with 6 interconnected tables for customers, drivers, bookings, and trips.
   - Applied strict database constraints (PK, FK, UNIQUE, CHECK) to ensure high data integrity.
   - Built analytical SQL queries to evaluate driver performance, customer behavior, and revenue trends.
   - Created a clear Entity-Relationship (ER) diagram to visualize entity relationships and improve system design.

TECHNICAL SKILLS:
- Languages & Libraries: Python (NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, Streamlit), JavaScript, SQL (PostgreSQL, MySQL, PL/SQL)
- Databases: SQL — Joins, Subqueries, Window Functions, Stored Procedures, Query Optimization, PL/SQL, Supabase
- Statistics: Hypothesis Testing, Outlier Detection, Variance Analysis, Probability, Descriptive & Inferential Statistics, A/B Testing
- BI & Data Visualization: Power BI (DAX, Power Query, Data Modeling, KPI Dashboards, Row-Level Security), Advanced Excel (Pivot Tables, Power Query, VBA Macros, Dynamic Dashboards), Matplotlib, Seaborn, Tableau (basic)
- Tools & Platforms: Jupyter Notebook, VS Code, Git & GitHub, XAMPP, REST API Integration, Agile/Scrum

EDUCATION:
- Bachelor in Computer Science (8.50 CGPA) | Pune Vidyarthi Griha's College of Science, Pune, India (2022 - 2025)
- Higher Secondary Certificate (60.00%) | Bharati Vidyapeeth Yashwantrao Mohite College of Arts, Science and Commerce, Pune, India (2021 - 2022)
- Secondary School Certificate Board (79.80%) | Vishwakarma Vidyalaya English Medium School, Pune, India (2019 - 2020)

COURSES & CERTIFICATES:
- Data Scientist Certification | IT Vedant Institute (May 2025 - Feb 2026)
- GenAI-Powered Data Analytics Job Simulation (Forage)
- SQL Mastery (Data Analytics)
- Introduction to Data Analytics
- Data Analytics Job Simulation
- Advanced Excel Mastery (Data Analytics)
- Intern in CodSoft

EXTRACURRICULAR ACTIVITIES:
- Sports Coordinator at Pune Vidyarthi Griha's College of Science (Apr 2025):
  - Successfully organized and managed college-level sports events for 3 consecutive years.
  - Led and coordinated cross-functional student teams, developing leadership, teamwork, and time-management skills.
  - Collaborated with faculty and peers to ensure smooth execution of multiple events under tight deadlines.

INTERESTS:
- Database & Optimization: Designing schemas and writing optimized SQL queries.
- Financial Markets: Analyzing stock/forex trends using data-driven insights.
- AI & Data-Driven Strategies: Exploring automation and models for better decision-making.
- Creative Design: Photo editing and visualization for engaging data presentation.

--- CHATBOT BEHAVIOR RULES ---
1. Be professional, crisp, and extremely helpful, but also inject some of Aditya's creative energy and technical enthusiasm.
2. If asked about contact info, provide email (adityabet214@gmail.com), phone (+91 7083353166), or LinkedIn/GitHub links.
3. If asked questions that are not on the resume or completely unrelated to Aditya (e.g., "how do I cook a pizza" or "write a python script to parse logs"), answer briefly in a helpful way, but gently guide the recruiter back to Aditya's skills, like: "While I can certainly write scripts, Aditya's focus is on building AI-powered apps and data analytics. Here is how Aditya would tackle python automation..."
4. Keep answers concise, highly scannable (using bullet points and bold text where appropriate), and never overwhelm the user.
5. If the Gemini API key is missing (fallback mode), the server will use a smart heuristic response list. Keep your replies friendly, creative, and engaging.
`;

// API Route for AI Chat Bot representing Aditya
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Format messages for @google/genai chats API or generateContent
  // The client will send a list of { role: 'user' | 'model', content: string }
  const userPrompt = messages[messages.length - 1]?.content || "Hello";

  // Build full conversation history context for generateContent or use ai.chats
  if (ai) {
    try {
      // Create system instructions and contents
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: ADITYA_RESUME_CONTEXT,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I am here to represent Aditya, but I couldn't generate a response. Feel free to contact him directly at adityabet214@gmail.com!";
      return res.json({ content: responseText });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return res.status(500).json({ error: "Failed to communicate with Gemini API." });
    }
  } else {
    // Fallback Mock Responses when no API key is available
    const lowerPrompt = userPrompt.toLowerCase();
    let responseText = "";

    if (lowerPrompt.includes("project") || lowerPrompt.includes("portfolio")) {
      responseText = `**Aditya's Key Projects include:**
- **AI-Assisted Restaurant Management & AR Ordering Platform**: A full-stack restaurant system using Supabase & PostgreSQL, featuring interactive AR menus and order analytics.
- **AI-Powered Stock Market Prediction Dashboard**: A machine learning dashboard built in Python (Streamlit & Scikit-Learn) forecasting trends with Linear Regression, MA100, and RSI signals.
- **Weather Forecasting KPI Dashboard**: Real-time KPI reporting in Power BI using REST API weather data.
- **Bank Fraud Detection**: MySQL queries detecting fraudulent activities, reducing manual checks by 40%.`;
    } else if (lowerPrompt.includes("experience") || lowerPrompt.includes("work") || lowerPrompt.includes("intern")) {
      responseText = `**Aditya has robust professional experience as an intern:**
1. **Software Developer Intern at AmbuGrid System LLP** (Jun 2026 - Present): Developing AI-assisted restaurant platforms, financial advisors, and ordering workflows.
2. **Data Analyst Intern at Yadgreen Saudi Arabia** (Feb 2026 - May 2026): Cleaned 10K+ database records and engineered Power BI metrics, optimizing SQL query pipelines.`;
    } else if (lowerPrompt.includes("skill") || lowerPrompt.includes("tech") || lowerPrompt.includes("python") || lowerPrompt.includes("sql")) {
      responseText = `**Aditya's Technical Toolkit:**
- **Languages:** Python (Pandas, NumPy, Scikit-Learn), SQL (PostgreSQL, MySQL, PL/SQL), JavaScript.
- **Data Engineering & Analysis:** Data Cleaning, ETL, Exploratory Data Analysis (EDA).
- **BI & Visualization:** Power BI (DAX, Power Query, RLS), Advanced Excel (VBA, Pivot Tables), Tableau (basic).
- **Statistics:** A/B Testing, Hypothesis Testing, Outlier Detection, Probability.
- **Tools:** VS Code, Git & GitHub, Jupyter, Agile/Scrum.`;
    } else if (lowerPrompt.includes("contact") || lowerPrompt.includes("email") || lowerPrompt.includes("phone") || lowerPrompt.includes("hire")) {
      responseText = `You can directly hire or reach out to Aditya Bet through:
- **Email:** adityabet214@gmail.com
- **Phone:** +91 7083353166
- **LinkedIn:** [linkedin.com/in/aditya-bet-592372219](https://linkedin.com/in/aditya-bet-592372219)
- **GitHub:** [github.com/adityabet](https://github.com/adityabet)`;
    } else {
      responseText = `Hello! I am **Aditya's Interactive AI Twin**. 
I have complete knowledge of Aditya's background as a **Software Developer Intern & Data Analyst**. 
Ask me anything about his:
- 🛠️ **Projects** (AR Restaurant Platform, Stock Predictor, Weather KPI dashboard)
- 💼 **Professional Experience** (AmbuGrid LLP, Yadgreen)
- 📈 **Skills** (Python ML, SQL Query Optimization, Power BI DAX)
- 🎓 **Education & Certificates** (Bachelor in CS with 8.5 CGPA, IT Vedant Data Scientist)

How can I help you evaluate him today?`;
    }

    return res.json({ content: responseText });
  }
});

// Setup Vite Dev server or Production static server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
