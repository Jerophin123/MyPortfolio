// Skills data for SEO and individual pages (without SVG - SVG stays in page array)
import { generateSlug } from './utils';

export const skills = [
  {
    slug: generateSlug('Platforms & Operating Systems'),
    title: 'Platforms & Operating Systems',
    description: 'Windows, Linux (Ubuntu, XFCE), Cross-platform environments, Portfolio hosting'
  },
  {
    slug: generateSlug('Programming & Scripting Languages'),
    title: 'Programming & Scripting Languages',
    description: 'C, C++, Java, JavaScript (ES6+), Python, R, PHP, SQL, Bash'
  },
  {
    slug: generateSlug('Full-Stack Development'),
    title: 'Full-Stack Development',
    description: 'Frontend – HTML5, CSS3, Tailwind, Bootstrap, React, Vue, Angular, React Native, Next.js, MUI, Vite, Web3.js, Context API, React Router, React Hook Form. Backend – Node.js, Express, Django, Flask, FastAPI, NestJS, Spring Boot, Apache, Tomcat, Gunicorn, Jinja'
  },
  {
    slug: generateSlug('API Design & Integration'),
    title: 'API Design & Integration',
    description: 'RESTful API Development, JWT Authentication, OpenAPI/Swagger, Versioning, Socket.IO'
  },
  {
    slug: generateSlug('Cloud & DevOps'),
    title: 'Cloud & DevOps',
    description: 'AWS, Google Cloud, Azure, Firebase, Vercel, Heroku, Cloudflare, Docker (Basic), Jenkins, CI/CD Pipelines'
  },
  {
    slug: generateSlug('Data & Databases'),
    title: 'Data & Databases',
    description: 'MySQL, PostgreSQL, SQLite, MongoDB, MariaDB, Apache Hadoop, Relational Modeling, Query Optimization'
  },
  {
    slug: generateSlug('Data Science & Machine Learning'),
    title: 'Data Science & Machine Learning',
    description: 'Pandas, NumPy, Matplotlib, Seaborn, Chart.js, OpenCV, Scikit-learn, TensorFlow, PyTorch, SciPy, Anaconda'
  },
  {
    slug: generateSlug('Security & Networking Fundamentals'),
    title: 'Security & Networking Fundamentals',
    description: 'VPN, Firewall, IPS/IDS, IPSec, TLS, HTTP/HTTPS, Cisco Tools, Tor Browser Security'
  },
  {
    slug: generateSlug('Testing & Quality Assurance'),
    title: 'Testing & Quality Assurance',
    description: 'Jest, Mocha, Selenium Basics, Manual Testing, Automation Frameworks'
  },
  {
    slug: generateSlug('UI/UX & Visual Design'),
    title: 'UI/UX & Visual Design',
    description: 'Figma, Adobe XD, Illustrator, Fonts, Canva, Creative Cloud, GIMP, Inkscape, SketchUp, Dribbble'
  },
  {
    slug: generateSlug('Office & Collaboration Tools'),
    title: 'Office & Collaboration Tools',
    description: 'Microsoft Excel, Word, PowerPoint, Jira, Trello, Notion, Git, GitHub, Gradle'
  }
];

// Get skill by slug
export function getSkillBySlug(slug) {
  return skills.find(s => s.slug === slug);
}

// Get all skill slugs for sitemap
export function getAllSkillSlugs() {
  return skills.map(s => s.slug);
}

