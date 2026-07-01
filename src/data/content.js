export const PF = "'Press Start 2P', monospace";
export const SANS = "'Space Grotesk', 'Helvetica Neue', sans-serif";

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
    { title:"Michigan Defense Technology", year:"2025-Now", tags:["Defense","Leadership","DARPA"],
      desc:"Co-founded U-M's first defense tech org. 100+ applicants, 18% acceptance. Secured exclusive events with Anduril and Palantir. Hosted Gen. H.R. McMaster on campus. Directing 3 DARPA-aligned software projects." },
  ]},
  { cat:"CONSULTING & VENTURE", color:"#7c3aed", items:[
    { title:"Ascend Consulting Group", year:"2024-Now", tags:["Consulting","VC","Strategy"],
      desc:"VP of Consulting, founding member. 10+ paid clients including YC-backed startups, Pro Football Focus, and Capitol AI. Founded VC scout team." },
    { title:"First Financial Bank USA", year:"Summer 2026", tags:["Product","Fintech","PM"],
      desc:"Led 7-person team through 13-week sprint. Full-stack IRA deposit MVP targeting $50M in retail deposits. Cleared all 3 executive gate reviews." },
  ]},
  { cat:"ENGINEERING", color:"#059669", items:[
    { title:"Midtown EV Rally", year:"2022-2024", tags:["Hardware","EV","Electrical"],
      desc:"Co-founded Atlanta's first collegiate EV club. Raised $25K from Mercedes-Benz and Rivian. Engineered complete brushless DC drivetrain wiring. Competed nationally." },
    { title:"MIT Inspirit AI", year:"2023", tags:["AI","ML","Python"],
      desc:"Trained a CNN to classify pneumonia from chest X-ray images." },
  ]},
];

