import { useState, useEffect, useRef } from "react";

// ─── HERB DATA ────────────────────────────────────────────────────────────────

const HERBS = [
  {
    id: "ashwagandha", name: "Ashwagandha", botanical: "Withania somnifera",
    category: "well_researched", stimulation: "calming",
    temperature: "warm", colour: "#c8a882",
    symbol: "◑",
    tagline: "The great calmer",
    description: "A deeply nourishing, calming adaptogen from Ayurvedic tradition. Ashwagandha quiets an overstimulated nervous system, reduces cortisol, and rebuilds depleted adrenal reserves.",
    bestFor: ["Anxiety & nervous exhaustion", "Stress-induced insomnia", "Fatigue with muscle tension", "Mild hypothyroidism", "Rebuilding after burnout"],
    cautions: ["Avoid with hyperthyroid disease", "Avoid if sensitive to nightshade family", "Avoid with haemochromatosis"],
    drugWarnings: ["May enhance barbiturates", "May enhance thyroid hormones"],
    dosage: "2–4 mL tincture three times daily · One 400–500 mg capsule twice daily",
    scores: { stress: 3, energy: 2, sleep: 3, immunity: 1, hormones: 2, focus: 1 },
    constitutionFit: { cold_tired: 3, dry_anxious: 3, hot_wired: -1, damp_sluggish: 0, variable: 2 },
    lifestyle: { high_workload: 2, recovery: 3, menopause: 2, athlete: 1, caregiver: 2 },
    stressType: { anxiety: 3, mental_fog: 2, physical_tension: 2, irritability: 1, digestive: 1 },
    sleep: { cant_fall_asleep: 3, unrefreshed: 2, wake_night: 1 },
  },
  {
    id: "rhodiola", name: "Rhodiola", botanical: "Rhodiola rosea",
    category: "well_researched", stimulation: "stimulating",
    temperature: "cool", colour: "#b08070",
    symbol: "◈",
    tagline: "The golden root",
    description: "A stimulating adaptogen from Siberia and Scandinavia. Rhodiola sharpens the mind, lifts depression, and builds resilience under intense mental and physical pressure.",
    bestFor: ["Burnout & stress-related fatigue", "Depression (low energy, flat affect)", "Mental performance under pressure", "ADHD in adults", "Athletic recovery"],
    cautions: ["Avoid with bipolar disorder or manic episodes", "Can cause insomnia in sensitive people", "Very drying — avoid with dry constitution"],
    drugWarnings: ["No known interactions"],
    dosage: "2–3 mL tincture three times daily · 2–4 capsules standardised to 3–5% rosavins",
    scores: { stress: 3, energy: 3, sleep: 1, immunity: 1, hormones: 1, focus: 3 },
    constitutionFit: { cold_tired: 2, dry_anxious: -2, hot_wired: -1, damp_sluggish: 1, variable: 1 },
    lifestyle: { high_workload: 3, athlete: 3, recovery: 2, caregiver: 1 },
    stressType: { mental_fog: 3, anxiety: 1, physical_tension: 1 },
    sleep: { unrefreshed: 2 },
  },
  {
    id: "eleuthero", name: "Eleuthero", botanical: "Eleutherococcus senticosus",
    category: "well_researched", stimulation: "mild",
    temperature: "slightly_warm", colour: "#8aab8a",
    symbol: "◇",
    tagline: "The endurance herb",
    description: "The mildest and most versatile of adaptogens. Eleuthero builds stamina and resilience without overstimulating, making it ideal for sustained stress and busy lives.",
    bestFor: ["Sustained high-stress periods", "Immune resilience", "Shift workers & irregular schedules", "Jet lag", "ADHD & adrenal fatigue"],
    cautions: ["Rare overstimulation in sensitive individuals", "Ensure product is authenticated — frequently adulterated"],
    drugWarnings: ["May interact with digoxin (likely due to adulterant)"],
    dosage: "3–5 mL tincture three or four times daily",
    scores: { stress: 2, energy: 2, sleep: 2, immunity: 2, hormones: 1, focus: 2 },
    constitutionFit: { cold_tired: 2, variable: 3, dry_anxious: 1, damp_sluggish: 1, hot_wired: 0 },
    lifestyle: { high_workload: 3, athlete: 2, recovery: 1, caregiver: 2 },
    stressType: { mental_fog: 2, anxiety: 1 },
    sleep: { wake_night: 2, unrefreshed: 2 },
  },
  {
    id: "schisandra", name: "Schisandra", botanical: "Schisandra chinensis",
    category: "well_researched", stimulation: "calming",
    temperature: "warm", colour: "#a07898",
    symbol: "✦",
    tagline: "The five-flavour berry",
    description: "The only adaptogen with all five tastes, Schisandra is uniquely dual-acting — it sharpens focus and alertness while simultaneously calming anxiety and protecting the liver.",
    bestFor: ["Anxiety with mental fatigue", "Stress-induced palpitations", "Night sweats & menopausal symptoms", "Liver support", "ADHD"],
    cautions: ["Do not take during acute infections", "Avoid with narrow therapeutic index medications"],
    drugWarnings: ["May affect CYP3A4/5 drug metabolism", "May increase barbiturate effects"],
    dosage: "2–4 mL tincture three or four times daily · 1–2 capsules two or three times daily",
    scores: { stress: 3, energy: 2, sleep: 2, immunity: 2, hormones: 2, focus: 2 },
    constitutionFit: { damp_sluggish: 2, cold_tired: 2, hot_wired: 1, dry_anxious: 0, variable: 2 },
    lifestyle: { high_workload: 2, athlete: 2, menopause: 3, caregiver: 1 },
    stressType: { anxiety: 2, mental_fog: 2, irritability: 1 },
    sleep: { cant_fall_asleep: 2, wake_night: 2 },
  },
  {
    id: "american_ginseng", name: "American Ginseng", botanical: "Panax quinquefolius",
    category: "well_researched", stimulation: "moderate",
    temperature: "slightly_warm", colour: "#c8b870",
    symbol: "◎",
    tagline: "The moist restorer",
    description: "A moderately stimulating, moist adaptogen best suited to those in mid-life noticing declining energy and resilience. Reduces elevated cortisol and rebuilds adrenal function.",
    bestFor: ["Mid-life energy decline (40–60)", "Elevated cortisol", "Chronic fatigue with dark circles", "Immune support", "Metabolic syndrome"],
    cautions: ["None likely at normal doses"],
    drugWarnings: ["High doses may alter warfarin effects"],
    dosage: "3–5 mL tincture three times daily · Two 500 mg capsules twice daily",
    scores: { stress: 2, energy: 3, sleep: 2, immunity: 2, hormones: 1, focus: 1 },
    constitutionFit: { cold_tired: 3, dry_anxious: 2, variable: 1, hot_wired: 0, damp_sluggish: 0 },
    lifestyle: { high_workload: 2, recovery: 2, caregiver: 1 },
    stressType: { mental_fog: 2, anxiety: 1 },
    sleep: { unrefreshed: 2 },
  },
  {
    id: "holy_basil", name: "Holy Basil (Tulsi)", botanical: "Ocimum tenuiflorum",
    category: "probable", stimulation: "mild",
    temperature: "warm", colour: "#7aab7a",
    symbol: "◐",
    tagline: "Sacred clarity",
    description: "Sacred to Ayurvedic tradition, Tulsi lifts stagnant mood, clears mental fog, and gently supports immunity. Winston coined the term 'stagnant depression' for its key indication.",
    bestFor: ["Stagnant depression / PTSD", "Mental fog & poor memory", "Menopausal brain fog", "Allergic rhinitis", "Blood sugar support"],
    cautions: ["Avoid in pregnancy", "Avoid if trying to conceive"],
    drugWarnings: ["Possible CYP-450 interaction — no confirmed clinical interactions"],
    dosage: "2–3 mL tincture three times daily · 1–3 capsules per day",
    scores: { stress: 2, energy: 1, sleep: 1, immunity: 2, hormones: 1, focus: 3 },
    constitutionFit: { cold_tired: 2, damp_sluggish: 2, variable: 2, dry_anxious: 1, hot_wired: 0 },
    lifestyle: { high_workload: 2, recovery: 2, menopause: 2, caregiver: 1 },
    stressType: { mental_fog: 3, anxiety: 1 },
    sleep: { unrefreshed: 1 },
  },
  {
    id: "reishi", name: "Reishi", botanical: "Ganoderma lingzhi",
    category: "possible", stimulation: "calming",
    temperature: "warm", colour: "#b86040",
    symbol: "◆",
    tagline: "The spirit mushroom",
    description: "Called ling zhi — 'spirit plant' — Reishi calms the shen, supports immune balance, and offers gentle cardiovascular and hepatic protection. Mild and cumulative in its effects.",
    bestFor: ["Anxiety, bad dreams & insomnia", "Disturbed emotions & poor memory", "Immune support (cancer, CFIDS)", "Autoimmune conditions", "Altitude sickness"],
    cautions: ["Avoid with mushroom allergies"],
    drugWarnings: ["Use cautiously with blood-thinning medications"],
    dosage: "4–5 mL tincture three or four times daily · Three 500–1000 mg tablets three times daily",
    scores: { stress: 3, energy: 1, sleep: 3, immunity: 3, hormones: 0, focus: 1 },
    constitutionFit: { hot_wired: 2, cold_tired: 2, variable: 3, dry_anxious: 1, damp_sluggish: 0 },
    lifestyle: { high_workload: 2, recovery: 2, caregiver: 1 },
    stressType: { anxiety: 3, irritability: 2 },
    sleep: { cant_fall_asleep: 3, wake_night: 2 },
  },
  {
    id: "cordyceps", name: "Cordyceps", botanical: "Cordyceps militaris",
    category: "well_researched", stimulation: "moderate",
    temperature: "warm", colour: "#c8a040",
    symbol: "◉",
    tagline: "The vitality fungus",
    description: "From the alpine grasslands of Tibet, Cordyceps rebuilds deep reserves of energy, enhances aerobic capacity, and strengthens kidney and adrenal function.",
    bestFor: ["Deep fatigue & adrenal depletion", "Athletic performance & recovery", "Kidney support", "Respiratory health (asthma, COPD)", "Immune support"],
    cautions: ["Use cultivated C. militaris only — wild may be contaminated", "Excessive amounts can depress immune function"],
    drugWarnings: ["No significant interactions — may actually protect kidneys from cyclosporine toxicity"],
    dosage: "1–2 mL tincture three times daily · Two capsules per day (mycelial extract)",
    scores: { stress: 1, energy: 3, sleep: 1, immunity: 2, hormones: 1, focus: 1 },
    constitutionFit: { cold_tired: 3, variable: 1, damp_sluggish: 0, dry_anxious: 0, hot_wired: 0 },
    lifestyle: { athlete: 3, recovery: 3, high_workload: 1 },
    stressType: { physical_tension: 1 },
    sleep: { unrefreshed: 2 },
  },
  {
    id: "shatavari", name: "Shatavari", botanical: "Asparagus racemosus",
    category: "probable", stimulation: "calming",
    temperature: "warm", colour: "#a8b870",
    symbol: "◌",
    tagline: "She who has a hundred husbands",
    description: "The primary female adaptogenic herb in Ayurvedic medicine. Shatavari is moist, nourishing, and deeply restorative for the female reproductive and hormonal system.",
    bestFor: ["Menopausal symptoms (vaginal dryness, low libido)", "Female infertility (minor hormonal imbalances)", "Anaemia & poor appetite", "Dry / irritable cough", "Chronic fatigue with depletion"],
    cautions: ["Use cautiously with diarrhoea — combine with ginger"],
    drugWarnings: ["May prevent aspirin-induced stomach irritation"],
    dosage: "3–5 mL tincture three times daily · Two capsules three times daily",
    scores: { stress: 1, energy: 2, sleep: 1, immunity: 1, hormones: 3, focus: 0 },
    constitutionFit: { cold_tired: 3, dry_anxious: 3, damp_sluggish: -1, variable: 1, hot_wired: 0 },
    lifestyle: { menopause: 3, recovery: 2, caregiver: 2 },
    stressType: { physical_tension: 1 },
    sleep: { unrefreshed: 1 },
  },
  {
    id: "jiaogulan", name: "Jiaogulan", botanical: "Gynostemma pentaphyllum",
    category: "possible", stimulation: "calming",
    temperature: "neutral", colour: "#78a890",
    symbol: "◗",
    tagline: "The southern vine",
    description: "A calming adaptogen from southern China containing gypenosides related to ginsenosides. Jiaogulan is especially suited to anxious, wired people with labile blood pressure and metabolic concerns.",
    bestFor: ["Anxiety with labile blood pressure", "Stress headaches", "Anxiety-induced insomnia", "Metabolic syndrome & blood sugar", "Jet lag & altitude sickness"],
    cautions: ["May cause gastric upset on empty stomach", "Excessive doses — rash, dizziness, palpitations"],
    drugWarnings: ["May increase effects of tranquilisers / sedatives"],
    dosage: "3–5 mL tincture three times daily · 1–2 standardised capsules three times daily",
    scores: { stress: 3, energy: 1, sleep: 2, immunity: 1, hormones: 0, focus: 1 },
    constitutionFit: { hot_wired: 3, damp_sluggish: 2, variable: 2, cold_tired: 0, dry_anxious: 1 },
    lifestyle: { high_workload: 2 },
    stressType: { anxiety: 3, irritability: 1 },
    sleep: { cant_fall_asleep: 2 },
  },
  {
    id: "asian_ginseng", name: "Asian Ginseng", botanical: "Panax ginseng",
    category: "well_researched", stimulation: "stimulating",
    temperature: "warm", colour: "#c8a060",
    symbol: "◙",
    tagline: "The king tonic",
    description: "The most stimulating of all adaptogens. Asian Ginseng is specifically indicated for elderly or severely depleted individuals who are cold, fatigued, and lack vitality.",
    bestFor: ["Severe depletion & exhaustion (esp. 70+)", "Adrenal depletion", "Immune deficiency", "Poor memory & depression", "Erectile dysfunction"],
    cautions: ["Avoid in anxious, hot, or hypertensive constitutions", "Type A people may experience worsening of anxiety or insomnia"],
    drugWarnings: ["May increase warfarin effects", "May potentiate blood sugar medications", "Avoid with MAOIs"],
    dosage: "1–2 mL tincture up to three times daily · Two 400–500 mg capsules two or three times daily",
    scores: { stress: 1, energy: 3, sleep: 1, immunity: 2, hormones: 1, focus: 2 },
    constitutionFit: { cold_tired: 3, variable: 0, dry_anxious: 0, hot_wired: -3, damp_sluggish: 0 },
    lifestyle: { recovery: 3, high_workload: 1 },
    stressType: { mental_fog: 2 },
    sleep: { unrefreshed: 1 },
  },
];

