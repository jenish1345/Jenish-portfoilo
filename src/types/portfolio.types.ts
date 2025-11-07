export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl: string;
  icon?: string;
  emoji?: string;
  featured: boolean;
  order: number;
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
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    summary: string;
    profileImage: string;
  };
  education: Education[];
  skills: string[];
  areasOfInterest: string[];
  languages: string[];
  projects: Project[];
  contact: ContactInfo;
}
