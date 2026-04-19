/** NEET Physics — high-yield concepts (chapter-wise). Questions are practice MCQs (not exam leaks). */

export type ConceptQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain?: string;
};

export type TopConcept = {
  id: string;
  title: string;
  /** One-line why it matters */
  hook?: string;
  /** Optional longer notes. If omitted, the AI card builds copy from the hook and MCQ explanations. */
  detail?: string;
  questions: ConceptQuestion[];
};

const MAX_QUESTION_PARAS = 3;

/** Body copy for the swipe card: explicit detail, else hook + teaching text from practice questions. */
export function conceptDisplayBody(c: TopConcept): string {
  const explicit = c.detail?.trim();
  if (explicit) return explicit;

  const parts: string[] = [];
  const push = (s: string) => {
    const t = s.trim();
    if (!t || parts.includes(t)) return;
    parts.push(t);
  };

  if (c.hook?.trim()) push(c.hook);

  const cap = c.hook?.trim() ? 2 : MAX_QUESTION_PARAS;
  let used = 0;
  for (const qq of c.questions) {
    if (used >= cap) break;
    const answerText = qq.options[qq.answer];
    const fromExplain = qq.explain?.trim();
    if (fromExplain) {
      push(fromExplain);
    } else if (answerText) {
      push(
        `${qq.q} The line examiners expect you to pick without hesitation is: ${answerText}. Tap Open questions to see how this is disguised in MCQs.`,
      );
    } else {
      push(`${qq.q} Use the MCQs below to lock the standard answer pattern for “${c.title}”.`);
    }
    used += 1;
  }

  if (parts.length === 0) {
    return `Revise “${c.title}” carefully — NEET often asks for the definition, a direct formula substitution, or a small twist. Use the practice MCQs to lock the pattern.`;
  }

  return parts.join("\n\n");
}

export type ConceptChapter = {
  id: string;
  title: string;
  emoji: string;
  priority?: string;
  concepts: TopConcept[];
};

function q(
  question: string,
  options: string[],
  answer: number,
  explain?: string,
): ConceptQuestion {
  return { q: question, options, answer, explain };
}

