export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  businessImpact?: string;
  duration?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  icon?: string;
  emoji?: string;
  featured: boolean;
  order: number;
  category?: string;
  metrics?: {
    [key: string]: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  stream?: string;
  years: string;
  current: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github?: string;
  availability?: string;
  responseTime?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    summary: string;
    profileImage: string;
    portfolio?: string;
  };
  education: Education[];
  skills: string[];
  areasOfInterest: string[];
  languages: string[];
  projects: Project[];
  contact: ContactInfo;
}
