import { PortfolioData } from "@/types/portfolio.types";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Antony Jenish Fernando J",
    title: "Information Technology Student & Tech Enthusiast",
    summary: "Enthusiastic and detail-oriented Information Technology student with a strong foundation in programming, software development, and problem-solving. Passionate about AI, machine learning, and creating innovative solutions.",
    profileImage: "/lovable-uploads/d737aef4-76c3-4c23-ab88-26d76a8d4b78.png"
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
      id: "habit-tracker",
      title: "Habit Tracker Application",
      description: "Object-oriented habit tracking application built with Java, implementing OOP concepts for efficient habit management and progress tracking",
      technologies: ["Java", "OOP", "GUI Design", "Data Structures"],
      githubUrl: "https://github.com/antonyjenish/habit-tracker",
      emoji: "📋",
      featured: true,
      order: 1
    },
    {
      id: "quiz-generator",
      title: "Quiz Generator",
      description: "Intelligent quiz generation system that automatically creates quizzes when notes are uploaded, using NLP and content analysis to generate relevant questions",
      technologies: ["Python", "NLP", "Machine Learning", "Web Development"],
      githubUrl: "https://github.com/antonyjenish/quiz-generator",
      emoji: "📝",
      featured: true,
      order: 2
    },
    {
      id: "sportizen",
      title: "Sportizen",
      description: "A sports-based social application that enables athletes and sports enthusiasts to share their achievements, connect with like-minded individuals, and celebrate sporting milestones",
      technologies: ["Mobile App", "Social Media", "Sports Tech", "Community"],
      githubUrl: "https://github.com/antonyjenish/sportizen",
      emoji: "🏆",
      featured: true,
      order: 3
    },
    {
      id: "customer-churn-prediction",
      title: "Customer Churn Prediction",
      description: "Machine learning model predicting customer churn with business context analysis, helping companies retain customers through data-driven insights and predictive analytics",
      technologies: ["Python", "Scikit-learn", "Data Analysis", "Business Intelligence"],
      githubUrl: "https://github.com/antonyjenish/customer-churn-prediction",
      emoji: "📊",
      featured: true,
      order: 4
    }
  ],
  contact: {
    email: "antonyjenish1345@gmail.com",
    phone: "+91 9042679134",
    location: "Lionstown, Thoothukudi, Chennai",
    linkedIn: "https://www.linkedin.com/in/antony-jenish-5188ba290"
  }
};