export const NEET_PHYSICS_TOP_CHAPTERS: ConceptChapter[] = [
  {
    id: "current-electricity",
    title: "Current Electricity",
    emoji: "🔋",
    priority: "Direct formula-based",
    concepts: [
      {
        id: "ce-ohm",
        title: "Ohm’s law (V = IR)",
        questions: [q("For ohmic conductor, which holds?", ["V ∝ I", "V ∝ I²", "I ∝ V²", "V independent of I"], 0)],
      },
      {
        id: "ce-rsp",
        title: "Resistance in series / parallel",
        questions: [
          q(
            "Two equal resistors R in parallel give equivalent resistance",
            ["R/2", "2R", "R", "R²"],
            0,
          ),
        ],
      },
      {
        id: "ce-power",
        title: "Power (P = VI, V²/R, I²R)",
        questions: [q("Power dissipated in resistor R carrying current I is", ["I²R", "IR²", "I/R", "V/I"], 0)],
      },
      {
        id: "ce-drift",
        title: "Drift velocity",
        questions: [
          q(
            "Drift velocity v_d in a conductor is typically",
            ["Very large (~10⁸ m/s)", "Very small (~10⁻⁴ m/s order)", "Equal to speed of light", "Zero in DC"],
            1,
          ),
        ],
      },
      {
        id: "ce-resist",
        title: "Resistivity",
        questions: [q("Resistance R of a wire of length L, area A, resistivity ρ is", ["ρL/A", "ρA/L", "ρLA", "L/ρA"], 0)],
      },
    ],
  },
  {
    id: "modern-physics",
    title: "Modern Physics",
    emoji: "⚡",
    priority: "Very high priority",
    concepts: [
      {
        id: "mp-pe",
        title: "Photoelectric equation (E = hf)",
        hook: "~3–4 questions almost guaranteed from this block",
        questions: [
          q(
            "Photoelectric effect: kinetic energy of emitted electrons is maximum when",
            ["Intensity is highest", "Frequency is highest", "Wavelength is longest", "Metal work function is zero"],
            1,
            "KE_max = hf − φ; higher f → more energy per photon above threshold.",
          ),
        ],
      },
      {
        id: "mp-thresh",
        title: "Threshold frequency",
        questions: [
          q(
            "Photoelectric emission begins only when photon frequency f satisfies",
            ["f < f₀", "f = f₀", "f ≥ f₀", "f is arbitrary"],
            2,
            "f₀ = φ/h is the minimum frequency for emission.",
          ),
        ],
      },
      {
        id: "mp-stop",
        title: "Stopping potential",
        questions: [
          q(
            "Stopping potential V₀ is related to max photoelectron KE by (e = electron charge)",
            ["eV₀ = KE_max", "V₀ = KE_max", "eV₀ = hf", "V₀ = φ"],
            0,
          ),
        ],
      },
      {
        id: "mp-einstein",
        title: "Einstein photoelectric equation",
        questions: [
          q(
            "Einstein’s equation for photoelectrons is",
            ["KE = hf + φ", "KE = hf − φ", "KE = hc/λ + φ", "KE = ½mv² = hf"],
            1,
          ),
        ],
      },
      {
        id: "mp-bohr-r",
        title: "Bohr radius",
        questions: [
          q(
            "Bohr radius a₀ scales approximately as",
            ["m_e", "1/m_e", "m_e²", "√m_e"],
            1,
            "a₀ ∝ 1/m_e in standard form.",
          ),
        ],
      },
      {
        id: "mp-en",
        title: "Energy levels in hydrogen",
        questions: [
          q(
            "Hydrogen-like atom: energy Eₙ is proportional to (Z = atomic number)",
            ["Z²/n²", "Z/n²", "Z²/n", "n²/Z"],
            0,
          ),
        ],
      },
      {
        id: "mp-debroglie",
        title: "De Broglie wavelength",
        questions: [
          q("de Broglie wavelength λ for a particle of momentum p is", ["h/p", "p/h", "h p", "p²/h"], 0),
        ],
      },
      {
        id: "mp-decay",
        title: "Radioactive decay law",
        questions: [
          q(
            "Number of undecayed nuclei N(t) follows",
            ["N = N₀ e^{λt}", "N = N₀ e^{-λt}", "N = N₀ λt", "N = N₀/t"],
            1,
          ),
        ],
      },
      {
        id: "mp-half",
        title: "Half-life relation",
        questions: [
          q("Half-life T½ and decay constant λ satisfy", ["T½ = ln2/λ", "T½ = λ ln2", "T½ = 1/λ", "T½ = λ²"], 0),
        ],
      },
      {
        id: "mp-bind",
        title: "Binding energy",
        questions: [
          q(
            "Mass defect Δm and binding energy B are related by",
            ["B = Δm c²", "B = Δm/c²", "B = Δm c", "B = Δm² c²"],
            0,
          ),
        ],
      },
    ],
  },
  {
    id: "magnetism-emi",
    title: "Magnetism & EMI",
    emoji: "🧲",
    concepts: [
      {
        id: "mm-fq",
        title: "Force on moving charge",
        questions: [q("Lorentz force on charge q moving with velocity v in B is F =", ["q(v×B)", "q v B always", "q/B", "v×qB"], 0)],
      },
      {
        id: "mm-rhr",
        title: "Right-hand rule",
        questions: [
          q(
            "For straight wire current I, magnetic field direction at a point is found using",
            ["Left-hand rule only", "Right-hand grip rule", "Fleming’s left rule", "No rule"],
            1,
          ),
        ],
      },
      {
        id: "mm-wire-b",
        title: "Magnetic field around long straight wire",
        questions: [q("B at distance r from long wire carrying I (μ₀ constants) varies as", ["1/r", "1/r²", "r", "r²"], 0)],
      },
      {
        id: "mm-force-wire",
        title: "Force on current-carrying conductor",
        questions: [q("Force on length L carrying I in uniform B (angle θ) has magnitude", ["ILB sin θ", "ILB cos θ", "IL/B", "I²LB"], 0)],
      },
      {
        id: "mm-faraday",
        title: "Faraday’s law",
        questions: [
          q(
            "Induced emf magnitude (Faraday) is proportional to",
            ["Magnetic flux", "Rate of change of magnetic flux", "B only", "Current only"],
            1,
          ),
        ],
      },
      {
        id: "mm-lenz",
        title: "Lenz’s law",
        questions: [
          q(
            "Lenz’s law says induced current opposes",
            ["The battery", "The change causing it", "Gravity", "Resistance"],
            1,
          ),
        ],
      },
    ],
  },
  {
    id: "electrostatics",
    title: "Electrostatics",
    emoji: "⚡",
    concepts: [
      {
        id: "es-coulomb",
        title: "Coulomb’s law",
        questions: [q("Force between two point charges varies with distance r as", ["1/r", "1/r²", "r", "r²"], 1)],
      },
      {
        id: "es-e",
        title: "Electric field due to point charge",
        questions: [q("E at distance r from point charge Q in vacuum ∝", ["Q/r", "Q/r²", "Qr", "Q²/r"], 1)],
      },
      {
        id: "es-v",
        title: "Electric potential",
        questions: [q("Work done per unit charge to bring test charge from ∞ to a point defines", ["Field", "Potential", "Capacitance", "Flux"], 1)],
      },
      {
        id: "es-cap",
        title: "Capacitance (parallel plate)",
        questions: [q("Parallel plate capacitor C with area A, separation d (ε) scales as", ["A/d", "d/A", "Ad", "1/Ad"], 0)],
      },
      {
        id: "es-u",
        title: "Energy stored in capacitor",
        questions: [q("Energy in capacitor can be written as", ["½CV²", "CV²", "C/V", "V/C"], 0)],
      },
    ],
  },
  {
    id: "kinematics",
    title: "Kinematics",
    emoji: "🏃",
    concepts: [
      {
        id: "kin-eom",
        title: "Equations of motion",
        questions: [q("For uniform acceleration, which is NOT a standard SUVAT form?", ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "s = vt − at"], 3)],
      },
      {
        id: "kin-graph",
        title: "Graphs (v–t, s–t)",
        questions: [q("Slope of displacement–time graph gives", ["Acceleration", "Velocity", "Force", "Power"], 1)],
      },
      {
        id: "kin-rel",
        title: "Relative motion",
        questions: [q("Relative velocity of A with respect to B is", ["v_A + v_B", "v_A − v_B", "v_B − v_A", "|v_A|"], 1)],
      },
    ],
  },
  {
    id: "laws-of-motion",
    title: "Laws of Motion",
    emoji: "⚖️",
    concepts: [
      {
        id: "lom-newton",
        title: "Newton’s laws",
        questions: [q("Newton’s second law in vector form", ["F = mv", "F = dp/dt", "F = v²/r", "F = 0 always"], 1)],
      },
      {
        id: "lom-fric",
        title: "Friction (static / kinetic)",
        questions: [q("Typically, static friction μ_s and kinetic μ_k satisfy", ["μ_s < μ_k", "μ_s = μ_k", "μ_s > μ_k", "No relation"], 2)],
      },
      {
        id: "lom-circ",
        title: "Circular motion basics",
        questions: [q("Centripetal acceleration for speed v, radius r is", ["v/r", "v²/r", "v r", "r/v"], 1)],
      },
    ],
  },
  {
    id: "wep",
    title: "Work, Energy & Power",
    emoji: "🔄",
    concepts: [
      {
        id: "wep-wet",
        title: "Work–energy theorem",
        questions: [q("Work–energy theorem: net work equals change in", ["Momentum", "Kinetic energy", "Potential only", "Heat only"], 1)],
      },
      {
        id: "wep-ke",
        title: "Kinetic energy",
        questions: [q("KE of particle mass m, speed v is", ["mv", "½mv²", "mv²", "m/v"], 1)],
      },
      {
        id: "wep-pe",
        title: "Potential energy",
        questions: [q("Near earth, gravitational PE increase with height h is (g constant)", ["mgh", "mg/h", "h/mg", "g/mh"], 0)],
      },
      {
        id: "wep-pow",
        title: "Power",
        questions: [q("Instantaneous mechanical power is", ["F·v", "F×v only", "F/v", "Fv²"], 0)],
      },
    ],
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    emoji: "🌡️",
    concepts: [
      {
        id: "th-first",
        title: "First law",
        questions: [q("First law for closed system: ΔU =", ["Q − W (sign convention dependent)", "Q + W always", "W only", "Q only"], 0)],
      },
      {
        id: "th-c",
        title: "Heat capacity",
        questions: [q("Heat capacity C relates heat Q and temperature change ΔT as", ["Q = C/ΔT", "Q = C ΔT", "Q = ΔT/C", "C = Q ΔT"], 1)],
      },
      {
        id: "th-ideal",
        title: "Ideal gas law",
        questions: [q("Ideal gas equation is", ["PV = nRT", "PV = RT only", "P = nV", "V = nP"], 0)],
      },
      {
        id: "th-iso",
        title: "Isothermal / adiabatic",
        questions: [q("In isothermal ideal gas process, which stays constant?", ["P", "T", "V", "None"], 1)],
      },
    ],
  },
  {
    id: "waves",
    title: "Waves",
    emoji: "🔊",
    concepts: [
      {
        id: "wv-speed",
        title: "Wave speed",
        questions: [q("Wave speed v, frequency f, wavelength λ satisfy", ["v = fλ", "v = f/λ", "v = λ/f", "v = f²λ"], 0)],
      },
      {
        id: "wv-fl",
        title: "Frequency vs wavelength",
        questions: [q("If wave speed is constant and frequency doubles, wavelength", ["Doubles", "Halves", "Unchanged", "Quadruples"], 1)],
      },
      {
        id: "wv-sound",
        title: "Sound waves",
        questions: [q("Sound waves in air are primarily", ["Transverse", "Longitudinal", "Electromagnetic", "Stationary"], 1)],
      },
      {
        id: "wv-doppler",
        title: "Doppler effect",
        questions: [q("Source moving toward observer: observed frequency tends to", ["Decrease", "Increase", "Stay same", "Become zero"], 1)],
      },
    ],
  },
  {
    id: "optics",
    title: "Optics",
    emoji: "🔍",
    concepts: [
      {
        id: "op-mirror",
        title: "Mirror formula",
        questions: [q("Mirror formula relates", ["u,v,f", "P,V,T", "I,R,V", "E,B,k"], 0)],
      },
      {
        id: "op-lens",
        title: "Lens formula",
        questions: [q("For thin lens, correct relation among object distance u, image v, focal f is", ["1/f = 1/v − 1/u (sign rules)", "u + v = f", "uv = f", "f = uv"], 0)],
      },
      {
        id: "op-mag",
        title: "Magnification",
        questions: [q("Linear magnification m (real conventions) often written as", ["−v/u", "v+u", "u/v", "f/v"], 0)],
      },
      {
        id: "op-refr",
        title: "Refraction laws",
        questions: [q("Snell’s law connects", ["θ only", "n sin θ constants across boundary", "n + θ", "v/θ"], 1)],
      },
    ],
  },
];