export const DEEP_PROJECTS = [
  {
    id: "capitol-ai",
    title: "Capitol AI: Product Strategy, UX Research & AI Workflows",
    subtitle: "Ascend Consulting Group · 3 Engagements · 2024-25",
    coverColor: "#2563eb",
    coverImage: "/capitol-ai-imgs/ACG x Capitol AI.png",
    category: "CONSULTING / PM",
    tags: ["Product Management", "UX Research", "AI Workflows", "Frontend Dev", "Figma"],
    blurb: "3 consecutive engagements with a YC-backed AI startup. Progressed from Co-PM to Head PM to Strategic Lead, running 100+ user interviews, building a live frontend demo, and owning platform strategy for Capitol AI's Workflow Composer.",
    context: "Capitol AI is a YC-backed startup building an enterprise AI workflow composer that lets teams generate slide decks, automate tasks, and build multi-agent pipelines on live data. Engaged through Ascend Consulting Group across three consecutive projects, serving as the main client POC throughout. Progressed from Co-PM on use case research to Head PM on onboarding UX to Strategic Lead on platform differentiation and MCP integration.",
    techStack: ["HTML", "CSS", "JavaScript", "Canvas API", "Figma"],
    clientQuote: null,
    impact: [
      "Built and shipped a live frontend demo (Stockflow Tracker) as a proof-of-concept for Capitol AI's Workflow Composer — fully functional onboarding flow and AI-powered investment dashboard",
      "100+ user interviews across the Training Academy onboarding: surfaced module-by-module friction points and delivered structured UX reports that directly shaped platform improvements",
      "Investigated and scoped MCP tool integration to connect Capitol AI with external platforms. Competitive analysis against n8n, CrewAI, Langdock, and Lindy with a full differentiation strategy",
    ],
    images: [
      { src: "/capitol-ai-imgs/recap_image10.png", contain: true },   // 0 - login screen
      { src: "/capitol-ai-imgs/recap_image5.png", contain: true },    // 1 - dashboard
      { src: "/capitol-ai-imgs/recap_image7.png", contain: true },    // 2 - onboarding preferences
      { src: "/capitol-ai-imgs/recap_image6.png", contain: true },    // 3 - connect accounts
      { src: "/capitol-ai-imgs/recap_image8.png", contain: true },    // 4 - Cappy chatbot
      { src: "/capitol-ai-imgs/recap_image12.png", contain: true },   // 5 - Stockflow AI workflow
      { src: "/capitol-ai-imgs/deliverable_image11.png", contain: true }, // 6 - Capitol AI platform
      { src: "/capitol-ai-imgs/deliverable_image19.png", contain: true }, // 7 - workflow nodes (EY)
      { src: "/capitol-ai-imgs/deliverable_image24.png", contain: true }, // 8 - LinkedIn workflow
      { src: "/capitol-ai-imgs/deliverable_image25.png", contain: true }, // 9 - MCP/resume workflow
    ],
    githubUrl: "https://github.com/Kanishkkandoi52/Stockflow_Tracker",
    liveDemo: {
      src: "/stockflow/index.html",
      title: "Stockflow Tracker — Live Demo",
      label: "STOCKFLOW TRACKER — DEMO (simulated data)",
    },
    sections: [
      {
        heading: "The Client and the Problem",
        body: "Capitol AI is a YC-backed startup building an enterprise AI workflow composer: a platform that lets teams build on live data, chain multi-agent reasoning, and generate layout-first outputs like slide decks, spreadsheets, and reports. The platform was technically impressive, but getting new users to that first moment of value was genuinely hard. The onboarding was steep, the use cases weren't obvious, and the product didn't yet have a clear identity in a crowded market of tools like n8n, CrewAI, and Langdock. My role across three engagements was to close those gaps.",
      },
      {
        heading: "Engagement 1: Use Cases, Workflows & Stockflow Tracker",
        body: "The first engagement started with a question: what should Capitol AI actually be used for? We brainstormed and scoped 8+ use cases: a LinkedIn networking tool, a healthcare assistant, a casing prep tool, an exam simulator, and more. For each, we built wireframes and mockups. Then we went further. I co-led the design and development of Stockflow Tracker with my Co-PM as a proof-of-concept demo to show Capitol AI exactly what their Workflow Composer platform could power. I owned the overall UI design, onboarding flow architecture, and Cappy chatbot integration. My Co-PM and I split the build, collaborated on the dashboard logic and data layer, and shipped a working frontend. Stock data and AI responses are simulated for demo purposes. We also built the Capitol AI workflows behind it: a stock research agent, a contact reminder tool, and a LinkedIn job finder. Try the demo below.",
        liveDemo: true,
      },
      {
        heading: "Cappy: Designing the Capitol AI Chatbot",
        body: "One of the most distinct things we built was Cappy, the Capitol AI chatbot. I designed Cappy as a character — a friendly blue robot persona that would give the platform a human face and make the onboarding feel less like reading documentation and more like getting help from someone who knew the product. Cappy was integrated into the Stockflow Tracker as the primary interface for market questions and portfolio guidance. The idea was simple: if a user doesn't know where to start, give them something they can just talk to.",
        images: [4],
      },
      {
        heading: "Engagement 2: Onboarding UX & Training Academy",
        body: "For the second engagement I moved into Head PM. Capitol AI had built a Training Academy to walk new users through the platform, and we ran 100+ user interviews to evaluate it module by module. The findings were detailed and structural: users felt overwhelmed by the volume of content, the audio felt robotic, the interactive and video portions were redundant, and expert vs. beginner users needed completely different paths. We delivered module-by-module UX reports, bug documentation, a full user manual, and a document of use case ideas to help the team prioritize. The central recommendation: segment users upfront so the experience matched their skill level from the first screen.",
        images: [6, 5],
      },
      {
        heading: "Engagement 3: AI Workflows & Differentiation Strategy",
        body: "As Strategic Lead on the third engagement, the work got more technical. We built complex AI workflows directly on the Capitol AI platform: a LinkedIn job finder, a resume improver with live web search, a connection outreach reminder tool, and a casing prep agent. We also investigated MCP tool integration, scoping how Capitol AI could let users connect to external platforms with a single connection. On the strategy side, we ran a competitive analysis against n8n, CrewAI, Langdock, and Lindy. Every competitor was converging on the same raw capability. The differentiator had to be ease of entry for non-technical users, and we built the recommendations around that.",
        images: [7, 8],
      },
      {
        heading: "What I Took Away",
        body: "Capitol AI was the project that made it click for me: technically impressive does not mean immediately usable. The Workflow Composer could do things most enterprise tools couldn't. But none of that mattered if someone felt lost in the first five minutes. Every engagement came back to the same question: how do you make something powerful feel approachable? You don't simplify the product. You simplify the first experience. That's what the Stockflow demo was showing, what Cappy was solving for, what the Training Academy research was fixing, and what the differentiation strategy was protecting.",
      },
    ],
  },
  {
    id: "pff",
    title: "Pro Football Focus: Product Strategy & UX Research",
    subtitle: "Ascend Consulting Group · 3 Engagements · 2025-26",
    coverColor: "#2563eb",
    coverImage: "/pff-imgs/ACG X PFF Card Cover.png",
    category: "CONSULTING / PM",
    tags: ["Product Management", "UX Research", "GTM Strategy", "Sports Analytics", "Figma"],
    blurb: "3 consecutive engagements with a $160M NFL analytics partner. Progressed from analyst to Head PM, running 100+ user interviews, owning GTM strategy, and driving 3x DAU and 3x retention on the Player Prop Tool launch.",
    context: "Pro Football Focus (PFF) is trusted by all 32 NFL teams and 100 NCAA teams. Engaged through Ascend Consulting Group across three consecutive projects. Served as Head PM and sole client POC for the second and third engagements, managing around 10 analysts per project and owning all deliverables. Primary contacts included Marty Styles (VP of Product), Raj Kapoor (Principal Product Manager, Betting & Consumer), and Channing Johnson (Senior Product Manager).",
    techStack: [],
    clientQuote: {
      text: "Listen guys, we've never been able to iterate a product so quickly with this level of detail and confidence. My board is really really happy with what we came up with together which means everyone is happy. I can't thank you all enough.",
      author: "Marty Styles",
      role: "VP of Product, Pro Football Focus",
    },
    impact: [
      "3x DAU and 3x Retention post-launch: 100+ Gen Z user interviews surfaced the exact friction points blocking adoption and shaped every UX decision in the Player Prop Tool",
      "Promoted from analyst to Head PM in one engagement cycle: earned sole client POC status for Projects 2 and 3 based on the quality of engagement 1 deliverables",
      "3 consecutive engagements at a $160M company: PFF re-engaged Ascend for each project, expanding scope every time from UXR to full GTM strategy to a ground-up product rebuild",
    ],
    images: [
      { src: "/pff-imgs/pff-player-props.png", contain: true },
      { src: "/pff-imgs/player prop.png", contain: true },
      { src: "/pff-imgs/pff-metrics.svg", fullWidth: true },
      { src: "/pff-imgs/Draft Tool PFF.png", contain: true },
    ],
    sections: [
      {
        heading: "The Client and the Problem",
        body: "PFF is the most data-rich football analytics platform in the industry, trusted by every NFL team. That depth was also their biggest challenge with a new product: the Player Prop Tool was built for experts, but a fast-growing share of their audience were casual bettors who didn't know what \"PFF grade\" meant. Three things needed fixing. The data density was overwhelming for newcomers, the value prop wasn't landing in a crowded sports betting market, and mobile-web engagement was high but the experience wasn't built for it. My first engagement was as an analyst: running user interviews and focus groups to name these friction points and turn them into a structured UXR report.",
        images: [0, 1],
      },
      {
        heading: "Shaping PFF's Player Prop Tool",
        body: "For the second engagement I was promoted to Head PM and became the main point of contact with Marty Styles, Raj Kapoor, and Channing Johnson on PFF's product team. The user interviews kept surfacing the same wall: terms like \"edge,\" \"cover probability,\" and even \"PFF grade\" were consistently confusing to newcomers who made up a growing share of PFF's audience. That research shaped everything. Slide decks, Figma customer journey flows, and new engagement concepts all came back to making the data feel human without losing what made PFF valuable to experienced users. Marty's exact words after launch: \"If we did not do this work the right way, I feel like that would have lost the day for us.\"",
        images: [2],
      },
      {
        heading: "Fantasy Football Product Revamp",
        body: "For the third engagement, PFF tasked us with overhauling their fantasy product. After a thorough audit, we made the strategic call to scrap the existing product entirely and build a live fantasy draft assistant from scratch. The research process was rigorous: user interviews and survey collection surfaced concrete bugs and pain points, while running our own internal fantasy league gave us firsthand experience with the gaps in the product. Sitting in a live draft and using PFF's analyzer to make picks was genuinely a lot of fun, and it made the flaws obvious in a way no survey could. We also conducted a CBA analysis weighing multiple potential price points to determine where PFF could position the product competitively without leaving money on the table. The central design question across all of it: where is the line between a casual fantasy player who needs guidance and a competitive player who wants every data point PFF offers?",
        images: [3],
      },
      {
        heading: "What I Took Away",
        body: "Honestly, one of the coolest moments of this whole project was pulling up the Player Prop Tool after launch and seeing our research actually in the product. Features we'd debated in team calls, UX decisions shaped by interviews I ran, it was all right there. That feeling made everything click for me in a way that no deliverable really could. The big thing I learned: you can have the best data in the world, but if your user doesn't understand it, it doesn't matter. PFF had unreal analytics. The challenge in both products was making them feel accessible without losing the depth that experts rely on. Serving beginners and power users at the same time isn't a compromise, it's a product decision. The data doesn't change. The presentation does. That's the balance.",
      },
    ],
  },
  {
    id: "pneumonia",
    title: "Robust Deep Learning for Pneumonia Detection",
    subtitle: "MIT Inspirit AI Program · 2023",
    coverColor: "#0ea5e9",
    coverImage: "/notebook-imgs/s3_cell22_img12.png",
    coverPosition: "center 65%",
    category: "ML / AI",
    tags: ["TensorFlow", "Keras", "CNN", "Python", "imgaug"],
    blurb: "Solved out-of-distribution generalization in a clinical CNN, lifting field accuracy from 74.7% to 98.8% by engineering rotation and rendering-shift augmentation into the training pipeline. No new labeled data required.",
    context: "Built during the MIT Inspirit AI Program, a 10-week research intensive mentored by MIT graduate students. Collaborated with a global team of 6 students to design, train, and harden a clinical-grade CNN for pneumonia classification from chest X-ray images.",
    techStack: ["TensorFlow", "Keras", "NumPy", "Scikit-Learn", "imgaug", "Matplotlib", "Seaborn"],
    impact: [
      "+24.1 pp generalization lift: augmented CNN recovered from 74.7% to 98.8% avg. field accuracy",
      "6x augmented training corpus: combine_data pipeline stacked original + 4 rotation variants + 1 rendering-shift variant, growing training data 6x without new labeled data",
      "5-run statistical benchmark: eliminated stochastic initialization noise; reported avg. replaces any single lucky run",
    ],
    images: [
      { src: "/notebook-imgs/s3_cell22_img12.png", caption: "Clean training X-ray (upright, color-normalized)" },
      { src: "/notebook-imgs/s3_cell29_img28.png", caption: "Field data X-ray (rotated, lower-contrast rendering) - the distribution shift the baseline failed on" },
      { src: "/notebook-imgs/s2_cell37_img0.png", caption: "Baseline CNN training curve: training overfits while validation plateaus around 75% - the model memorizing clean-image features it cannot generalize" },
      { src: "/notebook-imgs/accuracy-comparison.svg", caption: "Field accuracy comparison (5-run avg.): rotation + rendering-shift augmented CNN recovers from 74.7% to 98.8%, a +24.1 pp lift with no new labeled data" },
    ],
    sections: [
      {
        heading: "The Problem: Domain Drift",
        body: "The baseline CNN achieved ~74.7% accuracy on field data: X-rays from a different hospital's machine with lower contrast rendering and randomized orientation artifacts. Trained only on clean, high-contrast, upright images, the model learned rendering-specific features that failed to generalize.",
        images: [0, 1],
      },
      {
        heading: "Data Engineering and Pipeline Strategy",
        body: "Rather than acquiring new labeled field data, I built custom rotate, grayscale, and combine_data functions using Keras and imgaug to address both sources of domain drift. Four targeted spatial transforms tackled orientation variance; a rendering-shift variant synthesized lower-contrast images matching the field data's visual distribution. All six versions were concatenated into a single corpus, growing training data 6x without any new labels.",
        code: `# Build rotation- and grayscale-augmented invariant dataset
train_data_rotated_neg20 = rotate(train_data, rotate=-20)
train_data_rotated_10    = rotate(train_data, rotate=10)
train_data_rotated_25    = rotate(train_data, rotate=25)
train_data_rotated_30    = rotate(train_data, rotate=30)
train_data_gray          = grayscale(train_data)

all_data, all_labels = combine_data(
    [train_data,
     train_data_rotated_neg20,
     train_data_rotated_10,
     train_data_rotated_25,
     train_data_rotated_30,
     train_data_gray],
    [train_labels, train_labels,
     train_labels, train_labels,
     train_labels, train_labels]
)`,
      },
      {
        heading: "Validation Framework and Benchmarking",
        body: "Because Keras re-randomizes weight initialization on every CNNClassifier() call, a single run's accuracy is unreliable. Variance across runs was 8–12 percentage points. A strict 5-run loop was required to compute a statistically stable mean field accuracy.",
        code: `average_accuracy = 0.0

for i in range(5):
    cnn = CNNClassifier(num_hidden_layers=5)
    cnn.fit(all_data, all_labels,
            epochs=5,
            validation_data=(test_data, test_labels),
            shuffle=True,
            callbacks=[monitor])

    field_pred   = (cnn.predict(field_data) > 0.5)
    run_accuracy = accuracy_score(field_labels, field_pred)
    print(f"Run {i+1}: {run_accuracy:.4f}")
    average_accuracy += run_accuracy / 5.0

print(f"\\nAvg. Field Accuracy: {average_accuracy:.4f}")`,
        images: [2, 3],
      },
    ],
  },
];

