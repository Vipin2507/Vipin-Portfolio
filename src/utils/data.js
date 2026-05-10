import{
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
}from "lucide-react";

import {FiGithub, FiLinkedin, FiTwitter} from "react-icons/fi";

import PROJECT_IMG_1 from "../assets/images/project-1.jpg";
import PROJECT_IMG_2 from "../assets/images/project-2.jpg";
import PROJECT_IMG_3 from "../assets/images/project-3.jpg";
import PROJECT_IMG_4 from "../assets/images/project-4.jpg";
import PROJECT_IMG_5 from "../assets/images/project-5.jpg";
import PROJECT_IMG_6 from "../assets/images/project-6.jpg";
import PROJECT_IMG_7 from "../assets/images/project-7.jpg";


export const SKILLS_CATEGORY = [    
    {
        title:"Frontend",
        icon: Code2,
        description: "Crafting beautiful, responsive user interfaces",
        skills: [
            {name: "React",level:95,color: "bg-blue-500"},
            {name: "TypeScript",level:90, color:"bg-blue-600"},
            {name: "Next.js", level:88, color:"bg-yellow-800"},
            {name: "Tailwind CSS",level:92, color:"bg-cyan-500"},
            {name: "Framer Motion",level:85, color:"bg-pink-500"},
        ],
    },
    {
        title:"Backend",
        icon:Server,
        description:"Building robust server-side solutions",
        skills:[
            {name: "Node.js",level:90,color:"bg-green-500"},
            {name: "Express.js",level:88,color:"bg-gray-700"},
            {name:"Python",level:85,color:"bg-yellow-500"},
            {name:"GraphQL",level:80,color:"bg-pink-600"},
            {name:"REST APIs",level:92,color:"bg-orange-500"},
        ],
    },
    {
        title:"Database",
        icon:Database,
        description:"Managing and optimizing data storage",
        skills:[
            {name:"MongoDB",level:88,color:"bg-green-600"},
            {name:"Mongodb",level:85,color:"bg-blue-700"},
            {name:"Redis",level:80,color:"bg-red-500"},
            {name:"Prisma",level:82,color:"bg-indigo-600"},
            {name: "Firebase",level:78,color:"bg-yellow-600"},
        ],
    },
    {
        title:"DevOps",
        icon: Cloud,
        description: "Deploying and scaling Applications",
        skills:[
            {name: "Docker",level:82,color:"bg-blue-600"},
            {name: "AWS",level:78,color:"bg-orange-600"},
            {name:"Vercel",level:90,color:"bg-indigo-900"},
            {name:"Git",level:95,color:"bg-orange-700"},
            {name:"CI/CD",level:75,color:"bg-purple-600"},
        ],
    },
];

export const TECH_STACK = [
    "JavaScript",
    "HTML",
    "CSS3",
    "Sass",
    "Webpack",
    "Vite",
    "Jest",
    "Cypress",
    "Figma",
    "Adobe XD",
    "Notion",
    "Slack",
];

export const STATS = [
    {number: "50+",label:"Projects Completed"},
    {number: "3+",label:"Years Experience"},
    {number: "20+",label:"Technologies"},
    {number:"100%",label:"Client Satisfaction"    }
];

export const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack platform with user authentication, product management, and integrated payment gateway.",
    image: PROJECT_IMG_1,
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "AI Chatbot Assistant",
    description:
      "An intelligent chatbot powered by NLP models to provide real-time responses and automate FAQs.",
    image: PROJECT_IMG_2,
    tags: ["Python", "Flask", "OpenAI API", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "AI / ML",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A modern and responsive personal portfolio showcasing projects, blogs, and achievements.",
    image: PROJECT_IMG_3,
    tags: ["React", "Tailwind", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    category: "Web App",
  },
  {
    id: 4,
    title: "Task Manager App",
    description:
      "A productivity web app to manage daily tasks with drag-and-drop features and reminders.",
    image: PROJECT_IMG_4,
    tags: ["Next.js", "Firebase", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    category: "Web App",
  },
  {
    id: 5,
    title: "Data Visualization Dashboard",
    description:
      "An interactive dashboard with charts and insights for business analytics and reporting.",
    image: PROJECT_IMG_5,
    tags: ["React", "D3.js", "Chart.js", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "Data Science",
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description:
      "A weather forecasting app that provides live weather updates using OpenWeather API.",
    image: PROJECT_IMG_6,
    tags: ["React", "API Integration", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    category: "Web App",
  },
];

export const JOURNEY_STEPS = [
  {
    year: "2021",
    title: "Started Coding Journey",
    company: "Self-taught",
    description:
      "Began learning programming with C++ and Python, solving beginner problems and building logic through small projects.",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    year: "2022",
    title: "Explored Web Development",
    company: "Self Projects",
    description:
      "Built my first responsive websites using HTML, CSS, and JavaScript. Later explored React and Tailwind CSS for modern UIs.",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    year: "2023",
    title: "College & Community Involvement",
    company: "SISTec & GDG",
    description:
      "Joined B.Tech (AI & Data Science). Became part of Google Developer Group and Kaggle Koders, organizing tech events and mentoring peers.",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    year: "2024",
    title: "Projects & Hackathons",
    company: "Self & Team",
    description:
      "Worked on AI Chatbot, Jarvis 2.0, and full-stack apps. Participated in hackathons like Adobe Hackathon and solved 400+ LeetCode problems.",
    icon: Rocket,
    color: "bg-orange-500",
  },
  {
    year: "2025",
    title: "Achievements & Internships",
    company: "Centilytics & Competitions",
    description:
      "Cleared Group Discussion and Interview rounds at Centilytics. Earned badges on CodeChef & LeetCode, proving consistency in problem-solving.",
    icon: Award,
    color: "bg-pink-500",
  },
  {
    year: "Future",
    title: "Aiming Higher",
    company: "Career Goals",
    description:
      "Focused on excelling as a backend developer while exploring AI integrations. Aspiring to contribute to impactful projects at global scale.",
    icon: Zap,
    color: "bg-cyan-500",
  },
];


export const PASSIONS =[
    {
        icon:Heart,
        title:"User Experience",
        description:"Crafting intuitive interfaces that users love",
    },
    {
        icon:Coffee,
        title:"Problem Solving",
        description: "Turning complex challenges into elegant solutions",
    },
    {
        icon:BookOpen,
        title:"Continuous Learning",
        description:"Always exploring new techniques and best practices",
    },
];

export const SOCIAL_LINKS = [
    {
        name:"GitHub",
        icon:FiGithub,
        url:"https://github.com/Vipin2507",
        color:"hover:text-gray-400",
        bgColor:"hover:bg-gray-800",
    },
    {
        name:"LinkedIn",
        icon:FiLinkedin,
        url:"https://www.linkedin.com/in/vipintomar2507/",
        color:"hover:text-blue-400",
        bgColor:"hover:bg-blue-500/10",
    },
    {
        name:"Twitter",
        icon:FiTwitter,
        url:"https://x.com/Vipintomar2507",
        color:"hover:text-sky-400",
        bgColor:"hover:bg-sky-500/10",
    },
    {
        name:"Email",
        icon:Mail,
        url:"mailto:vipintomar2507@gmail.com",
        color:"hover:text-green-400",
        bgColor:"hover:bg-green-500/10",
    },
];


export const CONTACT_INFO =[
    {
        icon:MapPin,
        label:"Location",
        value:"Sehore,M.P.",

    },
    {
        icon:Mail,
        label:"Email",
        value:"vipintomar2507@gmail.com",
    },
    {
        icon:Phone,
        label:"Phone",
        value:"+91 9238419902",
    },
];
