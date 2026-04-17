export type SubjectId = "physics" | "chemistry" | "maths" | "biology";

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
  {
    id: "chemistry",
    name: "Chemistry",
    tagline: "Reactions, mole magic & periodic patterns",
    exam: "JEE + NEET",
    emoji: "⚗️",
    importantTopics: [
      { title: "Mole Concept", description: "One of the most important scoring chapters for conversions, concentration terms, and stoichiometry." },
      { title: "Atomic Structure", description: "Bohr model, quantum basics, de Broglie, and shell calculations are repeatedly tested." },
      { title: "Chemical Bonding", description: "Shapes, hybridization, formal charge, and bond order are core concepts for the entire subject." },
      { title: "Equilibrium", description: "Chemical equilibrium, pH, buffers, and solubility product are high-frequency problem areas." },
      { title: "Organic GOC", description: "Resonance, inductive effect, intermediates, and acidity-basicity control many later organic chapters." },
      { title: "Electrochemistry", description: "Nernst equation, EMF, Faraday laws, and conductivity trends are highly important for numericals." },
    ],
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
          { id: "mc-5", title: "Mole fraction", expression: "xᵢ = nᵢ / n_total", trick: "Sum of all mole fractions = 1." },
          { id: "mc-6", title: "% by mass", expression: "% = (mass solute / mass solution) × 100", trick: "Mass/mass — temperature independent." },
          { id: "mc-7", title: "Normality", expression: "N = M × n-factor", trick: "n-factor: H⁺ for acid, OH⁻ for base, e⁻ for redox." },
          { id: "mc-8", title: "Dilution", expression: "M₁V₁ = M₂V₂", trick: "Moles conserved on dilution." },
        ],
        quiz: [
          { q: "Moles in 18 g of water?", options: ["0.5", "1", "2", "18"], answer: 1, explain: "M(H₂O)=18 → n=18/18=1." },
          { q: "Molarity uses volume in:", options: ["mL", "Litres", "cm³", "kg"], answer: 1 },
          { q: "Sum of all mole fractions:", options: ["0", "0.5", "1", "100"], answer: 2 },
        ],
      },
      {
        slug: "atomic-structure",
        title: "Atomic Structure",
        emoji: "⚛️",
        formulas: [
          { id: "as-1", title: "Rydberg formula", expression: "1/λ = R(1/n₁² − 1/n₂²)", trick: "R = 1.097×10⁷ m⁻¹. n₂ > n₁." },
          { id: "as-2", title: "Bohr radius", expression: "rₙ = 0.529 × n²/Z  Å", trick: "Larger Z → tighter orbit." },
          { id: "as-3", title: "Bohr energy", expression: "Eₙ = −13.6 Z²/n² eV", trick: "He⁺ (Z=2) ground = −54.4 eV." },
          { id: "as-4", title: "de Broglie", expression: "λ = h/mv", trick: "Wave-particle duality." },
          { id: "as-5", title: "Heisenberg uncertainty", expression: "Δx · Δp ≥ h/4π", trick: "Position-momentum tradeoff." },
          { id: "as-6", title: "Number of orbitals (shell)", expression: "n²", trick: "n=3 → 9 orbitals (1s+3p+5d)." },
          { id: "as-7", title: "Max electrons (shell)", expression: "2n²", trick: "n=4 → 32 electrons max." },
        ],
        quiz: [
          { q: "Max electrons in M shell (n=3):", options: ["8", "9", "18", "32"], answer: 2 },
          { q: "Energy of H atom in n=2:", options: ["−13.6", "−6.8", "−3.4", "−1.5"], answer: 2 },
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
          { id: "cb-4", title: "% ionic character", expression: "(μ_obs / μ_ionic) × 100", trick: "Pauling scale for electronegativity diff." },
          { id: "cb-5", title: "VSEPR shapes", expression: "2→linear, 3→trigonal, 4→tetrahedral", trick: "Lone pairs > bond pairs in repulsion." },
          { id: "cb-6", title: "Hybridization", expression: "H = ½(V + M − C + A)", trick: "sp(2), sp²(3), sp³(4), sp³d(5), sp³d²(6)." },
        ],
        quiz: [
          { q: "Bond order of O₂ from MOT:", options: ["1", "1.5", "2", "3"], answer: 2 },
          { q: "Which has zero dipole moment?", options: ["H₂O", "NH₃", "CO₂", "HF"], answer: 2, explain: "CO₂ is linear — dipoles cancel." },
          { q: "Hybridization of carbon in CH₄:", options: ["sp", "sp²", "sp³", "sp³d"], answer: 2 },
        ],
      },
      {
        slug: "thermochemistry",
        title: "Thermodynamics & Thermochem",
        emoji: "🔥",
        formulas: [
          { id: "tc-1", title: "Enthalpy change", expression: "ΔH = ΔU + ΔnₘRT", trick: "Δnₘ = mol gas products − reactants." },
          { id: "tc-2", title: "Gibbs free energy", expression: "ΔG = ΔH − TΔS", trick: "ΔG<0 → spontaneous." },
          { id: "tc-3", title: "Entropy", expression: "ΔS = q_rev / T", trick: "Disorder always increases (universe)." },
          { id: "tc-4", title: "Hess's law", expression: "ΔH_net = Σ ΔH_steps", trick: "Path independent — state function." },
          { id: "tc-5", title: "ΔG° and K", expression: "ΔG° = −RT ln K", trick: "K>1 → ΔG°<0 → forward favored." },
        ],
        quiz: [
          { q: "Spontaneous reaction has ΔG:", options: [">0", "<0", "=0", "Any"], answer: 1 },
          { q: "Hess's law is based on:", options: ["1st law", "2nd law", "0th law", "3rd law"], answer: 0 },
        ],
      },
      {
        slug: "equilibrium",
        title: "Equilibrium",
        emoji: "⚖️",
        formulas: [
          { id: "eq-1", title: "Kc expression", expression: "Kc = [products]^c / [reactants]^a", trick: "Pure solids/liquids excluded." },
          { id: "eq-2", title: "Kp & Kc", expression: "Kp = Kc(RT)^Δn", trick: "Δn = mol gas (products − reactants)." },
          { id: "eq-3", title: "pH", expression: "pH = −log[H⁺]", trick: "pH + pOH = 14 (at 25°C)." },
          { id: "eq-4", title: "Ka & pKa", expression: "pKa = −log Ka", trick: "Lower pKa → stronger acid." },
          { id: "eq-5", title: "Henderson equation", expression: "pH = pKa + log([A⁻]/[HA])", trick: "Buffer pH calc — equal conc → pH = pKa." },
          { id: "eq-6", title: "Ksp", expression: "Ksp = [A⁺]ᵐ[B⁻]ⁿ", trick: "Higher Ksp → more soluble." },
        ],
        quiz: [
          { q: "pH of 0.01 M HCl:", options: ["1", "2", "12", "14"], answer: 1 },
          { q: "Buffer at pH = pKa when:", options: ["[A⁻]=0", "[HA]=0", "[A⁻]=[HA]", "Any"], answer: 2 },
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
          { id: "og-4", title: "Stability of free radical", expression: "3° > 2° > 1° > CH₃•", trick: "Same trend as carbocation." },
          { id: "og-5", title: "Stability of carbanion", expression: "CH₃⁻ > 1° > 2° > 3°", trick: "Reverse of carbocation!" },
          { id: "og-6", title: "Resonance vs hyperconjugation", expression: "Res > Hyperconj > Inductive", trick: "Order of e⁻-effect strength." },
          { id: "og-7", title: "Markovnikov rule", expression: "H to C with more H", trick: "Stable carbocation forms first." },
        ],
        quiz: [
          { q: "Most stable carbocation:", options: ["CH₃⁺", "1°", "2°", "3°"], answer: 3 },
          { q: "DoU of C₆H₆ (benzene):", options: ["1", "2", "3", "4"], answer: 3, explain: "(2·6+2−6)/2 = 4" },
          { q: "Most stable carbanion:", options: ["3°", "2°", "1°", "CH₃⁻"], answer: 3 },
        ],
      },
      {
        slug: "electrochemistry",
        title: "Electrochemistry",
        emoji: "🔋",
        formulas: [
          { id: "ec-1", title: "Nernst equation", expression: "E = E° − (0.059/n) log Q", trick: "At 25°C. n = electrons transferred." },
          { id: "ec-2", title: "ΔG and EMF", expression: "ΔG° = −nFE°", trick: "F = 96500 C/mol. Positive E° → spontaneous." },
          { id: "ec-3", title: "Faraday's 1st law", expression: "m = ZIt", trick: "Z = electrochemical equivalent." },
          { id: "ec-4", title: "Conductivity", expression: "κ = 1/ρ = G·(l/A)", trick: "κ measured in S/m." },
          { id: "ec-5", title: "Molar conductivity", expression: "Λₘ = κ × 1000 / M", trick: "Increases on dilution (Kohlrausch)." },
        ],
        quiz: [
          { q: "Faraday constant ≈:", options: ["6×10²³", "9.6×10⁴", "8.314", "1.6×10⁻¹⁹"], answer: 1 },
          { q: "Spontaneous cell has E°:", options: ["<0", ">0", "=0", "Any"], answer: 1 },
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
    importantTopics: [
      { title: "Quadratic Equations", description: "Roots, discriminant, and Vieta-based relations are direct and repeatedly used in advanced algebra." },
      { title: "Sequences & Series", description: "AP, GP, and sigma formulas are common in direct questions and multi-step algebra problems." },
      { title: "Trigonometry", description: "Identities, transformations, and range-based questions make this chapter a constant revision target." },
      { title: "Calculus", description: "Derivatives, chain rule, and standard limits are among the highest-value topics in JEE maths." },
      { title: "Integration", description: "Standard integrals, by-parts, and definite integral properties are central to problem solving." },
      { title: "Vectors & 3D Geometry", description: "Dot product, cross product, lines, and planes often give manageable scoring questions." },
    ],
    chapters: [
      {
        slug: "quadratic",
        title: "Quadratic Equations",
        emoji: "📈",
        formulas: [
          { id: "q-1", title: "Roots", expression: "x = (−b ± √(b²−4ac)) / 2a", trick: "Discriminant D=b²−4ac decides nature of roots." },
          { id: "q-2", title: "Sum & product", expression: "α+β = −b/a,   αβ = c/a", trick: "Vieta — write coeffs, read sums instantly." },
          { id: "q-3", title: "Nature of roots", expression: "D>0 real distinct, D=0 equal, D<0 complex", trick: "Perfect square D → rational roots." },
          { id: "q-4", title: "Common root condition", expression: "(c₁a₂−c₂a₁)² = (a₁b₂−a₂b₁)(b₁c₂−b₂c₁)", trick: "Eliminate x between two quadratics." },
          { id: "q-5", title: "Range of quadratic", expression: "Min/Max at x = −b/2a", trick: "a>0 → min, a<0 → max." },
        ],
        quiz: [
          { q: "Roots of x²−5x+6=0:", options: ["1,6", "2,3", "−2,−3", "1,5"], answer: 1 },
          { q: "If D<0, roots are:", options: ["Real equal", "Real distinct", "Complex conjugate", "Rational"], answer: 2 },
        ],
      },
      {
        slug: "sequences-series",
        title: "Sequences & Series",
        emoji: "🔢",
        formulas: [
          { id: "ss-1", title: "AP nth term", expression: "aₙ = a + (n−1)d", trick: "Linear in n." },
          { id: "ss-2", title: "AP sum", expression: "Sₙ = n/2 · [2a + (n−1)d]", trick: "Or Sₙ = n(a+l)/2." },
          { id: "ss-3", title: "GP nth term", expression: "aₙ = a·r^(n−1)", trick: "Exponential growth/decay." },
          { id: "ss-4", title: "GP sum (finite)", expression: "Sₙ = a(1−rⁿ)/(1−r)", trick: "r ≠ 1." },
          { id: "ss-5", title: "GP sum (infinite)", expression: "S = a/(1−r),  |r|<1", trick: "Diverges if |r| ≥ 1." },
          { id: "ss-6", title: "AM ≥ GM ≥ HM", expression: "(a+b)/2 ≥ √(ab) ≥ 2ab/(a+b)", trick: "Equality only when a=b." },
          { id: "ss-7", title: "Sum of first n naturals", expression: "Σn = n(n+1)/2", trick: "Famous Gauss formula." },
          { id: "ss-8", title: "Sum of squares", expression: "Σn² = n(n+1)(2n+1)/6", trick: "Useful in series problems." },
        ],
        quiz: [
          { q: "Sum of first 100 natural numbers:", options: ["5050", "5000", "10100", "1000"], answer: 0 },
          { q: "Infinite GP a=1, r=½ sum:", options: ["1", "1.5", "2", "∞"], answer: 2 },
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
          { id: "tr-5", title: "tan(A+B)", expression: "(tanA + tanB)/(1 − tanA tanB)", trick: "Denominator = 0 → A+B = 90°." },
          { id: "tr-6", title: "sin to product", expression: "sinC + sinD = 2 sin((C+D)/2) cos((C−D)/2)", trick: "Half-sum, half-difference." },
          { id: "tr-7", title: "Sine rule", expression: "a/sinA = b/sinB = c/sinC = 2R", trick: "R = circumradius." },
          { id: "tr-8", title: "Cosine rule", expression: "c² = a² + b² − 2ab cosC", trick: "Generalised Pythagoras." },
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
          { id: "ca-3", title: "Quotient rule", expression: "(u/v)' = (u'v − uv')/v²", trick: "‘Lo D-Hi minus Hi D-Lo, over Lo squared’." },
          { id: "ca-4", title: "Chain rule", expression: "dy/dx = dy/du · du/dx", trick: "Outer derivative × inner derivative." },
          { id: "ca-5", title: "L'Hôpital", expression: "lim f/g = lim f'/g'", trick: "Only for 0/0 or ∞/∞ forms." },
          { id: "ca-6", title: "d/dx sin x", expression: "cos x", trick: "Cycle: sin→cos→−sin→−cos→sin." },
          { id: "ca-7", title: "d/dx eˣ", expression: "eˣ", trick: "The only function unchanged by differentiation." },
          { id: "ca-8", title: "d/dx ln x", expression: "1/x", trick: "Domain x > 0." },
        ],
        quiz: [
          { q: "d/dx(sin x²) = ?", options: ["cos x²", "2x cos x²", "2x sin x²", "−cos x²"], answer: 1 },
          { q: "L'Hôpital applies to form:", options: ["1/0", "0/0", "0·∞ directly", "Any limit"], answer: 1 },
        ],
      },
      {
        slug: "integration",
        title: "Integration",
        emoji: "∮",
        formulas: [
          { id: "in-1", title: "Power rule (∫)", expression: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n≠−1", trick: "Reverse of differentiation." },
          { id: "in-2", title: "∫1/x dx", expression: "ln|x| + C", trick: "n=−1 case — separate formula." },
          { id: "in-3", title: "∫eˣ dx", expression: "eˣ + C", trick: "Self-replicating function." },
          { id: "in-4", title: "∫sin x dx", expression: "−cos x + C", trick: "Mind the sign!" },
          { id: "in-5", title: "By parts", expression: "∫u dv = uv − ∫v du", trick: "ILATE: Inverse, Log, Algebra, Trig, Exp — pick u in this order." },
          { id: "in-6", title: "Definite integral", expression: "∫ₐᵇ f(x)dx = F(b) − F(a)", trick: "Fundamental theorem." },
          { id: "in-7", title: "King's property", expression: "∫₀ᵃ f(x)dx = ∫₀ᵃ f(a−x)dx", trick: "Symmetry shortcut." },
        ],
        quiz: [
          { q: "∫sin x dx =", options: ["cos x + C", "−cos x + C", "sin x + C", "−sin x + C"], answer: 1 },
          { q: "ILATE in by-parts: ‘L’ stands for:", options: ["Linear", "Log", "Limit", "Linear+Log"], answer: 1 },
        ],
      },
      {
        slug: "vectors-3d",
        title: "Vectors & 3D Geometry",
        emoji: "📏",
        formulas: [
          { id: "v-1", title: "Magnitude", expression: "|a| = √(x² + y² + z²)", trick: "3D Pythagoras." },
          { id: "v-2", title: "Dot product", expression: "a·b = |a||b|cosθ", trick: "Scalar — perpendicular if zero." },
          { id: "v-3", title: "Cross product", expression: "|a×b| = |a||b|sinθ", trick: "Vector — perpendicular to both." },
          { id: "v-4", title: "Angle between vectors", expression: "cosθ = (a·b)/(|a||b|)", trick: "Use components directly." },
          { id: "v-5", title: "Line in 3D", expression: "(x−x₀)/a = (y−y₀)/b = (z−z₀)/c", trick: "Direction ratios in denominator." },
          { id: "v-6", title: "Plane equation", expression: "ax + by + cz = d", trick: "(a,b,c) is normal vector." },
          { id: "v-7", title: "Distance: point to plane", expression: "d = |ax₀+by₀+cz₀−d|/√(a²+b²+c²)", trick: "Plug & divide by |normal|." },
        ],
        quiz: [
          { q: "Two vectors are perpendicular when:", options: ["a·b=|a||b|", "a·b=0", "a×b=0", "|a|=|b|"], answer: 1 },
          { q: "Cross product gives a:", options: ["Scalar", "Vector", "Matrix", "Number"], answer: 1 },
        ],
      },
      {
        slug: "probability",
        title: "Probability",
        emoji: "🎲",
        formulas: [
          { id: "pr-1", title: "Basic probability", expression: "P(E) = favorable/total", trick: "0 ≤ P(E) ≤ 1." },
          { id: "pr-2", title: "Addition rule", expression: "P(A∪B) = P(A) + P(B) − P(A∩B)", trick: "Mutually excl → subtract zero." },
          { id: "pr-3", title: "Conditional", expression: "P(A|B) = P(A∩B)/P(B)", trick: "Reduces sample space to B." },
          { id: "pr-4", title: "Bayes' theorem", expression: "P(A|B) = P(B|A)·P(A)/P(B)", trick: "Reverse the conditional." },
          { id: "pr-5", title: "Independent events", expression: "P(A∩B) = P(A)·P(B)", trick: "No influence on each other." },
          { id: "pr-6", title: "Binomial distribution", expression: "P(X=r) = ⁿCᵣ pʳ q^(n−r)", trick: "p+q = 1. Mean = np." },
        ],
        quiz: [
          { q: "P(getting head in fair coin):", options: ["0", "0.25", "0.5", "1"], answer: 2 },
          { q: "Bayes' theorem reverses:", options: ["Sum", "Product", "Conditional", "Independence"], answer: 2 },
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
    importantTopics: [
      { title: "Cell Biology", description: "Cell organelles, membranes, ribosomes, and cell theory are core NCERT-based questions." },
      { title: "Biomolecules", description: "Proteins, DNA, enzymes, and basic biochemistry facts are very high-yield for NEET." },
      { title: "Human Physiology", description: "Circulation, breathing, excretion, and hormonal control are among the most important biology units." },
      { title: "Genetics", description: "Mendelian inheritance, linkage, and molecular genetics are repeatedly tested in conceptual form." },
      { title: "Ecology", description: "Population interactions, succession, and ecosystem terms are memory-based and scoring." },
      { title: "Plant Physiology", description: "Photosynthesis, respiration, water transport, and mineral nutrition appear regularly in exams." },
    ],
    chapters: [
      {
        slug: "cell-biology",
        title: "Cell — The Unit of Life",
        emoji: "🦠",
        formulas: [
          { id: "ce-1", title: "Cell theory", expression: "All living = cells; cells from pre-existing cells", trick: "Schleiden + Schwann (1838-39); Virchow added the third." },
          { id: "ce-2", title: "Prokaryote vs Eukaryote", expression: "No nucleus vs True nucleus", trick: "Prokaryote = 70S ribosome; Eukaryote = 80S (cyto)." },
          { id: "ce-3", title: "Mitochondria", expression: "Powerhouse — ATP via oxidative phosphorylation", trick: "Has own circular DNA + 70S ribosomes (endosymbiont!)." },
          { id: "ce-4", title: "Chloroplast", expression: "Site of photosynthesis (thylakoid + stroma)", trick: "Also has 70S + circular DNA — endosymbiont theory." },
          { id: "ce-5", title: "Ribosome subunits", expression: "70S = 50S + 30S; 80S = 60S + 40S", trick: "S not additive — Svedberg unit." },
          { id: "ce-6", title: "Lysosome", expression: "Suicide bag — hydrolytic enzymes", trick: "Acidic interior (pH ~5)." },
          { id: "ce-7", title: "Nucleolus", expression: "Site of rRNA synthesis", trick: "Disappears during cell division." },
        ],
        quiz: [
          { q: "Eukaryotic cytoplasmic ribosome:", options: ["70S", "80S", "60S", "30S"], answer: 1 },
          { q: "Cell theory was proposed by:", options: ["Hooke & Brown", "Schleiden & Schwann", "Virchow alone", "Mendel"], answer: 1 },
          { q: "Suicide bag of cell:", options: ["Mitochondria", "Lysosome", "Golgi", "ER"], answer: 1 },
        ],
      },
      {
        slug: "biomolecules",
        title: "Biomolecules",
        emoji: "🧫",
        formulas: [
          { id: "bm-1", title: "Glucose formula", expression: "C₆H₁₂O₆", trick: "Aldohexose — D-glucose in nature." },
          { id: "bm-2", title: "Peptide bond", expression: "−CO−NH−", trick: "Forms by dehydration between amino acids." },
          { id: "bm-3", title: "DNA base pairing", expression: "A=T (2 H-bonds), G≡C (3 H-bonds)", trick: "GC-rich DNA → more stable." },
          { id: "bm-4", title: "Chargaff's rule", expression: "A = T, G = C", trick: "Purines = Pyrimidines in DNA." },
          { id: "bm-5", title: "Enzyme kinetics", expression: "Michaelis-Menten: v = Vmax[S]/(Km+[S])", trick: "Km = [S] at v = Vmax/2." },
          { id: "bm-6", title: "ATP", expression: "Adenine + ribose + 3 phosphates", trick: "Energy currency — ~7.3 kcal/mol per bond." },
          { id: "bm-7", title: "α-helix vs β-sheet", expression: "Secondary protein structures", trick: "H-bonds along (helix) vs across (sheet) backbone." },
        ],
        quiz: [
          { q: "G-C pair has how many H-bonds?", options: ["1", "2", "3", "4"], answer: 2 },
          { q: "Energy currency of cell:", options: ["GTP", "ATP", "NADH", "FADH₂"], answer: 1 },
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
          { id: "hp-4", title: "Tidal volume", expression: "~500 mL per breath", trick: "VC = TV + IRV + ERV (~4500 mL)." },
          { id: "hp-5", title: "Normal BP", expression: "120/80 mmHg", trick: "Systolic / Diastolic." },
          { id: "hp-6", title: "Nephron count", expression: "~10 lakh per kidney", trick: "Functional unit of kidney." },
          { id: "hp-7", title: "Resting potential", expression: "−70 mV (neuron)", trick: "Maintained by Na⁺/K⁺ pump." },
          { id: "hp-8", title: "Action potential threshold", expression: "−55 mV", trick: "All-or-none response." },
        ],
        quiz: [
          { q: "Normal GFR (mL/min):", options: ["25", "75", "125", "250"], answer: 2 },
          { q: "Cardiac output formula:", options: ["SV+HR", "SV×HR", "HR/SV", "SV²"], answer: 1 },
          { q: "Resting membrane potential:", options: ["+70 mV", "−70 mV", "0 mV", "−55 mV"], answer: 1 },
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
          { id: "ge-4", title: "Test cross", expression: "F₁ × homozygous recessive", trick: "Reveals genotype of unknown." },
          { id: "ge-5", title: "Sex chromosomes (humans)", expression: "XX (♀), XY (♂)", trick: "Male is heterogametic." },
          { id: "ge-6", title: "Codon count", expression: "64 codons (61 sense + 3 stop)", trick: "AUG = start (Met). UAA/UAG/UGA = stop." },
          { id: "ge-7", title: "Chromosome number (human)", expression: "46 (23 pairs)", trick: "22 autosome pairs + 1 sex pair." },
        ],
        quiz: [
          { q: "Dihybrid F2 phenotype ratio:", options: ["3:1", "1:2:1", "9:3:3:1", "1:1"], answer: 2 },
          { q: "Hardy-Weinberg equation:", options: ["p+q=1", "p²+q²=1", "p²+2pq+q²=1", "pq=1"], answer: 2 },
          { q: "Number of codons:", options: ["20", "61", "64", "100"], answer: 2 },
        ],
      },
      {
        slug: "ecology",
        title: "Ecology & Environment",
        emoji: "🌿",
        formulas: [
          { id: "ec-1", title: "Population growth (exponential)", expression: "dN/dt = rN", trick: "J-shaped curve — unlimited resources." },
          { id: "ec-2", title: "Logistic growth", expression: "dN/dt = rN(K−N)/K", trick: "S-shaped — K is carrying capacity." },
          { id: "ec-3", title: "10% law (Lindeman)", expression: "Only ~10% energy passes per trophic level", trick: "Why food chains rarely exceed 4-5 levels." },
          { id: "ec-4", title: "Ecological pyramid", expression: "Numbers, biomass, energy", trick: "Energy pyramid — always upright." },
          { id: "ec-5", title: "Biodiversity", expression: "α (within), β (between), γ (regional)", trick: "Whittaker's classification." },
        ],
        quiz: [
          { q: "Lindeman's law states ~ what % energy transfer:", options: ["1%", "10%", "50%", "100%"], answer: 1 },
          { q: "K in logistic growth means:", options: ["Rate", "Carrying capacity", "Population", "Time"], answer: 1 },
        ],
      },
      {
        slug: "plant-physiology",
        title: "Plant Physiology",
        emoji: "🌱",
        formulas: [
          { id: "pp-1", title: "Photosynthesis", expression: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", trick: "Light reaction in thylakoid; dark in stroma." },
          { id: "pp-2", title: "Respiration (aerobic)", expression: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP", trick: "Glycolysis(2) + Krebs(2) + ETC(34)." },
          { id: "pp-3", title: "Water potential", expression: "Ψw = Ψs + Ψp", trick: "Pure water Ψw = 0. Solute lowers it." },
          { id: "pp-4", title: "C3 vs C4", expression: "First product: 3-PGA (C3) vs OAA (C4)", trick: "C4 — Kranz anatomy, no photorespiration." },
          { id: "pp-5", title: "Transpiration pull", expression: "Cohesion-tension theory", trick: "Water column held by H-bonds." },
        ],
        quiz: [
          { q: "Net ATP from aerobic respiration of 1 glucose:", options: ["2", "8", "36-38", "100"], answer: 2 },
          { q: "First stable product in C4 cycle:", options: ["3-PGA", "OAA", "RuBP", "PEP"], answer: 1 },
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