export const RESUME_PDF_URL =
  "https://drive.google.com/uc?export=download&id=1tXiM_2PJLgHh0EB_ydwqBMF7IYnbViMy";

export const HOBBIES = ["Vinyls","Backpacking","Basketball","Golf","Video Production","App Dev"];

export const TOP_FILMS = [
  {
    title: "Reservoir Dogs", year: 1992, rating: 4, director: "Tarantino",
    poster: "https://media.themoviedb.org/t/p/w500/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg",
  },
  {
    title: "City of God", year: 2002, rating: 5, director: "Meirelles",
    poster: "https://media.themoviedb.org/t/p/w500/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
  },
  {
    title: "The Prestige", year: 2006, rating: 4.5, director: "Nolan",
    poster: "https://media.themoviedb.org/t/p/w500/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg",
  },
  {
    title: "Memento", year: 2000, rating: 5, director: "Nolan",
    poster: "https://media.themoviedb.org/t/p/w500/fKTPH2WvH8nHTXeBYBVhawtRqtR.jpg",
  },
  {
    title: "Mulholland Drive", year: 2001, rating: 4.5, director: "Lynch",
    poster: "https://media.themoviedb.org/t/p/w500/x7A59t6ySylr1L7aubOQEA480vM.jpg",
  },
];

