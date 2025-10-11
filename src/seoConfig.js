// SEO Configuration for all pages
export const seoConfig = {
  // Home/About Page
  about: {
    title: "About Jerophin D R | Full-Stack Developer & AI Enthusiast Portfolio",
    description: "Meet Jerophin D R, a passionate Full-Stack Developer and AI enthusiast from Chennai. Discover my journey, achievements, and innovative projects in web development and machine learning.",
    keywords: "Jerophin D R, About, Full Stack Developer, AI Enthusiast, React Developer, Python Developer, Machine Learning, Cloud Computing, Chennai Developer, Portfolio, Hackathon Winner, Web Development, FastAPI, MongoDB, UI/UX Designer, Software Engineer, Tech Professional",
    ogType: "profile",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jerophin D R",
      "alternateName": "Jero",
      "description": "Full-Stack Developer and AI Enthusiast specializing in React, Python, Machine Learning, and Cloud Technologies",
      "url": "https://jerophin-portfolio.vercel.app/about",
      "image": "https://jerophin-portfolio.vercel.app/profile.jpg",
      "sameAs": [
        "https://github.com/Jerophin583",
        "https://linkedin.com/in/jerophin-d-r",
        "https://twitter.com/Jerophin583"
      ],
      "jobTitle": "Full-Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "India"
      },
      "knowsAbout": [
        "React", "JavaScript", "Python", "FastAPI", "MongoDB", "Machine Learning",
        "Artificial Intelligence", "Cloud Computing", "Web Development", "UI/UX Design"
      ]
    }
  },

  // Skills Page
  skills: {
    title: "Technical Skills | Jerophin D R - Full-Stack Developer Portfolio",
    description: "Explore Jerophin D R's technical skills in Full-Stack Development, AI, Machine Learning, and Cloud Technologies. Expertise in React, Python, FastAPI, MongoDB, and AWS.",
    keywords: "Jerophin D R, Skills, Technical Skills, Full Stack Developer, React, JavaScript, Python, FastAPI, MongoDB, Node.js, Machine Learning, AI, Cloud Computing, AWS, Azure, Web Development, Frontend, Backend, Database, UI/UX Design, Chennai Developer",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Jerophin D R Technical Skills",
      "description": "Comprehensive list of technical skills and expertise",
      "url": "https://jerophin-portfolio.vercel.app/skills",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Frontend Development",
          "description": "React, JavaScript, HTML5, CSS3, Material UI, Responsive Design"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Backend Development",
          "description": "Python, FastAPI, Node.js, Express.js, RESTful APIs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Database Technologies",
          "description": "MongoDB, SQL, PostgreSQL, Database Design"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "AI & Machine Learning",
          "description": "Machine Learning, Artificial Intelligence, Data Science, Python ML Libraries"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Cloud Technologies",
          "description": "AWS, Azure, Google Cloud Platform, Cloud Deployment"
        }
      ]
    }
  },

  // Experience Page
  experience: {
    title: "Professional Experience | Jerophin D R - Full-Stack Developer",
    description: "Discover Jerophin D R's professional journey, internships, and hackathon achievements in AI, Full-Stack Development, and Cloud Technologies. From startups to winning hackathons.",
    keywords: "Jerophin D R, Experience, Professional Experience, Internships, Hackathons, AI Projects, Full-Stack Development, Cloud Computing, Career Journey, Work Experience, Project Experience, Startup Experience, Tech Industry, Chennai Developer",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jerophin D R",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full-Stack Developer",
        "description": "Developing web applications and AI solutions"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Engineering College"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Hackathon Winner",
          "credentialCategory": "award"
        }
      ]
    }
  },

  // Projects Page
  projects: {
    title: "Featured Projects | Jerophin D R - Full-Stack Developer Portfolio",
    description: "Explore Jerophin D R's innovative projects including AI-driven applications, Full-Stack web solutions, phishing detection systems, and real-time cloud applications. Live demos included.",
    keywords: "Jerophin D R, Projects, Portfolio Projects, AI Projects, Machine Learning Projects, Full-Stack Projects, React Projects, Python Projects, Web Applications, Cloud Projects, Phishing Detection, Waste Management, Real-time Applications, GitHub Projects, Live Demos, Chennai Developer",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Jerophin D R Featured Projects",
      "description": "Collection of innovative web development and AI projects",
      "url": "https://jerophin-portfolio.vercel.app/projects",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "AI-Powered Applications",
          "description": "Machine learning and artificial intelligence projects"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Full-Stack Web Applications",
          "description": "Complete web solutions with frontend and backend"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Cloud-Based Solutions",
          "description": "Scalable applications deployed on cloud platforms"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Security Applications",
          "description": "Cybersecurity and phishing detection systems"
        }
      ]
    }
  },

  // Certifications Page
  certifications: {
    title: "Professional Certifications | Jerophin D R - Full-Stack Developer",
    description: "Browse Jerophin D R's professional certifications in AI, Cloud Computing, Full-Stack Development, and Cybersecurity. Verified achievements from AWS, Azure, and Google Cloud.",
    keywords: "Jerophin D R, Certifications, Professional Certifications, AI Certifications, Cloud Certifications, AWS Certifications, Azure Certifications, Google Cloud Certifications, Full-Stack Certifications, Cybersecurity Certifications, Tech Certifications, Verified Skills, Professional Development, Chennai Developer",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jerophin D R",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "AI and Machine Learning Certifications",
          "credentialCategory": "certificate"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Cloud Computing Certifications",
          "credentialCategory": "certificate"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Full-Stack Development Certifications",
          "credentialCategory": "certificate"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Cybersecurity Certifications",
          "credentialCategory": "certificate"
        }
      ]
    }
  },

  // Achievements Page
  achievements: {
    title: "Achievements & Awards | Jerophin D R - Full-Stack Developer",
    description: "Discover Jerophin D R's professional achievements, hackathon wins, awards, and recognitions in the tech industry. From coding competitions to innovative solutions.",
    keywords: "Jerophin D R, Achievements, Awards, Hackathon Wins, Coding Competitions, Tech Awards, Professional Achievements, Recognition, Innovation Awards, Problem Solving, Tech Industry Achievements, Chennai Developer, Full-Stack Developer Achievements",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jerophin D R",
      "award": [
        {
          "@type": "Award",
          "name": "Hackathon Winner",
          "description": "Winner of multiple hackathons and coding competitions"
        },
        {
          "@type": "Award",
          "name": "Innovation Recognition",
          "description": "Recognition for innovative tech solutions"
        }
      ]
    }
  },

  // Other Profiles Page
  otherprofiles: {
    title: "Connect with Jerophin D R | Social Profiles & Links",
    description: "Connect with Jerophin D R across multiple platforms. Find my GitHub, LinkedIn, Twitter, and other professional profiles. Your gateway to my developer presence.",
    keywords: "Jerophin D R, Social Profiles, GitHub Profile, LinkedIn Profile, Twitter Profile, Developer Links, Professional Profiles, Social Media, Connect, Developer Presence, Open Source, Professional Network, Chennai Developer, Full-Stack Developer Profiles",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jerophin D R",
      "sameAs": [
        "https://github.com/Jerophin583",
        "https://linkedin.com/in/jerophin-d-r",
        "https://twitter.com/Jerophin583"
      ],
      "url": "https://jerophin-portfolio.vercel.app/otherprofiles"
    }
  }
};

