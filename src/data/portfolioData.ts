import { PortfolioData } from "@/types/portfolio.types";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Antony Jenish Fernando",
    title: "Full Stack Developer & Machine Learning Enthusiast",
    summary: "Information Technology student passionate about building scalable applications and exploring AI-driven solutions.",
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
    "Java",
    "Python",
    "Web Design",
    "Data Science",
    "Machine Learning",
    "Graphic Design",
    "Branding",
    "Marketing"
  ],
  areasOfInterest: [
    "Artificial Intelligence and Machine Learning",
    "Internet of Things (IoT)",
    "Blockchain Technology",
    "Big Data and Data Analytics",
    "Data Science and Handling"
  ],
  languages: ["English", "Tamil"],
  projects: [
    {
      id: "house-of-elleora",
      title: "House of Elleora",
      description: "Premium e-commerce platform for luxury fashion and lifestyle products. Full-stack freelance project featuring modern UI/UX, secure payment integration, and seamless shopping experience",
      technologies: ["React", "Next.js", "E-commerce", "Full Stack", "Freelance"],
      githubUrl: "https://houseofelleora.netlify.app",
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
      id: "timetable-generator",
      title: "Timetable Generator",
      description: "Automated timetable generation system that creates optimized schedules for educational institutions, handling constraints and preferences efficiently",
      technologies: ["Algorithm Design", "Scheduling", "Optimization", "Web Development"],
      githubUrl: "https://github.com/jenish1345/timetable-generator",
      emoji: "📅",
      featured: true,
      order: 1,
      category: "Web"
    },
    {
      id: "course-registration-system",
      title: "Course Registration System",
      description: "Comprehensive course registration platform enabling students to browse, select, and enroll in courses with real-time availability tracking and conflict detection",
      technologies: ["Database Management", "Web Development", "User Authentication", "Real-time Updates"],
      githubUrl: "https://github.com/jenish1345/course-registration-system",
      emoji: "📚",
      featured: true,
      order: 2,
      category: "Web"
    },
    {
      id: "quiz-app",
      title: "Quiz App",
      description: "Interactive quiz application with dynamic question generation, scoring system, and performance analytics for enhanced learning experiences",
      technologies: ["React", "JavaScript", "UI/UX Design", "State Management"],
      githubUrl: "https://github.com/jenish1345/quiz-app",
      emoji: "❓",
      featured: true,
      order: 3,
      category: "Web"
    },
    {
      id: "acds-platform",
      title: "ACDS - Autonomous Company Diagnostic System",
      description: "AI-powered SaaS platform that monitors organizational health, detects risks, and provides strategic recommendations using Groq Llama 3.3 70B for automated anomaly detection and root cause analysis",
      technologies: ["AI/ML", "SaaS", "Business Intelligence", "Groq Llama 3.3", "Data Analytics"],
      githubUrl: "https://github.com/jenish1345/acds_platform",
      emoji: "🎓",
      featured: true,
      order: 4,
      category: "AI/ML",
      metrics: {
        dataPoints: "10,000+",
        accuracy: "94% detection rate",
        impact: "Reduced risk assessment time by 70%"
      }
    },
    {
      id: "sportizen",
      title: "SportiZen",
      description: "A sports-based social application that enables athletes and sports enthusiasts to share their achievements, connect with like-minded individuals, and celebrate sporting milestones",
      technologies: ["Mobile App", "Social Media", "Sports Tech", "Community"],
      githubUrl: "https://github.com/KEERTHIVASAN-SKVS/SportiZen",
      emoji: "🏆",
      featured: true,
      order: 5,
      category: "Mobile",
      metrics: {
        users: "1,200+",
        engagement: "85% daily active users",
        impact: "Built thriving sports community"
      }
    },
    {
      id: "notes-app",
      title: "Notes App",
      description: "Feature-rich note-taking application with organization tools, search functionality, and cloud sync for seamless productivity across devices",
      technologies: ["React", "Local Storage", "Cloud Sync", "Markdown Support"],
      githubUrl: "https://github.com/jenish1345/notes-app",
      emoji: "📝",
      featured: true,
      order: 6,
      category: "Web"
    },
    {
      id: "bus-ticket-booking",
      title: "Bus Ticket Booking System",
      description: "Online bus ticket reservation platform with seat selection, payment integration, and booking management for seamless travel planning",
      technologies: ["Payment Gateway", "Booking System", "Database Design", "API Integration"],
      githubUrl: "https://github.com/jenish1345/BUS-TICKET-BOOKING",
      emoji: "🚌",
      featured: true,
      order: 7,
      category: "Web"
    },
    {
      id: "course-connect",
      title: "Course Connect",
      description: "Platform connecting students with courses and instructors, facilitating seamless communication and collaborative learning experiences",
      technologies: ["Social Learning", "Real-time Chat", "Course Management", "Networking"],
      githubUrl: "https://github.com/jenish1345/course-connect",
      emoji: "🔗",
      featured: true,
      order: 8,
      category: "Web"
    },
    {
      id: "customer-churn-dashboard",
      title: "Customer Churn Prediction & Retention Dashboard",
      description: "Machine learning-powered dashboard predicting customer churn with actionable insights, retention strategies, and business intelligence analytics",
      technologies: ["Python", "Machine Learning", "Data Visualization", "Business Intelligence", "Dashboard"],
      githubUrl: "https://github.com/jenish1345/customer-churn-prediction-retention-dashboard",
      emoji: "📊",
      featured: true,
      order: 9,
      category: "AI/ML",
      metrics: {
        accuracy: "89% prediction accuracy",
        dataAnalyzed: "50,000+ records",
        impact: "Improved retention by 32%"
      }
    }
  ],
  contact: {
    email: "antonyjenishfernando.27it@licet.ac.in",
    phone: "+91 9042679134",
    location: "Lionstown, Thoothukudi, Chennai",
    linkedIn: "https://www.linkedin.com/in/antony-jenish-fernando-j-5188ba290"
  }
};