export const TOP_ARTISTS = [
  {
    name: "Kanye West", genre: "Hip-Hop / Rap",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg",
    gradient: "linear-gradient(135deg, #1a0533 0%, #4a1060 100%)",
  },
  {
    name: "The Smiths", genre: "Indie / Post-Punk",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/The_Smiths_%281984_Sire_publicity_photo%29_002.jpg",
    gradient: "linear-gradient(135deg, #0f2010 0%, #2d5a1b 100%)",
  },
  {
    name: "Chris Stussy", genre: "Deep House / Techno",
    image: "https://lastfm.freetls.fastly.net/i/u/avatar170s/2ad819f6e8c89bb53cdfaaed5943473e",
    gradient: "linear-gradient(135deg, #001233 0%, #023e8a 100%)",
  },
  {
    name: "Nine Vicious", genre: "Experimental Rap",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Nine_Vicious_July_11th_2025_%28cropped%29.jpg/250px-Nine_Vicious_July_11th_2025_%28cropped%29.jpg",
    gradient: "linear-gradient(135deg, #1a0010 0%, #6b0020 100%)",
  },
  {
    name: "Pz'", genre: "Experimental Rap",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Pz%27_performance_2026_%C3%98Way.png/250px-Pz%27_performance_2026_%C3%98Way.png",
    gradient: "linear-gradient(135deg, #001a1a 0%, #005f5f 100%)",
  },
];

export const CONTACT_LINKS = [
  { label:"EMAIL",    href:"mailto:jedrose@umich.edu",                display:"jedrose@umich.edu",          icon:"✉" },
  { label:"LINKEDIN", href:"https://www.linkedin.com/in/jedroseman/", display:"linkedin.com/in/jedroseman", icon:"in" },
  { label:"GITHUB",   href:"https://github.com/jedrose",             display:"github.com/jedrose",         icon:"{}" },
  { label:"PHONE",    href:"tel:4044011077",                         display:"404.401.1077",               icon:"☏" },
];