/** Card count for the home AI deck (NEET Physics stack). */
export const NEET_PHYSICS_AI_DECK_SIZE = NEET_PHYSICS_TOP_CHAPTERS.reduce(
  (n, ch) => n + ch.concepts.length,
  0,
);

export type FlatConcept = TopConcept & {
  chapterId: string;
  chapterTitle: string;
  chapterEmoji: string;
  /** Chapter-level examiner note (e.g. "Very high priority"). */
  chapterPriority?: string;
  chapterNumber: number;
  conceptIndexInChapter: number;
  conceptsInChapter: number;
  globalIndex: number;
  globalTotal: number;
};

export function flattenConceptDeck(): FlatConcept[] {
  const flat: FlatConcept[] = [];
  let g = 0;
  const total = NEET_PHYSICS_TOP_CHAPTERS.reduce((s, ch) => s + ch.concepts.length, 0);
  NEET_PHYSICS_TOP_CHAPTERS.forEach((chapter, ci) => {
    chapter.concepts.forEach((c, j) => {
      flat.push({
        ...c,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterEmoji: chapter.emoji,
        chapterPriority: chapter.priority,
        chapterNumber: ci + 1,
        conceptIndexInChapter: j + 1,
        conceptsInChapter: chapter.concepts.length,
        globalIndex: g + 1,
        globalTotal: total,
      });
      g += 1;
    });
  });
  return flat;
}
