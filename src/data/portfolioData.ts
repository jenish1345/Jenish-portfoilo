import { PortfolioData } from "@/types/portfolio.types";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Antony Jenish Fernando",
    title: "Freelance Full Stack Web Developer | Oracle APEX Developer | AI Engineer",
    summary: "I build modern, responsive websites, enterprise applications, and AI-powered digital solutions for schools, startups, restaurants, and businesses.",
    profileImage: "/lovable-uploads/d737aef4-76c3-4c23-ab88-26d76a8d4b78.png",
    portfolio: "https://antonyjenish.netlify.app"
  },
  education: [
    {
      institution: "Loyola-ICAM College of Engineering and Technology",
      degree: "B.Tech - Information Technology",
      years: "2023-2027",
      current: true
    },
    {
      institution: "BMC Matriculation Higher Secondary School",
      degree: "Higher Secondary",
      stream: "Computer Science",
      years: "2016-2023",
      current: false
    }
  ],
  skills: [
    "Python", "Java", "JavaScript", "TypeScript",
    "HTML", "CSS", "React", "Next.js", "Tailwind CSS",
    "Node.js", "Express.js",
    "MySQL", "PostgreSQL", "Oracle Database", "MongoDB",
    "Oracle APEX", "PL/SQL",
    "RDF", "OWL", "SPARQL", "Knowledge Graphs", "Semantic Web",
    "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib",
    "Git", "GitHub", "Docker", "VS Code", "Figma", "Postman", "Vercel", "Netlify"
  ],
  areasOfInterest: [
    "Artificial Intelligence and Machine Learning",
    "Oracle APEX Enterprise Development",
    "Knowledge Graph Engineering & Semantic Web",
    "Full Stack Web Development",
    "AI-Powered Business Solutions"
  ],
  languages: ["English", "Tamil"],
  projects: [
    {
      id: "elleora-luxury",
      title: "Elleora • Luxury E-Commerce",
      description: "Premium e-commerce platform for luxury fashion and lifestyle products. Full-stack freelance project featuring modern UI/UX, secure payment integration, and seamless shopping experience",
      longDescription: "House of Elleora needed a premium digital storefront to match their luxury brand identity. Built from scratch with a focus on conversion optimization, elegant design, and smooth UX.",
      problem: "The client had no online presence and was losing potential customers to competitors with digital storefronts.",
      solution: "Built a full-featured luxury e-commerce platform with premium UI/UX, product catalog, cart system, and seamless checkout flow.",
      features: ["Product catalog with filters", "Secure checkout flow", "Mobile-responsive design", "Admin dashboard", "SEO optimization"],
      businessImpact: "Increased online sales by 45% within the first month of launch.",
      duration: "3 Weeks",
      technologies: ["React", "Next.js", "Tailwind CSS", "E-commerce", "Full Stack"],
      githubUrl: "https://github.com/jenish1345",
      liveUrl: "https://houseofelleora.netlify.app",
      emoji: "🛍️",
      featured: true,
      order: 0,
      category: "Web",
      metrics: {
        users: "500+",
        performance: "98% satisfaction",
        impact: "Increased sales by 45%"
      }
    },
    {
      id: "smartschedule-ai",
      title: "SmartSchedule • AI Timetable Generator",
      description: "Intelligent timetable generation system that creates optimized schedules for educational institutions, handling complex constraints and preferences efficiently with AI algorithms",
      problem: "Educational institutions spent hours manually creating conflict-free timetables across hundreds of subjects, rooms, and teachers.",
      solution: "Developed an AI-powered scheduling engine that automatically generates optimized, conflict-free timetables in seconds.",
      features: ["Constraint-based optimization", "Teacher availability management", "Room allocation engine", "Export to PDF/Excel", "Admin controls"],
      businessImpact: "Reduced timetable creation time from 3 days to under 5 minutes.",
      duration: "4 Weeks",
      technologies: ["Python", "Algorithm Design", "Scheduling", "Optimization", "Web Development"],
      githubUrl: "https://github.com/jenish1345/timetable-generator",
      liveUrl: "https://github.com/jenish1345/timetable-generator",
      emoji: "📅",
      featured: true,
      order: 1,
      category: "Web"
    },
    {
      id: "acds-intelligence",
      title: "ACDS • Autonomous Diagnostic Intelligence",
      description: "AI-powered SaaS platform that monitors organizational health, detects risks, and provides strategic recommendations using Groq Llama 3.3 70B for automated anomaly detection and root cause analysis",
      problem: "Organizations lacked real-time tools to detect operational risks and anomalies before they became critical business issues.",
      solution: "Built an AI SaaS platform powered by Groq Llama 3.3 70B that continuously monitors KPIs, detects anomalies, and auto-generates root cause analysis reports.",
      features: ["Real-time anomaly detection", "AI-generated recommendations", "Interactive dashboards", "Risk scoring system", "Automated reporting"],
      businessImpact: "Reduced risk assessment time by 70% and improved early detection rate to 94%.",
      duration: "6 Weeks",
      technologies: ["Python", "AI/ML", "SaaS", "Business Intelligence", "Groq Llama 3.3", "Data Analytics"],
      githubUrl: "https://github.com/jenish1345/acds_platform",
      liveUrl: "https://github.com/jenish1345/acds_platform",
      emoji: "🎓",
      featured: true,
      order: 2,
      category: "AI/ML",
      metrics: {
        dataPoints: "10,000+",
        accuracy: "94% detection rate",
        impact: "Reduced risk assessment time by 70%"
      }
    },
    {
      id: "churnguard-ml",
      title: "ChurnGuard • ML Retention Dashboard",
      description: "Machine learning-powered dashboard predicting customer churn with actionable insights, retention strategies, and business intelligence analytics",
      problem: "Businesses could not predict which customers were about to leave, leading to avoidable revenue loss.",
      solution: "Trained a machine learning model on customer behavior data to predict churn with 89% accuracy, integrated into an interactive dashboard.",
      features: ["89% prediction accuracy", "Customer segmentation", "Retention strategy recommendations", "Visual analytics", "Exportable reports"],
      businessImpact: "Improved customer retention rate by 32% for pilot businesses.",
      duration: "5 Weeks",
      technologies: ["Python", "Scikit-learn", "Pandas", "Machine Learning", "Data Visualization", "Dashboard"],
      githubUrl: "https://github.com/jenish1345/customer-churn-prediction-retention-dashboard",
      liveUrl: "https://github.com/jenish1345/customer-churn-prediction-retention-dashboard",
      emoji: "📊",
      featured: true,
      order: 3,
      category: "AI/ML",
      metrics: {
        accuracy: "89% prediction accuracy",
        dataAnalyzed: "50,000+ records",
        impact: "Improved retention by 32%"
      }
    },
    {
      id: "sportizen-social",
      title: "SportiZen • Athletes Social Network",
      description: "A sports-based social application that enables athletes and sports enthusiasts to share their achievements, connect with like-minded individuals, and celebrate sporting milestones",
      problem: "Sports enthusiasts had no dedicated platform to connect with fellow athletes and track their athletic journey.",
      solution: "Built a full social network focused on sports, featuring achievement sharing, community connections, and milestone celebrations.",
      features: ["Achievement feed", "Athlete profiles", "Community groups", "Event tracking", "Real-time notifications"],
      businessImpact: "Grew to 1,200+ active users and built a thriving sports community.",
      duration: "8 Weeks",
      technologies: ["React", "Node.js", "MongoDB", "Mobile App", "Social Media", "Sports Tech"],
      githubUrl: "https://github.com/KEERTHIVASAN-SKVS/SportiZen",
      liveUrl: "https://github.com/KEERTHIVASAN-SKVS/SportiZen",
      emoji: "🏆",
      featured: true,
      order: 4,
      category: "Mobile",
      metrics: {
        users: "1,200+",
        engagement: "85% daily active users",
        impact: "Built thriving sports community"
      }
    },
    {
      id: "eduflow-registration",
      title: "EduFlow • Course Registration System",
      description: "Comprehensive course registration platform enabling students to browse, select, and enroll in courses with real-time availability tracking and conflict detection",
      problem: "Manual course registration at educational institutions caused enrollment conflicts, long queues, and administrative overhead.",
      solution: "Developed a web-based registration system with real-time seat availability, conflict detection, and automated enrollment confirmations.",
      features: ["Real-time seat tracking", "Conflict detection", "Student portal", "Admin management", "Email confirmations"],
      businessImpact: "Eliminated registration conflicts and reduced admin workload by 60%.",
      duration: "3 Weeks",
      technologies: ["React", "Node.js", "MySQL", "Database Management", "User Authentication"],
      githubUrl: "https://github.com/jenish1345/course-registration-system",
      liveUrl: "https://github.com/jenish1345/course-registration-system",
      emoji: "📚",
      featured: true,
      order: 5,
      category: "Web"
    },
    {
      id: "travelease-booking",
      title: "TravelEase • Bus Booking System",
      description: "Online bus ticket reservation platform with seat selection, payment integration, and booking management for seamless travel planning",
      problem: "Travelers had to visit bus stations in person or call agents to book tickets, wasting significant time.",
      solution: "Built an online bus booking platform with interactive seat selection, payment integration, and instant booking confirmation.",
      features: ["Interactive seat map", "Payment gateway", "E-ticket generation", "Booking management", "Route search"],
      businessImpact: "Enabled 100% digital ticket booking, eliminating in-person queue visits.",
      duration: "4 Weeks",
      technologies: ["React", "Node.js", "MySQL", "Payment Gateway", "Booking System"],
      githubUrl: "https://github.com/jenish1345/BUS-TICKET-BOOKING",
      liveUrl: "https://github.com/jenish1345/BUS-TICKET-BOOKING",
      emoji: "🚌",
      featured: true,
      order: 6,
      category: "Web"
    },
    {
      id: "quizmaster-pro",
      title: "QuizMaster • Interactive Learning Platform",
      description: "Interactive quiz application with dynamic question generation, scoring system, and performance analytics for enhanced learning experiences",
      problem: "Traditional learning assessments were static, boring, and provided no real-time performance feedback to students.",
      solution: "Created an engaging quiz platform with dynamic question generation, instant scoring, and detailed performance analytics.",
      features: ["Dynamic question banks", "Real-time scoring", "Performance analytics", "Multiple categories", "Leaderboard"],
      businessImpact: "Improved student engagement and assessment completion rates.",
      duration: "2 Weeks",
      technologies: ["React", "JavaScript", "UI/UX Design", "State Management"],
      githubUrl: "https://github.com/jenish1345/quiz-app",
      liveUrl: "https://github.com/jenish1345/quiz-app",
      emoji: "❓",
      featured: true,
      order: 7,
      category: "Web"
    },
    {
      id: "notesync-cloud",
      title: "NoteSync • Cloud Note-Taking",
      description: "Feature-rich note-taking application with organization tools, search functionality, and cloud sync for seamless productivity across devices",
      problem: "Professionals and students needed a simple yet powerful note-taking tool that works seamlessly across all their devices.",
      solution: "Built a clean, fast note-taking app with cloud sync, markdown support, and powerful search and organization features.",
      features: ["Cloud sync", "Markdown support", "Tag organization", "Full-text search", "Dark mode"],
      businessImpact: "Boosted personal productivity with zero learning curve.",
      duration: "2 Weeks",
      technologies: ["React", "JavaScript", "Local Storage", "Cloud Sync", "Markdown"],
      githubUrl: "https://github.com/jenish1345/notes-app",
      liveUrl: "https://github.com/jenish1345/notes-app",
      emoji: "📝",
      featured: true,
      order: 8,
      category: "Web"
    },
    {
      id: "courseconnect-network",
      title: "CourseConnect • Learning Network",
      description: "Platform connecting students with courses and instructors, facilitating seamless communication and collaborative learning experiences",
      problem: "Students struggled to find the right courses and connect with qualified instructors in one unified place.",
      solution: "Developed a learning network that seamlessly connects students with instructors, enabling direct communication and course enrollment.",
      features: ["Instructor profiles", "Real-time chat", "Course listings", "Student-instructor matching", "Progress tracking"],
      businessImpact: "Created a unified learning ecosystem connecting students and instructors.",
      duration: "3 Weeks",
      technologies: ["React", "Node.js", "MongoDB", "Social Learning", "Real-time Chat"],
      githubUrl: "https://github.com/jenish1345/course-connect",
      liveUrl: "https://github.com/jenish1345/course-connect",
      emoji: "🔗",
      featured: true,
      order: 9,
      category: "Web"
    }
  ],
  contact: {
    email: "antonyjenishfernando.27it@licet.ac.in",
    phone: "+91 9042679134",
    location: "Chennai, Tamil Nadu, India",
    linkedIn: "https://www.linkedin.com/in/antony-jenish-fernando-j-5188ba290",
    github: "https://github.com/jenish1345",
    availability: "Available for Freelance Projects",
    responseTime: "Within 24 Hours"
  }
};