// Function to update SEO meta tags dynamically
export const updateSEO = (pageKey) => {
  const config = seoConfig[pageKey];
  if (!config) return;

  // Remove any existing duplicate tags first
  removeDuplicateTags();

  // Update title - ensure only one title tag exists
  const titleElement = document.getElementById('page-title');
  if (titleElement) {
    titleElement.textContent = config.title;
  } else {
    // Create title if it doesn't exist
    const title = document.createElement('title');
    title.id = 'page-title';
    title.textContent = config.title;
    document.head.appendChild(title);
  }

  // Update meta tags - ensure only one of each type exists
  updateOrCreateMetaTag('meta-title', 'name', 'title', config.title);
  updateOrCreateMetaTag('meta-description', 'name', 'description', config.description);
  updateOrCreateMetaTag('meta-keywords', 'name', 'keywords', config.keywords);

  // Update canonical URL - ensure only one canonical exists
  updateOrCreateCanonical(`https://jerophin-portfolio.vercel.app/${pageKey === 'about' ? '' : pageKey}`);

  // Update Open Graph tags
  updateOrCreateMetaTag('og-type', 'property', 'og:type', config.ogType);
  updateOrCreateMetaTag('og-url', 'property', 'og:url', `https://jerophin-portfolio.vercel.app/${pageKey === 'about' ? '' : pageKey}`);
  updateOrCreateMetaTag('og-title', 'property', 'og:title', config.title);
  updateOrCreateMetaTag('og-description', 'property', 'og:description', config.description);

  // Update Twitter tags
  updateOrCreateMetaTag('twitter-url', 'name', 'twitter:url', `https://jerophin-portfolio.vercel.app/${pageKey === 'about' ? '' : pageKey}`);
  updateOrCreateMetaTag('twitter-title', 'name', 'twitter:title', config.title);
  updateOrCreateMetaTag('twitter-description', 'name', 'twitter:description', config.description);

  // Update structured data
  if (config.structuredData) {
    updateStructuredData(config.structuredData);
  }

  // Track page view in analytics
  trackPageView(config.title, pageKey);
};