const QUESTIONS = [
  { id: "name", type: "text", category: "Welcome", question: "First, what shall we call you?", placeholder: "Your first name" },
  {
    id: "primary_goal", type: "single", category: "Your Focus",
    question: "What brings you here today?",
    subtitle: "Choose the one that feels most pressing right now.",
    options: [
      { value: "stress", label: "Stress & overwhelm", icon: "◎" },
      { value: "energy", label: "Low energy & fatigue", icon: "◑" },
      { value: "sleep", label: "Sleep difficulties", icon: "◐" },
      { value: "immunity", label: "Immune support", icon: "◈" },
      { value: "hormones", label: "Hormonal balance", icon: "◇" },
      { value: "focus", label: "Focus & mental clarity", icon: "◆" },
    ],
  },
  {
    id: "stress_type", type: "multi", category: "Stress",
    question: "How does stress tend to show up for you?",
    subtitle: "Select all that apply.",
    options: [
      { value: "anxiety", label: "Anxiety or worry" },
      { value: "irritability", label: "Irritability or anger" },
      { value: "mental_fog", label: "Brain fog or forgetfulness" },
      { value: "physical_tension", label: "Physical tension or pain" },
      { value: "digestive", label: "Digestive upset" },
      { value: "withdrawal", label: "Withdrawal from others" },
    ],
  },
  {
    id: "energy_pattern", type: "single", category: "Energy",
    question: "How would you describe your energy through the day?",
    options: [
      { value: "low_all_day", label: "Low all day long", icon: "▁" },
      { value: "morning_crash", label: "Starts OK, crashes by mid-morning", icon: "▃" },
      { value: "afternoon_slump", label: "Good morning, afternoon slump", icon: "▅" },
      { value: "evening_wired", label: "Tired but wired in the evenings", icon: "▆" },
      { value: "inconsistent", label: "Unpredictable and inconsistent", icon: "▂" },
      { value: "generally_good", label: "Generally good", icon: "▇" },
    ],
  },
  {
    id: "sleep_quality", type: "single", category: "Sleep",
    question: "How is your sleep?",
    options: [
      { value: "cant_fall_asleep", label: "Hard to fall asleep" },
      { value: "wake_night", label: "Wake during the night" },
      { value: "unrefreshed", label: "Sleep but wake unrefreshed" },
      { value: "too_much", label: "Sleep too much" },
      { value: "good", label: "Generally good" },
    ],
  },
  {
    id: "constitution", type: "single", category: "Your Nature",
    question: "Which best describes your general constitution?",
    subtitle: "Trust your instinct — there are no wrong answers.",
    options: [
      { value: "cold_tired", label: "Generally cold, pale, and depleted" },
      { value: "hot_wired", label: "Often warm, restless, or inflamed" },
      { value: "dry_anxious", label: "Tends toward dryness and anxiety" },
      { value: "damp_sluggish", label: "Tends toward sluggishness or congestion" },
      { value: "variable", label: "Highly variable — changes often" },
    ],
  },
  {
    id: "health_conditions", type: "multi", category: "Health",
    question: "Do any of these apply to you?",
    subtitle: "This helps us keep your suggestions safe.",
    options: [
      { value: "autoimmune", label: "Autoimmune condition" },
      { value: "thyroid", label: "Thyroid condition" },
      { value: "heart", label: "Heart condition or high blood pressure" },
      { value: "diabetes", label: "Diabetes or blood sugar concerns" },
      { value: "pregnant", label: "Pregnant or breastfeeding" },
      { value: "medications", label: "Taking pharmaceutical medications" },
      { value: "none", label: "None of the above" },
    ],
  },
  {
    id: "lifestyle", type: "multi", category: "Lifestyle",
    question: "Which of these resonate with your life right now?",
    options: [
      { value: "high_workload", label: "High workload or long hours" },
      { value: "athlete", label: "Athletic training or physical demands" },
      { value: "caregiver", label: "Caring for others" },
      { value: "menopause", label: "Perimenopause or menopause" },
      { value: "recovery", label: "Recovering from illness or burnout" },
      { value: "poor_diet", label: "Irregular or poor diet" },
    ],
  },
];

