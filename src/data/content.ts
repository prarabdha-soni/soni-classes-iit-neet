export type SubjectId = "physics" | "chemistry" | "mathematics" | "biology";

export type ImportantTopic = {
  title: string;
  description: string;
};

export type Formula = {
  id: string;
  title: string;
  expression: string; // plain-text fallback
  latex?: string; // KaTeX source — preferred for rendering
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
          { id: "kin-1", latex: "v = u + at", title: "First equation of motion", expression: "v = u + at", description: "Final velocity from initial velocity, accel & time.", trick: "‘Vu-at’ — say it like a chant. No displacement involved." },
          { id: "kin-2", latex: "s = ut + \\tfrac{1}{2} a t^{2}", title: "Second equation of motion", expression: "s = ut + ½ a t²", trick: "Half-AT-square always tags along when displacement enters." },
          { id: "kin-3", latex: "v^{2} = u^{2} + 2as", title: "Third equation", expression: "v² = u² + 2as", description: "Time-free equation — use when t is missing.", trick: "No ‘t’? Use this. Square the velocities." },
          { id: "kin-4", latex: "S_{n} = u + \\tfrac{a}{2}(2n - 1)", title: "Distance in nth second", expression: "Sₙ = u + (a/2)(2n − 1)", trick: "‘2n − 1’ → odd-number pattern (1, 3, 5…) for free fall." },
          { id: "kin-5", latex: "v_{\\text{avg}} = \\dfrac{u+v}{2}", title: "Average velocity (uniform a)", expression: "v_avg = (u + v)/2", trick: "Only valid for constant acceleration." },
          { id: "kin-6", latex: "T = \\dfrac{2u\\sin\\theta}{g}", title: "Projectile — time of flight", expression: "T = 2u sinθ / g", trick: "Double the time to peak. Symmetry FTW." },
          { id: "kin-7", latex: "H = \\dfrac{u^{2}\\sin^{2}\\theta}{2g}", title: "Projectile — max height", expression: "H = u² sin²θ / 2g", trick: "Vertical KE all → PE at top." },
          { id: "kin-8", latex: "R = \\dfrac{u^{2}\\sin 2\\theta}{g}", title: "Projectile — range", expression: "R = u² sin2θ / g", trick: "Max range at θ = 45°. Complementary angles give same R." },
          { id: "kin-9", latex: "\\vec{v}_{AB} = \\vec{v}_{A} - \\vec{v}_{B}", title: "Relative velocity", expression: "v_AB = v_A − v_B", trick: "Subtract vectors — opposite signs add up." },
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
          { id: "lm-1", latex: "\\vec{F} = m\\vec{a}", title: "Newton’s 2nd Law", expression: "F = ma", trick: "Vector equation — direction of F = direction of a." },
          { id: "lm-2", latex: "f = \\mu_{k} N", title: "Friction (kinetic)", expression: "f = μₖ N", trick: "μ has no units — pure ratio." },
          { id: "lm-3", latex: "a = g\\sin\\theta", title: "Inclined plane (smooth)", expression: "a = g sin θ", trick: "θ = 0 → flat → no slide. θ = 90° → free fall." },
          { id: "lm-4", latex: "T = \\dfrac{2 m_{1} m_{2} g}{m_{1}+m_{2}}", title: "Tension (Atwood)", expression: "T = 2m₁m₂g / (m₁+m₂)", trick: "Symmetric in m₁, m₂ — swap them, T unchanged." },
          { id: "lm-5", latex: "a = \\dfrac{(m_{1}-m_{2})g}{m_{1}+m_{2}}", title: "Atwood acceleration", expression: "a = (m₁−m₂)g / (m₁+m₂)", trick: "Heavier mass wins direction." },
          { id: "lm-6", latex: "J = F\\,\\Delta t = \\Delta p", title: "Impulse", expression: "J = F·Δt = Δp", trick: "Area under F-t curve = change in momentum." },
          { id: "lm-7", latex: "\\tan\\theta = \\dfrac{v^{2}}{rg}", title: "Banking angle (no friction)", expression: "tan θ = v² / (rg)", trick: "Higher speed → steeper bank." },
          { id: "lm-8", latex: "a = g(\\sin\\theta - \\mu\\cos\\theta)", title: "Rough incline (sliding down)", expression: "a = g(sinθ − μcosθ)", trick: "If μ ≥ tanθ → block stays put." },
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
          { id: "we-1", latex: "W = F\\,s\\cos\\theta", title: "Work done", expression: "W = F·s cosθ", trick: "θ=90° → no work (centripetal force does zero work)." },
          { id: "we-2", latex: "KE = \\tfrac{1}{2} m v^{2}", title: "Kinetic energy", expression: "KE = ½ m v²", trick: "Double v → 4× KE. Quadratic!" },
          { id: "we-3", latex: "PE = mgh", title: "Potential energy (gravity)", expression: "PE = mgh", trick: "Reference level is your choice." },
          { id: "we-4", latex: "U = \\tfrac{1}{2} k x^{2}", title: "Spring PE", expression: "U = ½ k x²", trick: "Stored energy in stretch or compression — both positive." },
          { id: "we-5", latex: "P = \\dfrac{W}{t} = \\vec{F}\\cdot\\vec{v}", title: "Power", expression: "P = W/t = F·v", trick: "Instantaneous P uses dot product." },
          { id: "we-6", latex: "W_{\\text{net}} = \\Delta KE", title: "Work-energy theorem", expression: "W_net = ΔKE", trick: "Sum of all work = change in KE. Skip kinematics!" },
          { id: "we-7", latex: "v_{1}' = \\dfrac{(m_{1}-m_{2})u_{1} + 2 m_{2} u_{2}}{m_{1}+m_{2}}", title: "Elastic collision (1D)", expression: "v₁' = ((m₁−m₂)u₁ + 2m₂u₂)/(m₁+m₂)", trick: "Equal masses → velocities exchange." },
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
          { id: "rm-1", latex: "\\vec{\\tau} = \\vec{r}\\times\\vec{F} = I\\alpha", title: "Torque", expression: "τ = r × F = Iα", trick: "Rotational analog of F = ma." },
          { id: "rm-2", latex: "\\vec{L} = I\\vec{\\omega} = \\vec{r}\\times\\vec{p}", title: "Angular momentum", expression: "L = Iω = r × p", trick: "Conserved if τ_ext = 0." },
          { id: "rm-3", latex: "I = MR^{2}", title: "Moment of inertia (ring)", expression: "I = MR²", trick: "All mass at distance R." },
          { id: "rm-4", latex: "I = \\tfrac{2}{5} MR^{2}", title: "MoI — solid sphere", expression: "I = (2/5)MR²", trick: "Smallest among solid shapes — fastest down incline." },
          { id: "rm-5", latex: "I = \\tfrac{1}{2} MR^{2}", title: "MoI — solid cylinder", expression: "I = ½ MR²", trick: "Half of ring — mass distributed inward." },
          { id: "rm-6", latex: "v = R\\omega", title: "Rolling without slipping", expression: "v = Rω", trick: "Contact point momentarily at rest." },
          { id: "rm-7", latex: "KE_{\\text{rot}} = \\tfrac{1}{2} I \\omega^{2}", title: "Rotational KE", expression: "KE_rot = ½ I ω²", trick: "Total KE = ½mv² + ½Iω² for rolling." },
          { id: "rm-8", latex: "I = I_{cm} + Md^{2}", title: "Parallel axis theorem", expression: "I = I_cm + Md²", trick: "Shift axis by d → add Md²." },
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
          { id: "th-1", latex: "\\Delta U = Q - W", title: "First Law", expression: "ΔU = Q − W", trick: "Q in (+), W done by system (+). ‘Q minus W’." },
          { id: "th-2", latex: "\\eta = 1 - \\dfrac{T_{c}}{T_{h}}", title: "Efficiency (Carnot)", expression: "η = 1 − T_c/T_h", trick: "Always in Kelvin. η = 1 only if T_c = 0 K (impossible)." },
          { id: "th-3", latex: "C_{p} - C_{v} = R", title: "Cp − Cv (Mayer)", expression: "Cp − Cv = R", description: "Mayer’s relation for ideal gas." },
          { id: "th-4", latex: "PV^{\\gamma} = \\text{constant}", title: "Adiabatic process", expression: "PV^γ = constant", trick: "No heat exchange. γ = Cp/Cv." },
          { id: "th-5", latex: "W = nRT\\,\\ln\\!\\left(\\dfrac{V_{2}}{V_{1}}\\right)", title: "Isothermal work", expression: "W = nRT ln(V₂/V₁)", trick: "ΔU = 0 → Q = W." },
          { id: "th-6", latex: "U = \\dfrac{f}{2} nRT", title: "Internal energy (ideal)", expression: "U = (f/2) nRT", trick: "f = degrees of freedom (3 for monoatomic)." },
          { id: "th-7", latex: "\\beta = \\dfrac{T_{c}}{T_{h}-T_{c}}", title: "COP — refrigerator", expression: "β = T_c / (T_h − T_c)", trick: "Higher β → better fridge." },
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
          { id: "es-1", latex: "F = \\dfrac{k q_{1} q_{2}}{r^{2}}", title: "Coulomb's law", expression: "F = k q₁q₂ / r²", trick: "k = 9×10⁹ N·m²/C². Inverse square — like gravity." },
          { id: "es-2", latex: "E = \\dfrac{kq}{r^{2}}", title: "Electric field (point)", expression: "E = kq / r²", trick: "Direction: away from +q, toward −q." },
          { id: "es-3", latex: "V = \\dfrac{kq}{r}", title: "Potential (point)", expression: "V = kq / r", trick: "Scalar — just add algebraically." },
          { id: "es-4", latex: "C = \\dfrac{\\varepsilon_{0} A}{d}", title: "Capacitance (parallel plate)", expression: "C = ε₀A / d", trick: "Insert dielectric K → C becomes KC." },
          { id: "es-5", latex: "U = \\tfrac{1}{2} C V^{2} = \\dfrac{Q^{2}}{2C}", title: "Energy in capacitor", expression: "U = ½ CV² = Q²/2C", trick: "Three forms — pick what's given." },
          { id: "es-6", latex: "\\dfrac{1}{C} = \\dfrac{1}{C_{1}} + \\dfrac{1}{C_{2}}", title: "Capacitors in series", expression: "1/C = 1/C₁ + 1/C₂", trick: "Like resistors in parallel." },
          { id: "es-7", latex: "C = C_{1} + C_{2}", title: "Capacitors in parallel", expression: "C = C₁ + C₂", trick: "Like resistors in series." },
          { id: "es-8", latex: "p = q\\cdot 2a", title: "Dipole moment", expression: "p = q · 2a", trick: "Points from −q to +q." },
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
          { id: "ce-1", latex: "V = IR", title: "Ohm's law", expression: "V = IR", trick: "Linear for ohmic conductors only." },
          { id: "ce-2", latex: "R = \\dfrac{\\rho L}{A}", title: "Resistance", expression: "R = ρL/A", trick: "Stretch wire → L↑, A↓ → R increases as L²." },
          { id: "ce-3", latex: "P = VI = I^{2}R = \\dfrac{V^{2}}{R}", title: "Power dissipated", expression: "P = VI = I²R = V²/R", trick: "Three forms — use what's known." },
          { id: "ce-4", latex: "R = R_{1} + R_{2}", title: "Resistors in series", expression: "R = R₁ + R₂", trick: "Same current, voltages add." },
          { id: "ce-5", latex: "\\dfrac{1}{R} = \\dfrac{1}{R_{1}} + \\dfrac{1}{R_{2}}", title: "Resistors in parallel", expression: "1/R = 1/R₁ + 1/R₂", trick: "Same voltage, currents add." },
          { id: "ce-6", latex: "I = nAev_{d}", title: "Drift velocity", expression: "I = nAev_d", trick: "Tiny v_d (~10⁻⁴ m/s) — but huge n." },
          { id: "ce-7", latex: "\\dfrac{P}{Q} = \\dfrac{R}{S}", title: "Wheatstone balance", expression: "P/Q = R/S", trick: "No current through galvanometer at balance." },
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
          { id: "mp-1", latex: "E = h\\nu = \\dfrac{hc}{\\lambda}", title: "Photon energy", expression: "E = hν = hc/λ", trick: "h=6.63×10⁻³⁴ J·s. Higher freq → higher energy." },
          { id: "mp-2", latex: "\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}", title: "de Broglie wavelength", expression: "λ = h/p = h/mv", trick: "Heavy particles → tiny λ → no wave behavior." },
          { id: "mp-3", latex: "KE_{\\max} = h\\nu - \\varphi", title: "Photoelectric equation", expression: "KE_max = hν − φ", trick: "φ = work function. Below threshold ν → no emission." },
          { id: "mp-4", latex: "r_{1} = 0.529\\;\\text{\\AA}", title: "Bohr radius (n=1, H)", expression: "r₁ = 0.529 Å", trick: "rₙ = n² × r₁." },
          { id: "mp-5", latex: "E_{n} = -\\dfrac{13.6}{n^{2}}\\;\\text{eV}", title: "Bohr energy (H)", expression: "Eₙ = −13.6/n² eV", trick: "Negative → bound. n=1 ground state." },
          { id: "mp-6", latex: "E = mc^{2}", title: "Mass-energy equivalence", expression: "E = mc²", trick: "Tiny Δm → huge ΔE (c² is 9×10¹⁶)." },
          { id: "mp-7", latex: "N = N_{0}\\left(\\tfrac{1}{2}\\right)^{t/T}", title: "Half-life", expression: "N = N₀ (½)^(t/T)", trick: "T = 0.693/λ_decay." },
        ],
        quiz: [
          { q: "Bohr energy of H in n=2:", options: ["−13.6 eV", "−6.8 eV", "−3.4 eV", "−1.5 eV"], answer: 2 },
          { q: "de Broglie λ depends on:", options: ["Charge", "Momentum", "Spin", "Mass only"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    tagline: "Reactions, mole concept & periodic patterns — clean and quick",
    exam: "JEE + NEET",
    emoji: "🧪",
    importantTopics: [
      { title: "Mole Concept", description: "Stoichiometry, limiting reagent and gas laws — non-negotiable basics." },
      { title: "Chemical Bonding", description: "VSEPR, hybridisation, MO theory — high-yield conceptual scoring." },
      { title: "Thermodynamics", description: "ΔH, ΔS, ΔG and spontaneity — frequently asked numericals." },
      { title: "Equilibrium", description: "Kc, Kp, Le Chatelier and ionic equilibria appear every year." },
      { title: "Organic — GOC", description: "Inductive, mesomeric, hyperconjugation and stability ranking." },
      { title: "Coordination Compounds", description: "IUPAC naming, isomerism, CFT and magnetic moment." },
    ],
    chapters: [
      {
        slug: "mole-concept",
        title: "Mole Concept",
        emoji: "⚗️",
        formulas: [
          { id: "mc-1", latex: "n = \\dfrac{m}{M}", title: "Moles from mass", expression: "n = m / M", trick: "M = molar mass in g/mol." },
          { id: "mc-2", latex: "N = n \\cdot N_{A}", title: "Number of particles", expression: "N = n × Nₐ", trick: "Nₐ = 6.022 × 10²³." },
          { id: "mc-3", latex: "M = \\dfrac{w \\cdot 1000}{V_{mL}}", title: "Molarity", expression: "M = (w × 1000) / (M·V_mL)", trick: "Volume in mL, mass in g." },
        ],
        quiz: [
          { q: "Moles in 18 g of water:", options: ["0.5", "1", "2", "18"], answer: 1 },
        ],
      },
      {
        slug: "chemical-bonding",
        title: "Chemical Bonding",
        emoji: "🔗",
        formulas: [
          { id: "cb-1", latex: "\\text{B.O.} = \\dfrac{N_{b} - N_{a}}{2}", title: "Bond order (MOT)", expression: "B.O. = (Nb − Na)/2", trick: "Higher BO → shorter, stronger bond." },
          { id: "cb-2", latex: "\\mu = q \\cdot d", title: "Dipole moment", expression: "μ = q × d", trick: "1 Debye = 3.33 × 10⁻³⁰ C·m." },
        ],
        quiz: [
          { q: "Bond order of O₂:", options: ["1", "1.5", "2", "3"], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    tagline: "Tricks for calculus, algebra & coordinate geometry",
    exam: "JEE only",
    emoji: "📐",
    importantTopics: [
      { title: "Quadratic Equations", description: "Roots, discriminant, sum/product — base of higher algebra." },
      { title: "Sequences & Series", description: "AP, GP, HP and special series sums." },
      { title: "Trigonometry", description: "Identities, inverse trig and equations." },
      { title: "Coordinate Geometry", description: "Straight line, circle, conic sections." },
      { title: "Calculus", description: "Limits, derivatives, integration and applications." },
      { title: "Vectors & 3D", description: "Dot/cross product, plane, line equations." },
    ],
    chapters: [
      {
        slug: "quadratic-equations",
        title: "Quadratic Equations",
        emoji: "🧮",
        formulas: [
          { id: "qe-1", latex: "x = \\dfrac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}", title: "Quadratic formula", expression: "x = (−b ± √(b²−4ac))/2a", trick: "D = b²−4ac decides nature of roots." },
          { id: "qe-2", latex: "\\alpha + \\beta = -\\dfrac{b}{a},\\; \\alpha\\beta = \\dfrac{c}{a}", title: "Sum & product of roots", expression: "α+β = −b/a, αβ = c/a", trick: "Vieta's — instant equation building." },
        ],
        quiz: [
          { q: "Sum of roots of 2x²−5x+3:", options: ["5/2", "−5/2", "3/2", "−3/2"], answer: 0 },
        ],
      },
      {
        slug: "calculus",
        title: "Calculus",
        emoji: "∫",
        formulas: [
          { id: "cal-1", latex: "\\dfrac{d}{dx}(x^{n}) = n x^{n-1}", title: "Power rule", expression: "d/dx(xⁿ) = n xⁿ⁻¹", trick: "Bring power down, drop by 1." },
          { id: "cal-2", latex: "\\int x^{n}\\,dx = \\dfrac{x^{n+1}}{n+1} + C,\\; n\\ne -1", title: "Power integral", expression: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C", trick: "Add 1, divide by new power." },
        ],
        quiz: [
          { q: "d/dx(sin x) =", options: ["cos x", "−cos x", "−sin x", "tan x"], answer: 0 },
        ],
      },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    tagline: "Diagrams, definitions & one-liners for NEET",
    exam: "NEET only",
    emoji: "🧬",
    importantTopics: [
      { title: "Cell Biology", description: "Cell organelles, division and biomolecules." },
      { title: "Genetics", description: "Mendelian inheritance, linkage and molecular basis." },
      { title: "Human Physiology", description: "All systems — high weightage in NEET." },
      { title: "Plant Physiology", description: "Photosynthesis, respiration, transport." },
      { title: "Ecology", description: "Population, ecosystem and biodiversity." },
      { title: "Biotechnology", description: "Tools, applications and bioethics." },
    ],
    chapters: [
      {
        slug: "cell-biology",
        title: "Cell Biology",
        emoji: "🧫",
        formulas: [
          { id: "bio-1", title: "Cell theory", expression: "All living things are made of cells; cells are basic units of life; cells arise from pre-existing cells.", trick: "Schleiden, Schwann, Virchow — SSV." },
          { id: "bio-2", title: "Mitochondria", expression: "Powerhouse of the cell — site of aerobic respiration; double membrane; own DNA.", trick: "Cristae increase surface area for ATP synthesis." },
        ],
        quiz: [
          { q: "Powerhouse of the cell:", options: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"], answer: 2 },
        ],
      },
      {
        slug: "genetics",
        title: "Genetics",
        emoji: "🧬",
        formulas: [
          { id: "gen-1", title: "Mendel's laws", expression: "Law of dominance, segregation, independent assortment.", trick: "DSI — easy to recall." },
          { id: "gen-2", title: "DNA structure", expression: "Double helix, antiparallel, A-T (2H), G-C (3H bonds).", trick: "Chargaff: A=T, G=C." },
        ],
        quiz: [
          { q: "DNA base pairing G ≡ ?:", options: ["A", "T", "C", "U"], answer: 2 },
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
