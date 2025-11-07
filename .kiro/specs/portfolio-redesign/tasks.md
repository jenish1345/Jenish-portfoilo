# Implementation Plan

- [x] 1. Set up data configuration and TypeScript interfaces
  - Create `src/types/portfolio.types.ts` with Project, Education, ContactInfo, and PortfolioData interfaces
  - Create `src/data/portfolioData.ts` with complete portfolio data including all four projects (Habit Tracker, Quiz Generator, Sportizen, Customer Churn Prediction)
  - Add placeholder GitHub URLs that can be updated later
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

- [x] 2. Create ProjectCard component
  - [x] 2.1 Implement ProjectCard component with TypeScript interface
    - Create `src/components/project/ProjectCard.tsx` with Project interface props
    - Implement card layout with title, description, technology badges, and View Project button
    - Add glass-morphism styling with backdrop blur effect (reuse existing styles)
    - Implement hover effects with elevation and glow (reuse existing hover-glow class)
    - _Requirements: 3.6, 4.3, 4.4_
  
  - [x] 2.2 Implement GitHub link functionality
    - Add click handler that opens GitHub URL in new tab using `window.open()`
    - Include error handling for popup blockers with toast notification
    - Add proper `rel="noopener noreferrer"` for security
    - _Requirements: 4.1, 4.2_

- [x] 3. Update Portfolio component to use data configuration
  - [x] 3.1 Refactor Portfolio.tsx to import and use portfolioData
    - Import portfolioData from `src/data/portfolioData.ts`
    - Replace hardcoded data in hero section with portfolioData.personal
    - Replace hardcoded projects array with portfolioData.projects
    - Replace hardcoded skills with portfolioData.skills and areasOfInterest
    - Replace hardcoded contact info with portfolioData.contact
    - _Requirements: 7.1, 7.2, 7.8, 3.1_
  
  - [x] 3.2 Update projects section to use ProjectCard component
    - Import ProjectCard component
    - Replace inline project cards with ProjectCard component mapping
    - Ensure all four projects are displayed (add missing Customer Churn Prediction)
    - Update Quiz Generator project data (currently shows News Scraping)
    - Verify 2x2 grid layout on desktop (currently shows 3-column grid)
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 4.1, 4.2_
  
  - [x] 3.3 Fix contact information
    - Update email from jenfdo134@gmail.com to antonyjenish1345@gmail.com
    - Update location from "Nungambakkam, Chennai" to "Lionstown, Thoothukudi, Chennai"
    - Verify phone number is correct (+91 9042679134)
    - _Requirements: 6.1, 6.2, 6.4_

- [ ] 4. Enhance AnimatedBackground component
  - [ ] 4.1 Add variant and intensity props
    - Update AnimatedBackground to accept optional variant ('default' | 'hero' | 'projects' | 'contact') and intensity ('low' | 'medium' | 'high') props
    - Implement conditional rendering based on variant prop
    - Keep existing particle animations as default
    - _Requirements: 1.1, 1.2, 1.4_
  
  - [ ] 4.2 Implement reduced motion support
    - Add prefers-reduced-motion media query detection using window.matchMedia
    - Disable or simplify animations when user prefers reduced motion
    - Apply to both AnimatedBackground and GSAP animations
    - _Requirements: 1.4_

- [ ]* 5. Performance and accessibility improvements
  - [ ]* 5.1 Add accessibility attributes
    - Add proper ARIA labels to buttons and links
    - Verify alt text on profile image
    - Test keyboard navigation through all interactive elements
    - _Requirements: 5.1, 5.3_
  
  - [ ]* 5.2 Run performance audit
    - Use Lighthouse to check performance metrics
    - Optimize animation performance if needed
    - Check bundle size
    - _Requirements: 1.4_
