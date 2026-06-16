export const PF = "'Press Start 2P', monospace";
export const SANS = "'Inter','Helvetica Neue',sans-serif";

export const ROOM_W = 960;
export const ROOM_H = 600;
export const SPEED  = 180;

export const CABINETS = [
  { id:"about",    label:"ABOUT",    color:"#2563eb", screen:"#dbeafe", icon:"👤", marquee:"ABOUT.EXE" },
  { id:"projects", label:"PROJECTS", color:"#7c3aed", screen:"#ede9fe", icon:"⟨/⟩", marquee:"PROJECTS.EXE" },
  { id:"resume",   label:"RESUME",   color:"#059669", screen:"#d1fae5", icon:"📄", marquee:"RESUME.EXE" },
  { id:"contact",  label:"CONTACT",  color:"#ea580c", screen:"#ffedd5", icon:"✉",  marquee:"CONTACT.EXE" },
];

export const CAB_POSITIONS = [
  { id:"about",    cx: ROOM_W*0.14 },
  { id:"projects", cx: ROOM_W*0.38 },
  { id:"resume",   cx: ROOM_W*0.62 },
  { id:"contact",  cx: ROOM_W*0.86 },
];

export const CAB_CY = ROOM_H * 0.42;

export const PROJECTS_DATA = [
  { cat:"DEFENSE TECH", color:"#2563eb", items:[
    { title:"Michigan Defense Technology", year:"2025–Now", tags:["Defense","Leadership","DARPA"],
      desc:"Co-founded U-M's first defense tech org. 100+ applicants, 18% acceptance. Secured exclusive events with Anduril and Palantir. Hosted Gen. H.R. McMaster on campus. Directing 3 DARPA-aligned software projects." },
  ]},
  { cat:"CONSULTING & VENTURE", color:"#7c3aed", items:[
    { title:"Ascend Consulting Group", year:"2024–Now", tags:["Consulting","VC","Strategy"],
      desc:"VP of Consulting, founding member. 10+ paid clients including YC-backed startups, Pro Football Focus, and Capitol AI. Founded VC scout team." },
    { title:"First Financial Bank USA", year:"Summer 2026", tags:["Product","Fintech","PM"],
      desc:"Led 7-person team through 13-week sprint. Full-stack IRA deposit MVP targeting $50M in retail deposits. Cleared all 3 executive gate reviews." },
  ]},
  { cat:"ENGINEERING", color:"#059669", items:[
    { title:"Midtown EV Rally", year:"2022–2024", tags:["Hardware","EV","Electrical"],
      desc:"Co-founded Atlanta's first collegiate EV club. Raised $25K from Mercedes-Benz and Rivian. Engineered complete brushless DC drivetrain wiring. Competed nationally." },
    { title:"MIT Inspirit AI", year:"2023", tags:["AI","ML","Python"],
      desc:"Trained a CNN to classify pneumonia from chest X-ray images." },
  ]},
];

export const RESUME_PDF_URL =
  "https://drive.google.com/uc?export=download&id=1tXiM_2PJLgHh0EB_ydwqBMF7IYnbViMy";

export const HOBBIES = ["Vinyls","Backpacking","Basketball","Golf","Video Production","App Dev"];

export const CONTACT_LINKS = [
  { label:"EMAIL",    href:"mailto:jedrose@umich.edu",                display:"jedrose@umich.edu",          icon:"✉" },
  { label:"LINKEDIN", href:"https://www.linkedin.com/in/jedroseman/", display:"linkedin.com/in/jedroseman", icon:"in" },
  { label:"GITHUB",   href:"https://github.com/jedrose",             display:"github.com/jedrose",         icon:"{}" },
  { label:"PHONE",    href:"tel:4044011077",                         display:"404.401.1077",               icon:"☏" },
];