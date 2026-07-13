import type { LucideIcon } from "lucide-react";
import {
  FileCheck2,
  FileText,
  Sparkles,
  Mail,
  Target,
  Linkedin,
  MessageSquare,
  DollarSign,
  Route as RouteIcon,
  Map,
} from "lucide-react";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  category: "Resume" | "Application" | "Career" | "Interview";
  seoTitle: string;
  seoDescription: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
}

export const TOOLS: Tool[] = [
  {
    slug: "ats-resume-checker",
    name: "ATS Resume Checker",
    tagline: "Beat the bots. Get past the filters.",
    description:
      "Upload your resume and get an instant ATS compatibility score, missing keywords, and specific fixes to make it past every filter.",
    icon: FileCheck2,
    category: "Resume",
    seoTitle: "Free ATS Resume Checker — Score Your Resume Instantly | CareerBoost AI",
    seoDescription:
      "Upload your resume and get an AI-powered ATS score, missing keywords, formatting issues, and recruiter-ready fixes in seconds.",
    bullets: [
      "ATS compatibility score (0–100)",
      "Missing keywords for your target role",
      "Weak bullet-point rewrites",
      "Formatting and parseability check",
      "Recruiter-friendliness rating",
    ],
    faqs: [
      { q: "What is an ATS?", a: "An Applicant Tracking System scans resumes before a human sees them. Over 90% of Fortune 500 companies use one." },
      { q: "Is the ATS Checker free?", a: "Yes — one free scan per day. Pro users get unlimited scans plus deeper reports." },
      { q: "Which file formats are supported?", a: "PDF and DOCX. We recommend PDF for maximum compatibility." },
    ],
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    tagline: "Build a job-winning resume in minutes.",
    description:
      "Enter your experience and get a polished, ATS-friendly resume with professional bullet points. Download PDF.",
    icon: FileText,
    category: "Resume",
    seoTitle: "AI Resume Builder — Create a Professional Resume Free | CareerBoost AI",
    seoDescription:
      "Build a modern, ATS-friendly resume in minutes with AI-generated bullet points and clean templates. Free to try. Download PDF.",
    bullets: ["Modern, ATS-friendly templates", "AI-generated achievement bullets", "PDF download", "Multiple sections and styles"],
    faqs: [
      { q: "Do I need a design skill?", a: "No — pick a template, enter your info, and the AI does the rest." },
      { q: "Can I edit later?", a: "Yes, edit and re-download any time from your dashboard." },
    ],
  },
  {
    slug: "resume-optimizer",
    name: "Resume Optimizer",
    tagline: "Rewrite weak bullets into measurable wins.",
    description:
      "Paste your resume. The AI rewrites your summary, bullet points, and skills to be measurable, powerful, and ATS-aligned.",
    icon: Sparkles,
    category: "Resume",
    seoTitle: "AI Resume Optimizer — Rewrite Your Resume with AI | CareerBoost AI",
    seoDescription:
      "Turn weak resume bullets into measurable achievements with AI. Optimize your summary and skills for every job.",
    bullets: ["Rewritten summary", "Achievement-focused bullets", "Keyword-optimized skills section", "Explanation for each change"],
    faqs: [
      { q: "Does it change my job history?", a: "No — it rewrites how your existing experience is described. It never invents new roles." },
    ],
  },
  {
    slug: "cover-letter-generator",
    name: "Cover Letter Generator",
    tagline: "A personalized cover letter in 30 seconds.",
    description:
      "Paste your resume and a job description — get a tailored, editable cover letter you can download and send.",
    icon: Mail,
    category: "Application",
    seoTitle: "Free AI Cover Letter Generator | CareerBoost AI",
    seoDescription:
      "Generate a personalized, editable cover letter from your resume and any job description in under a minute.",
    bullets: ["Personalized to the job", "Editable in-app", "Multiple tone options", "Download PDF"],
    faqs: [
      { q: "How personalized is it?", a: "The AI reads both your resume and the JD, then highlights your strongest matches with concrete examples." },
    ],
  },
  {
    slug: "job-match-analyzer",
    name: "Job Match Analyzer",
    tagline: "See how well you fit — before you apply.",
    description:
      "Paste a job description and your resume. Get a match percentage, missing skills, and exactly what to add.",
    icon: Target,
    category: "Application",
    seoTitle: "Job Match Analyzer — Score Your Fit Instantly | CareerBoost AI",
    seoDescription:
      "Compare your resume to any job description and get a match score, missing skills, and improvement suggestions.",
    bullets: ["Match percentage", "Missing skills and keywords", "Suggested improvements", "Verdict at a glance"],
    faqs: [
      { q: "What's a good match score?", a: "80%+ is strong. Under 60% means you may need to reframe or upskill before applying." },
    ],
  },
  {
    slug: "linkedin-analyzer",
    name: "LinkedIn Profile Analyzer",
    tagline: "Turn your profile into a recruiter magnet.",
    description:
      "Paste your LinkedIn profile text and get scores for headline, about, experience, plus rewritten versions and networking tips.",
    icon: Linkedin,
    category: "Career",
    seoTitle: "Free LinkedIn Profile Analyzer & Optimizer | CareerBoost AI",
    seoDescription:
      "Score your LinkedIn headline, about, and experience sections. Get AI-rewritten versions and recruiter-optimization tips.",
    bullets: ["Section-by-section scoring", "Rewritten headline and about", "Recruiter optimization tips", "Networking playbook"],
    faqs: [
      { q: "Do you connect to LinkedIn?", a: "No — just paste your profile text. Nothing is stored without your consent." },
    ],
  },
  {
    slug: "interview-coach",
    name: "Interview Coach",
    tagline: "Practice likely questions with strong answers.",
    description:
      "Upload your resume and paste a job description. Get behavioral, technical, and HR questions with sample answers.",
    icon: MessageSquare,
    category: "Interview",
    seoTitle: "AI Interview Coach — Practice Questions & Answers | CareerBoost AI",
    seoDescription:
      "Get personalized behavioral, technical, and HR interview questions with strong sample answers. Practice for any role.",
    bullets: ["Behavioral questions with STAR answers", "Technical questions for your role", "HR and culture-fit questions", "Curveballs to prepare for"],
    faqs: [
      { q: "Is there a mock interview mode?", a: "Yes — Pro users get a live back-and-forth practice mode." },
    ],
  },
  {
    slug: "salary-negotiation",
    name: "Salary Negotiation Assistant",
    tagline: "Know your worth. Negotiate with confidence.",
    description:
      "Enter your offer details. Get a fair salary range, negotiation tactics, and a ready-to-send counter-offer email.",
    icon: DollarSign,
    category: "Career",
    seoTitle: "AI Salary Negotiation Coach — Counter Offer Tool | CareerBoost AI",
    seoDescription:
      "Get a fair salary range, negotiation tactics, and a drafted counter-offer email. Free AI-powered negotiation coach.",
    bullets: ["Fair salary range for your role", "Negotiation tactics", "Counter-offer email draft", "Talking points"],
    faqs: [
      { q: "Do you use real market data?", a: "Ranges are AI-estimated based on your inputs. Always cross-check with sites like Levels.fyi and Glassdoor." },
    ],
  },
  {
    slug: "skill-gap-analyzer",
    name: "Skill Gap Analyzer",
    tagline: "Find what's missing. Fix it with a plan.",
    description:
      "Compare your resume with your target role. Get missing skills, recommended courses, and a learning roadmap.",
    icon: RouteIcon,
    category: "Career",
    seoTitle: "AI Skill Gap Analyzer — Find & Close Career Skill Gaps | CareerBoost AI",
    seoDescription:
      "Identify the skills you need for your dream role and get a personalized learning roadmap with courses and certifications.",
    bullets: ["Prioritized missing skills", "Recommended courses", "Certification suggestions", "Month-by-month roadmap"],
    faqs: [
      { q: "Where do course recommendations come from?", a: "The AI suggests popular platforms like Coursera, Udemy, and edX. Use them as a starting point." },
    ],
  },
  {
    slug: "career-roadmap",
    name: "Career Roadmap Generator",
    tagline: "From where you are to where you dream.",
    description:
      "Choose your current role and dream role. Get a step-by-step career roadmap with skills, projects, and timelines.",
    icon: Map,
    category: "Career",
    seoTitle: "AI Career Roadmap Generator — Plan Your Career Path | CareerBoost AI",
    seoDescription:
      "Generate a personalized multi-year career roadmap with skills, projects, milestones, and certifications.",
    bullets: ["Multi-phase career plan", "Skills to learn per phase", "Suggested projects", "Certifications and milestones"],
    faqs: [
      { q: "How long is a roadmap?", a: "Typically 2–5 years, broken into 3-month phases with clear goals." },
    ],
  },
];

export const TOOL_MAP: Record<string, Tool> = Object.fromEntries(TOOLS.map((t) => [t.slug, t]));
