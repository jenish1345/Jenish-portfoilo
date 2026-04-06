import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics Measurement ID - Replace with your actual ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your Google Analytics ID

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

// Custom event tracking functions
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackProjectClick = (projectName: string, projectUrl: string) => {
  trackEvent('project_click', {
    project_name: projectName,
    project_url: projectUrl,
  });
};

export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit');
};

export const trackEmailClick = () => {
  trackEvent('email_click');
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    platform: platform,
  });
};

export default Analytics;
