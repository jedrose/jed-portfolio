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

export const DEEP_PROJECTS = [
  {
    id: "pneumonia",
    title: "Robust Deep Learning for Pneumonia Detection",
    subtitle: "MIT Inspirit AI Program · 2023",
    coverColor: "#0ea5e9",
    coverImage: "/notebook-imgs/s3_cell29_img28.png",
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
      { src: "/notebook-imgs/s3_cell29_img28.png", caption: "Field data X-ray (rotated, lower-contrast rendering) — the distribution shift the baseline failed on" },
      { src: "/notebook-imgs/s2_cell37_img0.png", caption: "Baseline CNN training curve: training overfits while validation plateaus around 75% — the model memorizing clean-image features it cannot generalize" },
      { src: "/notebook-imgs/accuracy-comparison.svg", caption: "Field accuracy comparison (5-run avg.): rotation + rendering-shift augmented CNN recovers from 74.7% to 98.8% — a +24.1 pp lift with no new labeled data" },
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

export const CONTACT_LINKS = [
  { label:"EMAIL",    href:"mailto:jedrose@umich.edu",                display:"jedrose@umich.edu",          icon:"✉" },
  { label:"LINKEDIN", href:"https://www.linkedin.com/in/jedroseman/", display:"linkedin.com/in/jedroseman", icon:"in" },
  { label:"GITHUB",   href:"https://github.com/jedrose",             display:"github.com/jedrose",         icon:"{}" },
  { label:"PHONE",    href:"tel:4044011077",                         display:"404.401.1077",               icon:"☏" },
];