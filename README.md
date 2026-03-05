# Dev Portfolio

A modern, responsive personal portfolio website built with React, featuring dark/light theme support, smooth animations, and sections for skills, projects, achievements, badges, and contact.

**Live Demo:** [https://vipin2507.github.io/Vipin-Portfolio/](https://vipin2507.github.io/Vipin-Portfolio/)

---

## Features

- **Hero Section** — Introduction with name, role, and call-to-action
- **Skills Section** — Categorized skills (Frontend, Backend, Database, DevOps) with progress indicators
- **Projects Section** — Showcase of projects with images, tags, and links
- **Achievements Section** — Two subsections:
  - **Certificates & Achievements** — Scrollable carousel of certificates (Competition, Certification, Leadership, Community, Recognition)
  - **Coding Badges** — Platform-wise badges (LeetCode, HackerRank, HackerEarth, CodeChef, GeeksforGeeks) with filter tabs
- **About Section** — Journey timeline, stats, and passions
- **Contact Section** — Contact form with success modal and contact info
- **Footer** — Social links and credits
- **Dark / Light Theme** — Toggle with persistence in `localStorage`
- **Responsive Design** — Mobile-first layout with Tailwind CSS
- **Animations** — Framer Motion for scroll-triggered and hover animations
- **Smooth Navigation** — Fixed navbar with smooth scroll to sections

---

## Tech Stack

| Category   | Technologies |
|-----------|--------------|
| Framework | React 19 |
| Build     | Vite 7 |
| Styling   | Tailwind CSS 4 |
| Animations| Framer Motion |
| Icons     | Lucide React, React Icons |
| Linting   | ESLint |
| Deployment| GitHub Pages (gh-pages) |

---

## Project Structure

```
dev-portfolio/
├── public/
├── src/
│   ├── assets/           # Images, certificates, badges
│   │   ├── Badges/       # LeetCode, HackerRank, HackerEarth, CodeChef, GeeksforGeeks
│   │   ├── Certificates/ # PDF/image certificates
│   │   └── images/       # Project images, profile assets
│   ├── components/
│   │   ├── input/        # TextInput (contact form)
│   │   ├── sections/     # Hero, Skills, Projects, Achievement, About, Contact, Footer
│   │   ├── Navbar.jsx
│   │   └── ProjectCard.jsx
│   ├── context/
│   │   └── ThemeContext.jsx   # Dark/light theme state
│   ├── utils/
│   │   ├── data.js       # All portfolio content (skills, projects, badges, achievements, etc.)
│   │   └── helper.js     # Animation variants and utilities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vipin2507/Vipin-Portfolio.git
   cd Vipin-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in the terminal).

---

## Available Scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start Vite dev server with HMR |
| `npm run build`| Production build (output in `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run predeploy` | Runs `npm run build` (used before deploy) |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## Deployment (GitHub Pages)

The project is configured for GitHub Pages with base path `/Vipin-Portfolio` in `vite.config.js`.

1. Ensure the `homepage` in `package.json` matches your repo:
   ```json
   "homepage": "https://<username>.github.io/<repo-name>/"
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```
   This builds the app and pushes the `dist` folder to the `gh-pages` branch.

---

## Customization

All content is centralized in **`src/utils/data.js`**:

- **`SKILLS_CATEGORY`** — Skill categories and levels
- **`TECH_STACK`** — Technologies list
- **`STATS`** — Stats (e.g. projects, experience)
- **`BADGES`** — Coding platform badges (LeetCode, HackerRank, etc.); add imports and entries for new assets
- **`PROJECTS`** — Project list with image, description, tags, links
- **`JOURNEY_STEPS`** — About / journey timeline
- **`PASSIONS`** — Short passion/interest items
- **`SOCIAL_LINKS`** — GitHub, LinkedIn, Twitter, Email
- **`ACHIEVEMENTS`** — Certificates and achievements; add imports and entries for new PDFs/images
- **`CONTACT_INFO`** — Location, email, phone

To add new **badges** or **certificates**, place assets in `src/assets/Badges/` or `src/assets/Certificates/`, then add the import and corresponding object in `data.js`.

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES module support. For older browsers, consider adding appropriate Vite build targets or polyfills.

---

## License

This project is private. Use and modification are at the owner’s discretion.

---

## Author

**Vipin Tomar**  
- GitHub: [Vipin2507](https://github.com/Vipin2507)  
- LinkedIn: [vipintomar2507](https://www.linkedin.com/in/vipintomar2507/)  
- Portfolio: [Vipin Portfolio](https://vipin2507.github.io/Vipin-Portfolio/)
