// SEO Configuration for all pages
export const seoConfig = {
  // Home/About Page
  about: {
    title: "About Jerophin D R | Full-Stack Developer & AI Enthusiast Portfolio",
    description: "Meet Jerophin D R, a passionate Full-Stack Developer and AI enthusiast from Chennai. Discover my journey, achievements, hackathon wins, and innovative projects in web development, machine learning, and cloud technologies.",
    keywords: "Jerophin D R, About, Full Stack Developer, AI Enthusiast, React Developer, Python Developer, Machine Learning, Cloud Computing, Chennai Developer, Portfolio, Hackathon Winner, Web Development, FastAPI, MongoDB, UI/UX Designer, Software Engineer, Tech Professional",
    ogType: "profile",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jerophin D R",
      "alternateName": "Jerophin583",
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
    description: "Explore Jerophin D R's comprehensive technical skills in Full-Stack Development, AI, Machine Learning, and Cloud Technologies. Expertise in React, Python, FastAPI, MongoDB, AWS, and modern web development frameworks.",
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
    description: "Discover Jerophin D R's professional journey, internships, hackathon achievements, and real-world project experience in AI, Full-Stack Development, and Cloud Technologies. From startup internships to winning hackathons.",
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
    description: "Explore Jerophin D R's innovative projects including AI-driven applications, Full-Stack web solutions, phishing detection systems, waste management platforms, and real-time cloud applications. Live demos and GitHub repositories included.",
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
    description: "Browse Jerophin D R's professional certifications in AI, Cloud Computing, Full-Stack Development, and Cybersecurity. Verified achievements from AWS, Azure, Google Cloud, and leading tech platforms showcasing technical expertise.",
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
    description: "Discover Jerophin D R's professional achievements, hackathon wins, awards, and recognitions in the tech industry. From winning coding competitions to building innovative solutions that solve real-world problems.",
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
    description: "Connect with Jerophin D R across multiple platforms. Find my GitHub, LinkedIn, Twitter, and other professional profiles. Your gateway to my developer presence, open-source contributions, and professional network.",
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

  // Update title
  const titleElement = document.getElementById('page-title');
  if (titleElement) titleElement.textContent = config.title;

  // Update meta tags
  const metaTitle = document.getElementById('meta-title');
  if (metaTitle) metaTitle.setAttribute('content', config.title);

  const metaDescription = document.getElementById('meta-description');
  if (metaDescription) metaDescription.setAttribute('content', config.description);

  const metaKeywords = document.getElementById('meta-keywords');
  if (metaKeywords) metaKeywords.setAttribute('content', config.keywords);

  // Update canonical URL
  const canonicalUrl = document.getElementById('canonical-url');
  if (canonicalUrl) canonicalUrl.setAttribute('href', `https://jerophin-portfolio.vercel.app/${pageKey === 'about' ? '' : pageKey}`);

  // Update Open Graph tags
  const ogType = document.getElementById('og-type');
  if (ogType) ogType.setAttribute('content', config.ogType);

  const ogUrl = document.getElementById('og-url');
  if (ogUrl) ogUrl.setAttribute('content', `https://jerophin-portfolio.vercel.app/${pageKey === 'about' ? '' : pageKey}`);

  const ogTitle = document.getElementById('og-title');
  if (ogTitle) ogTitle.setAttribute('content', config.title);

  const ogDescription = document.getElementById('og-description');
  if (ogDescription) ogDescription.setAttribute('content', config.description);

  // Update Twitter tags
  const twitterUrl = document.getElementById('twitter-url');
  if (twitterUrl) twitterUrl.setAttribute('content', `https://jerophin-portfolio.vercel.app/${pageKey === 'about' ? '' : pageKey}`);

  const twitterTitle = document.getElementById('twitter-title');
  if (twitterTitle) twitterTitle.setAttribute('content', config.title);

  const twitterDescription = document.getElementById('twitter-description');
  if (twitterDescription) twitterDescription.setAttribute('content', config.description);

  // Update structured data
  if (config.structuredData) {
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(config.structuredData, null, 2);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(config.structuredData, null, 2);
      document.head.appendChild(script);
    }
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