// ─── MATCHING ENGINE ──────────────────────────────────────────────────────────

function matchHerbs(answers) {
  const { primary_goal, stress_type = [], energy_pattern, sleep_quality,
    constitution, health_conditions = [], lifestyle = [] } = answers;

  // Safety exclusions
  const hardExclusions = new Set();
  if (health_conditions.includes("pregnant")) {
    hardExclusions.add("rhodiola"); hardExclusions.add("asian_ginseng");
  }
  if (health_conditions.includes("thyroid")) {
    // ashwagandha stimulates thyroid — exclude only if hyperthyroid (we can't know, so flag)
  }
  if (health_conditions.includes("heart")) {
    hardExclusions.add("asian_ginseng"); // most stimulating
  }

  const scored = HERBS
    .filter(h => !hardExclusions.has(h.id))
    .map(herb => {
      let score = 0;
      const flags = [];

      // Primary goal — highest weight (×3)
      if (herb.scores[primary_goal]) score += herb.scores[primary_goal] * 3;

      // Constitution fit — high weight (×2.5)
      if (constitution && herb.constitutionFit[constitution] !== undefined) {
        score += herb.constitutionFit[constitution] * 2.5;
      }

      // Stress type — medium weight (×1.5)
      stress_type.forEach(st => {
        if (herb.stressType?.[st]) score += herb.stressType[st] * 1.5;
      });

      // Sleep quality — medium weight (×1.5)
      if (sleep_quality && herb.sleep?.[sleep_quality]) {
        score += herb.sleep[sleep_quality] * 1.5;
      }

      // Lifestyle — low weight (×1)
      lifestyle.forEach(l => {
        if (herb.lifestyle?.[l]) score += herb.lifestyle[l];
      });

      // Energy pattern adjustments
      if (energy_pattern === "evening_wired" || energy_pattern === "inconsistent") {
        if (herb.stimulation === "calming") score += 2;
        if (herb.stimulation === "stimulating") score -= 1;
      }
      if (energy_pattern === "low_all_day" || energy_pattern === "morning_crash") {
        if (herb.stimulation === "stimulating" || herb.stimulation === "moderate") score += 1.5;
      }

      // Health condition safety flags (not exclusions — just warnings)
      if (health_conditions.includes("medications") && herb.drugWarnings?.length > 0 &&
        herb.drugWarnings[0] !== "No known interactions") {
        flags.push("drug_interaction_check");
      }
      if (health_conditions.includes("thyroid") && herb.id === "ashwagandha") {
        flags.push("thyroid_caution");
      }
      if (health_conditions.includes("autoimmune") && herb.id === "asian_ginseng") {
        flags.push("autoimmune_note");
      }

      return { ...herb, score: Math.max(0, score), flags };
    })
    .sort((a, b) => b.score - a.score);

  // Top 3 primary recommendations
  const primary = scored.slice(0, 3);

  // Nervine suggestion based on stress type
  let nervine = null;
  if (stress_type.includes("anxiety") && sleep_quality === "cant_fall_asleep") {
    nervine = { name: "Passionflower", botanical: "Passiflora incarnata", reason: "For the mind that won't stop at night — circular thoughts preventing sleep." };
  } else if (stress_type.includes("anxiety") || stress_type.includes("irritability")) {
    nervine = { name: "Motherwort + Blue Vervain", botanical: "Leonurus cardiaca · Verbena hastata", reason: "Winston's classic pairing for anxiety and irritability — calms without sedating." };
  } else if (stress_type.includes("mental_fog") || stress_type.includes("withdrawal")) {
    nervine = { name: "Fresh Milky Oat", botanical: "Avena sativa", reason: "The greatest nervous system trophorestorative — for shattered nerves and burnout." };
  } else if (sleep_quality === "wake_night" && lifestyle.includes("menopause")) {
    nervine = { name: "Motherwort + Passionflower + Hops", botanical: "Leonurus · Passiflora · Humulus", reason: "Winston's formula for the menopausal insomnia pattern — falls asleep fine, wakes 1–3am." };
  }

  // Medications flag
  const hasDrugWarning = health_conditions.includes("medications") &&
    primary.some(h => h.flags.includes("drug_interaction_check"));

  return { primary, nervine, hasDrugWarning, allScored: scored };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const categoryColours = {
  Welcome: "#a8c5a0", "Your Focus": "#b5c8a0", Stress: "#c5b8a0",
  Energy: "#c8b89a", Sleep: "#a0b5c5", "Your Nature": "#c5a0b0",
  Health: "#b0a8c5", Lifestyle: "#a0c5b8",
};

function Questionnaire({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textInput, setTextInput] = useState("");
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState("forward");
  const q = QUESTIONS[current];
  const accent = categoryColours[q?.category] || "#a8c5a0";
  const progress = (current / QUESTIONS.length) * 100;

  const canProceed = () => {
    if (q.type === "text") return textInput.trim().length > 0;
    if (q.type === "single") return answers[q.id] !== undefined;
    if (q.type === "multi") return answers[q.id]?.length > 0;
    return false;
  };

  const transition = (fn) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 320);
  };

  const next = () => {
    if (!canProceed()) return;
    if (q.type === "text") setAnswers(a => ({ ...a, [q.id]: textInput }));
    setDirection("forward");
    if (current === QUESTIONS.length - 1) {
      const finalAnswers = q.type === "text" ? { ...answers, [q.id]: textInput } : answers;
      transition(() => onComplete(finalAnswers));
    } else {
      transition(() => setCurrent(c => c + 1));
    }
  };

  const back = () => {
    if (current === 0) return;
    setDirection("back");
    transition(() => setCurrent(c => c - 1));
  };

  const setSingle = v => setAnswers(a => ({ ...a, [q.id]: v }));
  const setMulti = v => setAnswers(a => {
    const cur = a[q.id] || [];
    if (v === "none") return { ...a, [q.id]: ["none"] };
    const filtered = cur.filter(x => x !== "none");
    return { ...a, [q.id]: filtered.includes(v) ? filtered.filter(x => x !== v) : [...filtered, v] };
  });

  useEffect(() => {
    if (q?.type === "text") setTextInput(answers[q.id] || "");
  }, [current]);

  return (
    <div style={S.shell}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .opt:hover{background:rgba(255,255,255,0.06)!important;border-color:var(--ac)!important;}
        .opt.sel{background:rgba(255,255,255,0.1)!important;border-color:var(--ac)!important;}
        .pill:hover:not(:disabled){opacity:.85;transform:translateY(-1px);}
        .pill:disabled{opacity:.3;cursor:not-allowed;}
        input:focus{outline:none;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#3a4a3a;border-radius:2px;}
      `}</style>

      {/* Progress */}
      <div style={S.progressTrack}>
        <div style={{ ...S.progressFill, width: `${progress}%`, background: accent }} />
      </div>

      <div style={{ ...S.categoryPill, color: accent, opacity: visible ? 1 : 0, transition: "opacity .32s" }}>
        {q.category}
      </div>
      <div style={S.counter}>{current + 1} / {QUESTIONS.length}</div>

      {/* Card */}
      <div style={{
        ...S.card,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : direction === "forward" ? "translateY(16px)" : "translateY(-16px)",
        transition: "opacity .32s ease, transform .32s ease",
      }}>
        <h2 style={S.qTitle}>{q.question}</h2>
        {q.subtitle && <p style={S.qSub}>{q.subtitle}</p>}

        {q.type === "text" && (
          <input
            autoFocus value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && canProceed() && next()}
            placeholder={q.placeholder}
            style={{ ...S.textInput, borderColor: textInput ? accent : "#2e3e2e" }}
          />
        )}

        {q.type === "single" && (
          <div style={S.optList}>
            {q.options.map(o => (
              <button key={o.value}
                className={`opt${answers[q.id] === o.value ? " sel" : ""}`}
                style={{ ...S.optBtn, "--ac": accent }}
                onClick={() => setSingle(o.value)}>
                {o.icon && <span style={{ color: accent, width: 22, textAlign: "center", flexShrink: 0 }}>{o.icon}</span>}
                <span style={S.optText}>{o.label}</span>
              </button>
            ))}
          </div>
        )}

        {q.type === "multi" && (
          <div style={S.optList}>
            {q.options.map(o => {
              const sel = (answers[q.id] || []).includes(o.value);
              return (
                <button key={o.value}
                  className={`opt${sel ? " sel" : ""}`}
                  style={{ ...S.optBtn, "--ac": accent }}
                  onClick={() => setMulti(o.value)}>
                  <span style={{
                    width: 18, height: 18, borderRadius: 4, border: `1px solid ${sel ? accent : "#2e3e2e"}`,
                    background: sel ? accent : "transparent", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0, transition: "all .15s"
                  }}>
                    {sel && <span style={{ color: "#111", fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </span>
                  <span style={S.optText}>{o.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ ...S.nav, opacity: visible ? 1 : 0, transition: "opacity .32s" }}>
        {current > 0 && (
          <button onClick={back} style={S.backBtn}>← Back</button>
        )}
        <button className="pill" onClick={next} disabled={!canProceed()}
          style={{ ...S.nextBtn, background: accent, marginLeft: current === 0 ? "auto" : undefined }}>
          {current === QUESTIONS.length - 1 ? "Reveal my profile →" : "Continue →"}
        </button>
      </div>

      <div style={S.botanical}>✦ ◈ ◎ ◇ ✦</div>
    </div>
  );
}

function HerbCard({ herb, rank, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const rankLabels = ["Primary", "Secondary", "Supporting"];
  const categoryLabels = { well_researched: "Well-researched", probable: "Probable adaptogen", possible: "Possible adaptogen" };
  const stimLabels = { calming: "Calming", mild: "Mild", moderate: "Moderate", stimulating: "Stimulating" };

  return (
    <div style={{
      ...HC.card,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity .5s ease, transform .5s ease",
      borderColor: open ? herb.colour : "rgba(255,255,255,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, cursor: "pointer" }}
        onClick={() => setOpen(!open)}>
        {/* Symbol */}
        <div style={{ ...HC.symbol, color: herb.colour, borderColor: herb.colour + "44" }}>
          {herb.symbol}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ ...HC.rankBadge, background: herb.colour + "22", color: herb.colour }}>
              {rankLabels[rank]}
            </span>
            <span style={HC.categoryBadge}>{categoryLabels[herb.category]}</span>
          </div>
          <h3 style={HC.herbName}>{herb.name}</h3>
          <p style={HC.botanical}>{herb.botanical}</p>
          <p style={HC.tagline}>{herb.tagline}</p>
        </div>
        <div style={{ ...HC.chevron, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
      </div>

      {open && (
        <div style={HC.expanded}>
          <div style={HC.divider} />
          <p style={HC.description}>{herb.description}</p>

          <div style={HC.section}>
            <p style={{ ...HC.sectionTitle, color: herb.colour }}>Best for</p>
            <ul style={HC.list}>
              {herb.bestFor.map((b, i) => (
                <li key={i} style={HC.listItem}>
                  <span style={{ color: herb.colour, marginRight: 8 }}>◦</span>{b}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={HC.pill}><span style={HC.pillLabel}>Stimulation</span><span style={{ color: herb.colour }}>{stimLabels[herb.stimulation]}</span></div>
            <div style={HC.pill}><span style={HC.pillLabel}>Temperature</span><span style={{ color: herb.colour, textTransform: "capitalize" }}>{herb.temperature.replace("_", " ")}</span></div>
          </div>

          {herb.cautions?.length > 0 && herb.cautions[0] !== "None likely at normal doses" && (
            <div style={HC.section}>
              <p style={{ ...HC.sectionTitle, color: "#c8a060" }}>Cautions</p>
              <ul style={HC.list}>
                {herb.cautions.map((c, i) => <li key={i} style={HC.listItem}><span style={{ color: "#c8a060", marginRight: 8 }}>⚠</span>{c}</li>)}
              </ul>
            </div>
          )}

          {herb.drugWarnings?.length > 0 && herb.drugWarnings[0] !== "No known interactions" && (
            <div style={{ ...HC.section, background: "rgba(200,160,96,0.06)", borderRadius: 8, padding: "10px 14px" }}>
              <p style={{ ...HC.sectionTitle, color: "#c8a060", marginBottom: 6 }}>Drug interactions to check</p>
              {herb.drugWarnings.map((w, i) => <p key={i} style={{ ...HC.listItem, fontSize: 12 }}>{w}</p>)}
            </div>
          )}

          <div style={{ ...HC.section, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 14px" }}>
            <p style={{ ...HC.sectionTitle, color: "#7a9a7a", marginBottom: 4 }}>Suggested dosage</p>
            <p style={{ fontSize: 12, color: "#8a9a8a", lineHeight: 1.6 }}>{herb.dosage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Results({ answers, onRestart }) {
  const { primary, nervine, hasDrugWarning } = matchHerbs(answers);
  const name = answers.name || "";
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={S.shell}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .restart:hover{opacity:.7;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#3a4a3a;border-radius:2px;}
      `}</style>

      <div style={{
        maxWidth: 560, width: "100%", margin: "0 auto",
        opacity: visible ? 1 : 0, transition: "opacity .6s ease",
        padding: "60px 20px 80px",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 20, letterSpacing: "0.2em", color: "#4a6a4a" }}>✦ ◈ ✦</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: "#e8ede8", lineHeight: 1.3, marginBottom: 12 }}>
            {name ? `Your profile, ${name}` : "Your adaptogen profile"}
          </h1>
          <p style={{ fontSize: 14, color: "#6a7a6a", lineHeight: 1.7, maxWidth: 420, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Based on your responses and David Winston's clinical herbal framework, these are the adaptogens most aligned with your constitution and current needs.
          </p>
        </div>

        {/* Drug interaction warning */}
        {hasDrugWarning && (
          <div style={{ background: "rgba(200,160,96,0.1)", border: "1px solid rgba(200,160,96,0.25)", borderRadius: 12, padding: "14px 18px", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
            <p style={{ fontSize: 13, color: "#c8a060", lineHeight: 1.6 }}>
              <strong>Important:</strong> You mentioned taking pharmaceutical medications. Please review the drug interactions listed in each herb card below, and consult a qualified herbalist or your prescribing physician before use.
            </p>
          </div>
        )}

        {/* Herb cards */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, color: "#4a6a4a", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            Your recommended adaptogens
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {primary.map((herb, i) => (
              <HerbCard key={herb.id} herb={herb} rank={i} delay={i * 150} />
            ))}
          </div>
        </div>

        {/* Nervine suggestion */}
        {nervine && (
          <div style={{
            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16, padding: "20px 22px", marginBottom: 32,
            opacity: visible ? 1 : 0, transition: "opacity .5s ease .55s",
          }}>
            <p style={{ fontSize: 11, color: "#7a9a7a", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              Nervine to combine with
            </p>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#e0e8e0", marginBottom: 4, fontWeight: 400 }}>
              {nervine.name}
            </h4>
            <p style={{ fontSize: 12, color: "#6a7a6a", marginBottom: 10, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>{nervine.botanical}</p>
            <p style={{ fontSize: 13, color: "#9aaa9a", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{nervine.reason}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, marginBottom: 32,
          opacity: visible ? 1 : 0, transition: "opacity .5s ease .7s",
        }}>
          <p style={{ fontSize: 12, color: "#4a5a4a", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, textAlign: "center" }}>
            These suggestions are based on David Winston's <em>Adaptogens</em> and are for educational purposes only. They are not a substitute for professional medical advice. Please consult a qualified herbalist or healthcare practitioner before beginning any herbal protocol.
          </p>
        </div>

        {/* Restart */}
        <div style={{ textAlign: "center" }}>
          <button className="restart" onClick={onRestart}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "10px 24px", color: "#5a7a5a", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", transition: "opacity .2s" }}>
            Start again
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [answers, setAnswers] = useState(null);

  return answers
    ? <Results answers={answers} onRestart={() => setAnswers(null)} />
    : <Questionnaire onComplete={setAnswers} />;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const S = {
  shell: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f1510 0%, #141c14 50%, #111812 100%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "60px 20px 100px",
    fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden",
  },
  progressTrack: { position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "#1a2a1a", zIndex: 100 },
  progressFill: { height: "100%", transition: "width .5s ease, background .5s ease" },
  categoryPill: { fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 24 },
  counter: { position: "fixed", top: 18, right: 22, fontSize: 11, color: "#3a5a3a", letterSpacing: "0.1em" },
  card: {
    width: "100%", maxWidth: 520,
    background: "rgba(20,28,20,0.8)", border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 20, padding: "36px 32px", backdropFilter: "blur(12px)",
    boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
  },
  qTitle: { fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: "#dde8dd", lineHeight: 1.4, marginBottom: 8 },
  qSub: { fontSize: 13, color: "#5a7a5a", lineHeight: 1.6, marginBottom: 24, fontWeight: 300 },
  textInput: {
    width: "100%", background: "transparent", border: "1px solid",
    borderRadius: 10, padding: "13px 16px", fontSize: 15, color: "#e0e8e0",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginTop: 20, transition: "border-color .2s",
  },
  optList: { display: "flex", flexDirection: "column", gap: 8, marginTop: 20 },
  optBtn: {
    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all .18s",
    fontFamily: "'DM Sans', sans-serif",
  },
  optText: { fontSize: 13, color: "#b0c0b0", fontWeight: 300, letterSpacing: "0.02em" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 520, marginTop: 20, gap: 12 },
  backBtn: { background: "transparent", border: "none", color: "#3a5a3a", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: "0.05em", padding: "10px 0", transition: "opacity .2s" },
  nextBtn: { padding: "12px 26px", border: "none", borderRadius: 50, fontSize: 13, fontWeight: 500, color: "#0f1510", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em", transition: "opacity .2s, transform .2s" },
  botanical: { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#243024", letterSpacing: "0.4em" },
};

const HC = {
  card: {
    background: "rgba(20,28,20,0.7)", border: "1px solid",
    borderRadius: 16, padding: "20px", transition: "border-color .3s",
    backdropFilter: "blur(8px)",
  },
  symbol: {
    width: 44, height: 44, borderRadius: "50%", border: "1px solid",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, flexShrink: 0,
  },
  rankBadge: { fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 4 },
  categoryBadge: { fontSize: 10, color: "#3a5a3a", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" },
  herbName: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#dde8dd", marginBottom: 2 },
  botanical: { fontSize: 11, color: "#4a6a4a", fontStyle: "italic", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" },
  tagline: { fontSize: 12, color: "#6a8a6a", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 },
  chevron: { color: "#3a5a3a", fontSize: 18, flexShrink: 0, transition: "transform .3s" },
  expanded: { marginTop: 16 },
  divider: { height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 16 },
  description: { fontSize: 13, color: "#8a9a8a", lineHeight: 1.7, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" },
  list: { listStyle: "none", display: "flex", flexDirection: "column", gap: 4 },
  listItem: { fontSize: 13, color: "#8a9a8a", lineHeight: 1.5, display: "flex", alignItems: "flex-start", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 },
  pill: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2 },
  pillLabel: { fontSize: 9, color: "#3a5a3a", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" },
};