// Helper function to remove duplicate tags
const removeDuplicateTags = () => {
  // Remove duplicate title tags
  const titles = document.querySelectorAll('title');
  for (let i = 1; i < titles.length; i++) {
    titles[i].remove();
  }

  // Remove duplicate meta description tags
  const descriptions = document.querySelectorAll('meta[name="description"]');
  for (let i = 1; i < descriptions.length; i++) {
    descriptions[i].remove();
  }

  // Remove duplicate canonical tags
  const canonicals = document.querySelectorAll('link[rel="canonical"]');
  for (let i = 1; i < canonicals.length; i++) {
    canonicals[i].remove();
  }
};

// Helper function to update or create meta tags
const updateOrCreateMetaTag = (id, attribute, name, content) => {
  let element = document.getElementById(id);
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.id = id;
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

// Helper function to update or create canonical link
const updateOrCreateCanonical = (href) => {
  let element = document.getElementById('canonical-url');
  if (element) {
    element.setAttribute('href', href);
  } else {
    element = document.createElement('link');
    element.id = 'canonical-url';
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', href);
    document.head.appendChild(element);
  }
};

// Helper function to update structured data
const updateStructuredData = (structuredData) => {
  // Remove existing structured data scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData, null, 2);
  document.head.appendChild(script);
};

// Function to track page views in analytics
const trackPageView = (pageTitle, pageKey) => {
  // Google Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: window.location.pathname,
      custom_parameter_1: pageKey
    });
  }

  // Microsoft Clarity tracking
  if (typeof clarity !== 'undefined') {
    clarity('set', 'CurrentPage', pageKey);
    clarity('event', 'page_view');
  }
};

// Function to get page key from current URL
export const getCurrentPageKey = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '/about') return 'about';
  if (path === '/skills') return 'skills';
  if (path === '/experience') return 'experience';
  if (path === '/projects') return 'projects';
  if (path === '/certifications') return 'certifications';
  if (path === '/achievements') return 'achievements';
  if (path === '/otherprofiles') return 'otherprofiles';
  return 'about'; // default
};
