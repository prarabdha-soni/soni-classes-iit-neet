export type SubjectId = "physics";

export type ImportantTopic = {
  title: string;
  description: string;
};

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
  importantTopics: ImportantTopic[];
  chapters: Chapter[];
};

export const SUBJECTS: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    tagline: "Mechanics to Modern — every formula at your thumb",
    exam: "JEE + NEET",
    emoji: "⚛️",
    importantTopics: [
      { title: "Kinematics", description: "Equations of motion, projectile motion, and relative velocity are asked constantly in basics and mixed problems." },
      { title: "Laws of Motion", description: "Free-body diagrams, friction, tension, and pulleys form the backbone of many scoring questions." },
      { title: "Work, Energy & Power", description: "A high-yield chapter for conservation laws, collision ideas, and shortcut solving." },
      { title: "Thermodynamics", description: "First law, heat engines, Carnot efficiency, and process-based numericals are exam favorites." },
      { title: "Electrostatics", description: "Field, potential, capacitance, and charge interactions appear regularly in conceptual and numerical forms." },
      { title: "Current Electricity", description: "Ohm’s law, power, series-parallel combinations, and Wheatstone bridge are must-revise topics." },
    ],
    chapters: [
      {
        slug: "kinematics",
        title: "Kinematics",
        emoji: "🏃",
        formulas: [
          { id: "kin-1", title: "First equation of motion", expression: "v = u + at", description: "Final velocity from initial velocity, accel & time.", trick: "‘Vu-at’ — say it like a chant. No displacement involved." },
          { id: "kin-2", title: "Second equation of motion", expression: "s = ut + ½ a t²", trick: "Half-AT-square always tags along when displacement enters." },
          { id: "kin-3", title: "Third equation", expression: "v² = u² + 2as", description: "Time-free equation — use when t is missing.", trick: "No ‘t’? Use this. Square the velocities." },
          { id: "kin-4", title: "Distance in nth second", expression: "Sₙ = u + (a/2)(2n − 1)", trick: "‘2n − 1’ → odd-number pattern (1, 3, 5…) for free fall." },
          { id: "kin-5", title: "Average velocity (uniform a)", expression: "v_avg = (u + v)/2", trick: "Only valid for constant acceleration." },
          { id: "kin-6", title: "Projectile — time of flight", expression: "T = 2u sinθ / g", trick: "Double the time to peak. Symmetry FTW." },
          { id: "kin-7", title: "Projectile — max height", expression: "H = u² sin²θ / 2g", trick: "Vertical KE all → PE at top." },
          { id: "kin-8", title: "Projectile — range", expression: "R = u² sin2θ / g", trick: "Max range at θ = 45°. Complementary angles give same R." },
          { id: "kin-9", title: "Relative velocity", expression: "v_AB = v_A − v_B", trick: "Subtract vectors — opposite signs add up." },
        ],
        quiz: [
          { q: "A body starts from rest with a = 2 m/s². Distance in 3rd second?", options: ["3 m", "5 m", "6 m", "9 m"], answer: 1, explain: "Sₙ = 0 + (2/2)(2·3−1) = 5 m" },
          { q: "Which equation is time-independent?", options: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "s = vt"], answer: 2 },
          { q: "Free-fall distance in successive seconds follows ratio:", options: ["1:2:3", "1:3:5", "2:4:6", "1:4:9"], answer: 1, explain: "Odd-number rule: 1, 3, 5, … (×g/2)." },
          { q: "Projectile range is maximum at angle:", options: ["30°", "45°", "60°", "90°"], answer: 1 },
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
          { id: "lm-5", title: "Atwood acceleration", expression: "a = (m₁−m₂)g / (m₁+m₂)", trick: "Heavier mass wins direction." },
          { id: "lm-6", title: "Impulse", expression: "J = F·Δt = Δp", trick: "Area under F-t curve = change in momentum." },
          { id: "lm-7", title: "Banking angle (no friction)", expression: "tan θ = v² / (rg)", trick: "Higher speed → steeper bank." },
          { id: "lm-8", title: "Rough incline (sliding down)", expression: "a = g(sinθ − μcosθ)", trick: "If μ ≥ tanθ → block stays put." },
        ],
        quiz: [
          { q: "Block on smooth incline 30°, find a:", options: ["g/4", "g/3", "g/2", "g"], answer: 2 },
          { q: "Coefficient of friction is:", options: ["Vector", "Scalar", "Tensor", "Has units N"], answer: 1 },
          { q: "Impulse equals change in:", options: ["Force", "Momentum", "Energy", "Velocity"], answer: 1 },
        ],
      },
      {
        slug: "work-energy-power",
        title: "Work, Energy & Power",
        emoji: "⚡",
        formulas: [
          { id: "we-1", title: "Work done", expression: "W = F·s cosθ", trick: "θ=90° → no work (centripetal force does zero work)." },
          { id: "we-2", title: "Kinetic energy", expression: "KE = ½ m v²", trick: "Double v → 4× KE. Quadratic!" },
          { id: "we-3", title: "Potential energy (gravity)", expression: "PE = mgh", trick: "Reference level is your choice." },
          { id: "we-4", title: "Spring PE", expression: "U = ½ k x²", trick: "Stored energy in stretch or compression — both positive." },
          { id: "we-5", title: "Power", expression: "P = W/t = F·v", trick: "Instantaneous P uses dot product." },
          { id: "we-6", title: "Work-energy theorem", expression: "W_net = ΔKE", trick: "Sum of all work = change in KE. Skip kinematics!" },
          { id: "we-7", title: "Elastic collision (1D)", expression: "v₁' = ((m₁−m₂)u₁ + 2m₂u₂)/(m₁+m₂)", trick: "Equal masses → velocities exchange." },
        ],
        quiz: [
          { q: "Doubling speed multiplies KE by:", options: ["2", "3", "4", "√2"], answer: 2 },
          { q: "Work done by centripetal force in circular motion:", options: ["+ve", "−ve", "Zero", "Depends"], answer: 2 },
        ],
      },
      {
        slug: "rotational-motion",
        title: "Rotational Motion",
        emoji: "🌀",
        formulas: [
          { id: "rm-1", title: "Torque", expression: "τ = r × F = Iα", trick: "Rotational analog of F = ma." },
          { id: "rm-2", title: "Angular momentum", expression: "L = Iω = r × p", trick: "Conserved if τ_ext = 0." },
          { id: "rm-3", title: "Moment of inertia (ring)", expression: "I = MR²", trick: "All mass at distance R." },
          { id: "rm-4", title: "MoI — solid sphere", expression: "I = (2/5)MR²", trick: "Smallest among solid shapes — fastest down incline." },
          { id: "rm-5", title: "MoI — solid cylinder", expression: "I = ½ MR²", trick: "Half of ring — mass distributed inward." },
          { id: "rm-6", title: "Rolling without slipping", expression: "v = Rω", trick: "Contact point momentarily at rest." },
          { id: "rm-7", title: "Rotational KE", expression: "KE_rot = ½ I ω²", trick: "Total KE = ½mv² + ½Iω² for rolling." },
          { id: "rm-8", title: "Parallel axis theorem", expression: "I = I_cm + Md²", trick: "Shift axis by d → add Md²." },
        ],
        quiz: [
          { q: "MoI of solid sphere about diameter:", options: ["MR²", "½MR²", "(2/5)MR²", "(2/3)MR²"], answer: 2 },
          { q: "Fastest object rolling down incline:", options: ["Ring", "Disc", "Solid sphere", "Hollow sphere"], answer: 2, explain: "Smallest I/MR² → least rotational KE share." },
        ],
      },
      {
        slug: "thermodynamics",
        title: "Thermodynamics",
        emoji: "🔥",
        formulas: [
          { id: "th-1", title: "First Law", expression: "ΔU = Q − W", trick: "Q in (+), W done by system (+). ‘Q minus W’." },
          { id: "th-2", title: "Efficiency (Carnot)", expression: "η = 1 − T_c/T_h", trick: "Always in Kelvin. η = 1 only if T_c = 0 K (impossible)." },
          { id: "th-3", title: "Cp − Cv (Mayer)", expression: "Cp − Cv = R", description: "Mayer’s relation for ideal gas." },
          { id: "th-4", title: "Adiabatic process", expression: "PV^γ = constant", trick: "No heat exchange. γ = Cp/Cv." },
          { id: "th-5", title: "Isothermal work", expression: "W = nRT ln(V₂/V₁)", trick: "ΔU = 0 → Q = W." },
          { id: "th-6", title: "Internal energy (ideal)", expression: "U = (f/2) nRT", trick: "f = degrees of freedom (3 for monoatomic)." },
          { id: "th-7", title: "COP — refrigerator", expression: "β = T_c / (T_h − T_c)", trick: "Higher β → better fridge." },
        ],
        quiz: [
          { q: "Carnot engine, T_h=400K, T_c=300K. η = ?", options: ["10%", "20%", "25%", "33%"], answer: 2 },
          { q: "For ideal gas, Cp − Cv equals:", options: ["0", "R", "2R", "γR"], answer: 1 },
          { q: "Adiabatic process: PV^? = const", options: ["1", "γ", "1/γ", "0"], answer: 1 },
        ],
      },
      {
        slug: "electrostatics",
        title: "Electrostatics",
        emoji: "⚡",
        formulas: [
          { id: "es-1", title: "Coulomb's law", expression: "F = k q₁q₂ / r²", trick: "k = 9×10⁹ N·m²/C². Inverse square — like gravity." },
          { id: "es-2", title: "Electric field (point)", expression: "E = kq / r²", trick: "Direction: away from +q, toward −q." },
          { id: "es-3", title: "Potential (point)", expression: "V = kq / r", trick: "Scalar — just add algebraically." },
          { id: "es-4", title: "Capacitance (parallel plate)", expression: "C = ε₀A / d", trick: "Insert dielectric K → C becomes KC." },
          { id: "es-5", title: "Energy in capacitor", expression: "U = ½ CV² = Q²/2C", trick: "Three forms — pick what's given." },
          { id: "es-6", title: "Capacitors in series", expression: "1/C = 1/C₁ + 1/C₂", trick: "Like resistors in parallel." },
          { id: "es-7", title: "Capacitors in parallel", expression: "C = C₁ + C₂", trick: "Like resistors in series." },
          { id: "es-8", title: "Dipole moment", expression: "p = q · 2a", trick: "Points from −q to +q." },
        ],
        quiz: [
          { q: "Coulomb's constant k value:", options: ["6.6×10⁻¹¹", "9×10⁹", "8.85×10⁻¹²", "1.6×10⁻¹⁹"], answer: 1 },
          { q: "Capacitors in series — net C:", options: ["Sum", "Reciprocal sum", "Larger value", "Product/Sum"], answer: 3 },
        ],
      },
      {
        slug: "current-electricity",
        title: "Current Electricity",
        emoji: "🔌",
        formulas: [
          { id: "ce-1", title: "Ohm's law", expression: "V = IR", trick: "Linear for ohmic conductors only." },
          { id: "ce-2", title: "Resistance", expression: "R = ρL/A", trick: "Stretch wire → L↑, A↓ → R increases as L²." },
          { id: "ce-3", title: "Power dissipated", expression: "P = VI = I²R = V²/R", trick: "Three forms — use what's known." },
          { id: "ce-4", title: "Resistors in series", expression: "R = R₁ + R₂", trick: "Same current, voltages add." },
          { id: "ce-5", title: "Resistors in parallel", expression: "1/R = 1/R₁ + 1/R₂", trick: "Same voltage, currents add." },
          { id: "ce-6", title: "Drift velocity", expression: "I = nAev_d", trick: "Tiny v_d (~10⁻⁴ m/s) — but huge n." },
          { id: "ce-7", title: "Wheatstone balance", expression: "P/Q = R/S", trick: "No current through galvanometer at balance." },
        ],
        quiz: [
          { q: "Stretch wire to 2L → new R:", options: ["R", "2R", "4R", "R/2"], answer: 2, explain: "L doubles, A halves → R becomes 4×." },
          { q: "Two 6Ω resistors in parallel:", options: ["12Ω", "6Ω", "3Ω", "2Ω"], answer: 2 },
        ],
      },
      {
        slug: "modern-physics",
        title: "Modern Physics",
        emoji: "☢️",
        formulas: [
          { id: "mp-1", title: "Photon energy", expression: "E = hν = hc/λ", trick: "h=6.63×10⁻³⁴ J·s. Higher freq → higher energy." },
          { id: "mp-2", title: "de Broglie wavelength", expression: "λ = h/p = h/mv", trick: "Heavy particles → tiny λ → no wave behavior." },
          { id: "mp-3", title: "Photoelectric equation", expression: "KE_max = hν − φ", trick: "φ = work function. Below threshold ν → no emission." },
          { id: "mp-4", title: "Bohr radius (n=1, H)", expression: "r₁ = 0.529 Å", trick: "rₙ = n² × r₁." },
          { id: "mp-5", title: "Bohr energy (H)", expression: "Eₙ = −13.6/n² eV", trick: "Negative → bound. n=1 ground state." },
          { id: "mp-6", title: "Mass-energy equivalence", expression: "E = mc²", trick: "Tiny Δm → huge ΔE (c² is 9×10¹⁶)." },
          { id: "mp-7", title: "Half-life", expression: "N = N₀ (½)^(t/T)", trick: "T = 0.693/λ_decay." },
        ],
        quiz: [
          { q: "Bohr energy of H in n=2:", options: ["−13.6 eV", "−6.8 eV", "−3.4 eV", "−1.5 eV"], answer: 2 },
          { q: "de Broglie λ depends on:", options: ["Charge", "Momentum", "Spin", "Mass only"], answer: 1 },
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
