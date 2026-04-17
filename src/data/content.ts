export type SubjectId = "physics" | "chemistry" | "maths" | "biology";

export type Formula = {
  id: string;
  title: string;
  expression: string; // plain-text formula (we render in mono)
  description?: string;
  trick?: string;
};

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number; // index
  explain?: string;
};

export type Chapter = {
  slug: string;
  title: string;
  emoji: string;
  formulas: Formula[];
  quiz: QuizQuestion[];
};

export type Subject = {
  id: SubjectId;
  name: string;
  tagline: string;
  exam: string;
  emoji: string;
  chapters: Chapter[];
};

export const SUBJECTS: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    tagline: "Mechanics to Modern — every formula at your thumb",
    exam: "JEE + NEET",
    emoji: "⚛️",
    chapters: [
      {
        slug: "kinematics",
        title: "Kinematics",
        emoji: "🏃",
        formulas: [
          {
            id: "kin-1",
            title: "First equation of motion",
            expression: "v = u + at",
            description: "Final velocity from initial velocity, accel & time.",
            trick: "‘Vu-at’ — say it like a chant. No displacement involved.",
          },
          {
            id: "kin-2",
            title: "Second equation of motion",
            expression: "s = ut + ½ a t²",
            trick: "Half-AT-square always tags along when displacement enters.",
          },
          {
            id: "kin-3",
            title: "Third equation",
            expression: "v² = u² + 2as",
            description: "Time-free equation — use when t is missing.",
            trick: "No ‘t’? Use this. Square the velocities.",
          },
          {
            id: "kin-4",
            title: "Distance in nth second",
            expression: "Sₙ = u + (a/2)(2n − 1)",
            trick: "‘2n − 1’ → odd-number pattern (1, 3, 5…) for free fall.",
          },
        ],
        quiz: [
          {
            q: "A body starts from rest with a = 2 m/s². Distance in 3rd second?",
            options: ["3 m", "5 m", "6 m", "9 m"],
            answer: 1,
            explain: "Sₙ = 0 + (2/2)(2·3−1) = 5 m",
          },
          {
            q: "Which equation is time-independent?",
            options: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "s = vt"],
            answer: 2,
          },
          {
            q: "Free-fall distance in successive seconds follows ratio:",
            options: ["1:2:3", "1:3:5", "2:4:6", "1:4:9"],
            answer: 1,
            explain: "Odd-number rule: 1, 3, 5, … (×g/2).",
          },
        ],
      },
      {
        slug: "laws-of-motion",
        title: "Laws of Motion",
        emoji: "🧲",
        formulas: [
          { id: "lm-1", title: "Newton’s 2nd Law", expression: "F = ma", trick: "Vector equation — direction of F = direction of a." },
          { id: "lm-2", title: "Friction (kinetic)", expression: "f = μₖ N", trick: "μ has no units — pure ratio." },
          { id: "lm-3", title: "Inclined plane (smooth)", expression: "a = g sin θ", trick: "θ = 0 → flat → no slide. θ = 90° → free fall." },
          { id: "lm-4", title: "Tension (Atwood)", expression: "T = 2m₁m₂g / (m₁+m₂)", trick: "Symmetric in m₁, m₂ — swap them, T unchanged." },
        ],
        quiz: [
          { q: "Block on smooth incline 30°, find a:", options: ["g/4", "g/3", "g/2", "g"], answer: 2 },
          { q: "Coefficient of friction is:", options: ["Vector", "Scalar", "Tensor", "Has units N"], answer: 1 },
        ],
      },
      {
        slug: "thermodynamics",
        title: "Thermodynamics",
        emoji: "🔥",
        formulas: [
          { id: "th-1", title: "First Law", expression: "ΔU = Q − W", trick: "Q in (+), W done by system (+). ‘Q minus W’." },
          { id: "th-2", title: "Efficiency (Carnot)", expression: "η = 1 − T_c/T_h", trick: "Always in Kelvin. η = 1 only if T_c = 0 K (impossible)." },
          { id: "th-3", title: "Cp − Cv", expression: "Cp − Cv = R", description: "Mayer’s relation for ideal gas." },
        ],
        quiz: [
          { q: "Carnot engine, T_h=400K, T_c=300K. η = ?", options: ["10%", "20%", "25%", "33%"], answer: 2 },
          { q: "For ideal gas, Cp − Cv equals:", options: ["0", "R", "2R", "γR"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    tagline: "Reactions, mole magic & periodic patterns",
    exam: "JEE + NEET",
    emoji: "⚗️",
    chapters: [
      {
        slug: "mole-concept",
        title: "Mole Concept",
        emoji: "🧪",
        formulas: [
          { id: "mc-1", title: "Number of moles", expression: "n = mass / molar mass", trick: "Mass in grams, M in g/mol — units cancel." },
          { id: "mc-2", title: "Molarity", expression: "M = moles of solute / V (L)", trick: "Volume in LITRES, not mL. Easy slip." },
          { id: "mc-3", title: "Molality", expression: "m = moles of solute / kg of solvent", trick: "Molality uses mass — unaffected by temperature." },
          { id: "mc-4", title: "Avogadro's number", expression: "Nₐ = 6.022 × 10²³", trick: "1 mole of anything = Nₐ entities." },
        ],
        quiz: [
          { q: "Moles in 18 g of water?", options: ["0.5", "1", "2", "18"], answer: 1, explain: "M(H₂O)=18 → n=18/18=1." },
          { q: "Molarity uses volume in:", options: ["mL", "Litres", "cm³", "kg"], answer: 1 },
        ],
      },
      {
        slug: "chemical-bonding",
        title: "Chemical Bonding",
        emoji: "🔗",
        formulas: [
          { id: "cb-1", title: "Bond order (MOT)", expression: "B.O. = (Nb − Na)/2", trick: "Higher B.O. → shorter, stronger bond." },
          { id: "cb-2", title: "Formal charge", expression: "FC = V − N − B/2", trick: "V=valence e⁻, N=non-bonding, B=bonding." },
          { id: "cb-3", title: "Dipole moment", expression: "μ = q × d", description: "Debye = 3.33 × 10⁻³⁰ C·m" },
        ],
        quiz: [
          { q: "Bond order of O₂ from MOT:", options: ["1", "1.5", "2", "3"], answer: 2 },
          { q: "Which has zero dipole moment?", options: ["H₂O", "NH₃", "CO₂", "HF"], answer: 2, explain: "CO₂ is linear — dipoles cancel." },
        ],
      },
      {
        slug: "organic-basics",
        title: "Organic — GOC",
        emoji: "🧬",
        formulas: [
          { id: "og-1", title: "Degree of unsaturation", expression: "DoU = (2C+2+N−H−X)/2", trick: "Each ring or π-bond = 1 DoU." },
          { id: "og-2", title: "Stability of carbocation", expression: "3° > 2° > 1° > CH₃⁺", trick: "Hyperconjugation + inductive effect." },
          { id: "og-3", title: "Acidic strength (-COOH)", expression: "EWG↑ → acidity↑", trick: "F-CH₂-COOH > Cl-CH₂-COOH (electronegativity)." },
        ],
        quiz: [
          { q: "Most stable carbocation:", options: ["CH₃⁺", "1°", "2°", "3°"], answer: 3 },
          { q: "DoU of C₆H₆ (benzene):", options: ["1", "2", "3", "4"], answer: 3, explain: "(2·6+2−6)/2 = 4" },
        ],
      },
    ],
  },
  {
    id: "maths",
    name: "Mathematics",
    tagline: "Shortcuts that make JEE problems fall apart",
    exam: "JEE only",
    emoji: "📐",
    chapters: [
      {
        slug: "quadratic",
        title: "Quadratic Equations",
        emoji: "📈",
        formulas: [
          { id: "q-1", title: "Roots", expression: "x = (−b ± √(b²−4ac)) / 2a", trick: "Discriminant D=b²−4ac decides nature of roots." },
          { id: "q-2", title: "Sum & product", expression: "α+β = −b/a,   αβ = c/a", trick: "Vieta — write coeffs, read sums instantly." },
          { id: "q-3", title: "Nature of roots", expression: "D>0 real distinct, D=0 equal, D<0 complex", trick: "Perfect square D → rational roots." },
        ],
        quiz: [
          { q: "Roots of x²−5x+6=0:", options: ["1,6", "2,3", "−2,−3", "1,5"], answer: 1 },
          { q: "If D<0, roots are:", options: ["Real equal", "Real distinct", "Complex conjugate", "Rational"], answer: 2 },
        ],
      },
      {
        slug: "trigonometry",
        title: "Trigonometry",
        emoji: "📐",
        formulas: [
          { id: "tr-1", title: "Pythagorean identity", expression: "sin²θ + cos²θ = 1", trick: "Divide by cos²θ → 1 + tan²θ = sec²θ." },
          { id: "tr-2", title: "Sum formula", expression: "sin(A+B) = sinA cosB + cosA sinB", trick: "‘Sin-Cos + Cos-Sin’ — outer terms first." },
          { id: "tr-3", title: "Double angle", expression: "cos2θ = 1 − 2sin²θ = 2cos²θ − 1", trick: "Choose form based on what's given." },
          { id: "tr-4", title: "Range of a sinθ + b cosθ", expression: "[−√(a²+b²),  √(a²+b²)]", trick: "Max when phase aligns. Common JEE trap." },
        ],
        quiz: [
          { q: "Max value of 3sinθ + 4cosθ:", options: ["3", "4", "5", "7"], answer: 2 },
          { q: "cos2θ in terms of sin:", options: ["1−sin²θ", "1−2sin²θ", "2sin²θ−1", "sin²θ"], answer: 1 },
        ],
      },
      {
        slug: "calculus",
        title: "Calculus — Derivatives",
        emoji: "∫",
        formulas: [
          { id: "ca-1", title: "Power rule", expression: "d/dx (xⁿ) = n xⁿ⁻¹", trick: "Bring down power, reduce by 1." },
          { id: "ca-2", title: "Product rule", expression: "(uv)' = u'v + uv'", trick: "‘Differentiate one, keep the other’ — twice." },
          { id: "ca-3", title: "Chain rule", expression: "dy/dx = dy/du · du/dx", trick: "Outer derivative × inner derivative." },
          { id: "ca-4", title: "L'Hôpital", expression: "lim f/g = lim f'/g'", trick: "Only for 0/0 or ∞/∞ forms." },
        ],
        quiz: [
          { q: "d/dx(sin x²) = ?", options: ["cos x²", "2x cos x²", "2x sin x²", "−cos x²"], answer: 1 },
          { q: "L'Hôpital applies to form:", options: ["1/0", "0/0", "0·∞ directly", "Any limit"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    tagline: "NCERT essentials, mnemonics & high-yield facts",
    exam: "NEET only",
    emoji: "🧬",
    chapters: [
      {
        slug: "cell-biology",
        title: "Cell — The Unit of Life",
        emoji: "🦠",
        formulas: [
          { id: "ce-1", title: "Cell theory", expression: "All living = cells; cells from pre-existing cells", trick: "Schleiden + Schwann (1838-39); Virchow added the third." },
          { id: "ce-2", title: "Prokaryote vs Eukaryote", expression: "No nucleus vs True nucleus", trick: "Prokaryote = 70S ribosome; Eukaryote = 80S (cyto)." },
          { id: "ce-3", title: "Mitochondria", expression: "Powerhouse — ATP via oxidative phosphorylation", trick: "Has own circular DNA + 70S ribosomes (endosymbiont!)." },
        ],
        quiz: [
          { q: "Eukaryotic cytoplasmic ribosome:", options: ["70S", "80S", "60S", "30S"], answer: 1 },
          { q: "Cell theory was proposed by:", options: ["Hooke & Brown", "Schleiden & Schwann", "Virchow alone", "Mendel"], answer: 1 },
        ],
      },
      {
        slug: "human-physiology",
        title: "Human Physiology",
        emoji: "🫀",
        formulas: [
          { id: "hp-1", title: "Cardiac output", expression: "CO = SV × HR", trick: "Stroke volume × heart rate. Avg ~5 L/min." },
          { id: "hp-2", title: "GFR", expression: "≈ 125 mL/min (180 L/day)", trick: "99% reabsorbed → ~1.5 L urine/day." },
          { id: "hp-3", title: "Hb O₂ capacity", expression: "1 g Hb binds 1.34 mL O₂", trick: "100 mL blood (15 g Hb) ≈ 20 mL O₂." },
        ],
        quiz: [
          { q: "Normal GFR (mL/min):", options: ["25", "75", "125", "250"], answer: 2 },
          { q: "Cardiac output formula:", options: ["SV+HR", "SV×HR", "HR/SV", "SV²"], answer: 1 },
        ],
      },
      {
        slug: "genetics",
        title: "Genetics & Evolution",
        emoji: "🧬",
        formulas: [
          { id: "ge-1", title: "Mendel's monohybrid", expression: "Phenotype 3:1, Genotype 1:2:1", trick: "Tt × Tt → TT, 2Tt, tt." },
          { id: "ge-2", title: "Dihybrid ratio", expression: "9:3:3:1", trick: "Two independent traits — 9 dominant-dominant." },
          { id: "ge-3", title: "Hardy-Weinberg", expression: "p² + 2pq + q² = 1", trick: "Allele freqs constant if no evolution." },
        ],
        quiz: [
          { q: "Dihybrid F2 phenotype ratio:", options: ["3:1", "1:2:1", "9:3:3:1", "1:1"], answer: 2 },
          { q: "Hardy-Weinberg equation:", options: ["p+q=1", "p²+q²=1", "p²+2pq+q²=1", "pq=1"], answer: 2 },
        ],
      },
    ],
  },
];

export const getSubject = (id: string) => SUBJECTS.find((s) => s.id === id);
export const getChapter = (subjectId: string, slug: string) =>
  getSubject(subjectId)?.chapters.find((c) => c.slug === slug);

export type SearchHit = {
  subject: Subject;
  chapter: Chapter;
  formula: Formula;
};

export const searchAll = (query: string): SearchHit[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const subject of SUBJECTS) {
    for (const chapter of subject.chapters) {
      for (const formula of chapter.formulas) {
        const hay = `${formula.title} ${formula.expression} ${formula.description ?? ""} ${formula.trick ?? ""} ${chapter.title}`.toLowerCase();
        if (hay.includes(q)) hits.push({ subject, chapter, formula });
      }
    }
  }
  return hits.slice(0, 30);
};
