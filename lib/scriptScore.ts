/**
 * The performance score for /script.
 *
 * Structured data, deliberately not baked into the UI, so timings and wording
 * can be edited on the page (and persisted to localStorage) without touching
 * component code.
 *
 * Line markup, kept plain-text so it survives editing:
 *   **word**  semantic emphasis — the thought word
 *   ↑         slight vocal lift / opening thought
 *   ↓         land the thought
 *   ↓↓        strong landing
 *   →         carry the thought forward
 *   ○         small breath
 *   ○○        proper pause, leave space
 *
 * The arrows and circles are coaching marks, not script: they render small and
 * dim, and disappear entirely with VOICE GUIDES off.
 *
 * ⚠ Editing the words here does NOT update the film's captions.
 * public/captions/intro-en.vtt is generated from this file; regenerate it on
 * any script change or the captions will speak lines that no longer exist.
 *
 * ⚠ Five lines is the ceiling for fullText. Six lines of 64px type runs the
 * reading text to 91% of viewport height at 1280x720, past the point where the
 * eyes visibly drop on camera. Split the thought across two cards instead.
 */

export interface Card {
  id: number;
  beat: string;
  intent: string;
  /** Delivery lines. Line breaks are breathing marks, so they are rendered. */
  fullText: string[];
  /** Anchors only — enough to reconstruct the sentence, not to read it. */
  cueText: string[];
  /** Director's note. Shown in setup and edit, never during a take. */
  voiceDirection: string;
  speakDuration: number;
  holdDuration: number;
}

export const SCORE: Card[] = [
  {
    id: 1,
    beat: 'INTRO',
    intent: 'WARM',
    fullText: ['Hi, I’m **Darren**. ↓ ○'],
    cueText: ['HI · DARREN'],
    voiceDirection:
      'Simple hello. Warm eye contact. This is meeting someone, not beginning a presentation. No presenter voice.',
    speakDuration: 1.5,
    holdDuration: 0.7,
  },
  {
    id: 2,
    beat: 'INSTINCT',
    intent: 'NATURAL',
    fullText: ['I’ve always had a **thing** →', 'for making things **go** →', 'and work **better**. ↓ ○○'],
    cueText: ['ALWAYS HAD A THING', 'GO → BETTER'],
    voiceDirection:
      'Extremely natural. “I’ve always had a thing for…” should feel almost thrown away. Do not perform the phrase. The progression is thing, go, better: “go” means making things happen, “better” means improving how they work. The subtext is simply “this is how I’ve always been wired”.',
    speakDuration: 4.2,
    holdDuration: 0.8,
  },
  {
    id: 3,
    beat: 'STRENGTH',
    intent: 'ASSURED',
    fullText: ['I’m good at holding a lot of **moving parts** →', 'and knowing **where every one of them is**. ↓ ○○'],
    cueText: ['MOVING PARTS', 'EVERY ONE'],
    voiceDirection:
      'Matter-of-fact self-knowledge. No boast. It should sound like something you have learned about yourself over time.',
    speakDuration: 4.5,
    holdDuration: 0.7,
  },
  {
    id: 4,
    beat: 'EXPERIENCE',
    intent: 'AUTHORITY',
    fullText: ['I’ve spent my working life →', 'where **ambition** has to become **reality**. ↓ ○'],
    cueText: ['AMBITION → REALITY'],
    voiceDirection:
      'This establishes the environment in which you learned your craft. Subtle contrast between ambition and reality. Do not hammer the words.',
    speakDuration: 3.8,
    holdDuration: 0.6,
  },
  {
    id: 5,
    beat: 'SCALE',
    intent: 'PLAIN',
    fullText: ['Inside **tier-one** agencies,', 'at **scale**,', 'with **major brands**. ↓ ○'],
    cueText: ['TIER-ONE', 'SCALE · MAJOR BRANDS'],
    voiceDirection: 'Underplay this. The facts confer credibility. No CV voice.',
    speakDuration: 3.0,
    holdDuration: 0.6,
  },
  {
    id: 6,
    beat: 'FOUNDER',
    intent: 'MATTER-OF-FACT',
    fullText: ['Then I **co-founded** an agency of my own →', 'and ran it for **seven years**. ↓'],
    cueText: ['CO-FOUNDED', 'SEVEN YEARS'],
    voiceDirection: 'Deliberately understated. Important founder credibility, but do not sell it.',
    speakDuration: 3.8,
    holdDuration: 0.6,
  },
  {
    id: 7,
    beat: 'COMMERCIAL',
    intent: 'CERTAIN',
    fullText: ['So I’ve carried the **P&L** →', 'as well as the **plan**. ↓↓ ○○'],
    cueText: ['P&L → PLAN'],
    voiceDirection:
      '“Plan” is the landing point, not P&L. The point is that you understand both the thinking and the responsibility for the outcome.',
    speakDuration: 2.8,
    holdDuration: 1.0,
  },
  {
    id: 8,
    beat: 'OBSERVATION',
    intent: 'REFLECTIVE',
    fullText: ['Here’s what I **notice**. ↓', '○○'],
    cueText: ['HERE’S WHAT I NOTICE'],
    voiceDirection:
      'Major narrative pivot. Direct eye contact. Do not hurry into the answer. The silence creates authority.',
    speakDuration: 1.5,
    holdDuration: 1.3,
  },
  {
    id: 9,
    beat: 'TRUTH',
    intent: 'CERTAIN',
    fullText: ['Organisations **rarely lack** →', '**good thinking**. ↓'],
    cueText: ['RARELY LACK', 'GOOD THINKING'],
    voiceDirection: 'Conversational certainty. Subtext: “That usually isn’t the actual problem.”',
    speakDuration: 2.5,
    holdDuration: 0.6,
  },
  {
    id: 10,
    beat: 'CORE DIAGNOSIS',
    intent: 'INCISIVE',
    fullText: [
      'They get into trouble →',
      'when **ambition** starts **moving faster** →',
      'than the way the business **works**. ↓↓ ○○',
    ],
    cueText: ['AMBITION', 'MOVING FASTER', 'THAN THE BUSINESS WORKS'],
    voiceDirection:
      'One of the central lines of the film. The progression is ambition, moving faster, works. For a founder this means growth has outpaced the operating model; for a marketing leader it means ambition and strategy are moving faster than the organisation can execute. Do not explain that distinction in the film. The line should encompass both on its own.',
    speakDuration: 4.5,
    holdDuration: 1.0,
  },
  {
    id: 11,
    beat: 'CONSEQUENCE',
    intent: 'INCISIVE',
    fullText: [
      'Good thinking gets **traded away** →',
      'in systems and misalignments →',
      '**nobody is managing**. ↓↓ ○○',
    ],
    cueText: ['GOOD THINKING', 'TRADED AWAY', 'NOBODY MANAGING'],
    voiceDirection:
      'The important phrase is “nobody is managing”. The deeper diagnosis is that nobody owns the joins. Allow that thought to land.',
    speakDuration: 4.2,
    holdDuration: 1.2,
  },
  {
    id: 12,
    beat: 'WHAT I DO',
    intent: 'ASSURED',
    fullText: ['People bring me in →', 'to keep **important work moving**. ↓'],
    cueText: ['BRING ME IN', 'KEEP IT MOVING'],
    voiceDirection: 'Plain. Confident. This is not a slogan. It is simply what people bring you in to do.',
    speakDuration: 3.0,
    holdDuration: 0.6,
  },
  {
    id: 13,
    beat: 'THROUGH-LINE',
    intent: 'PURPOSEFUL',
    fullText: ['Out of the **strategy** →', 'through the **system** →', 'and all the way to the **customer**. ↓ ○'],
    cueText: ['STRATEGY → SYSTEM → CUSTOMER'],
    voiceDirection:
      'Deliberate three-stage progression: strategy, system, customer. Let each stage register. This is the simplest articulation of the territory you operate across.',
    speakDuration: 4.2,
    holdDuration: 0.7,
  },
  {
    id: 14,
    beat: 'REASSURANCE',
    intent: 'CALM',
    fullText: ['Without **flattening** →', 'what made it **good in the first place**. ↓↓ ○○'],
    cueText: ['WITHOUT FLATTENING', 'WHAT MADE IT GOOD'],
    voiceDirection:
      'Especially important for the founder audience. The unspoken reassurance is that operating discipline does not mean corporatisation, structure does not mean bureaucracy, and making a business more capable does not mean destroying its speed, instinct, character or magic. Do not explain any of that. Simply say the line. No sentimentality.',
    speakDuration: 3.5,
    holdDuration: 1.1,
  },
  {
    id: 15,
    beat: 'PROOF',
    intent: 'MATTER-OF-FACT',
    fullText: ['I’ve walked into **programmes** →', 'where nobody could say', '**where they stood**. ↓ ○'],
    cueText: ['PROGRAMMES', 'WHERE THEY STOOD'],
    voiceDirection: 'No drama. Simply establish the before-state.',
    speakDuration: 4.0,
    holdDuration: 0.8,
  },
  {
    id: 16,
    beat: 'CHANGE',
    intent: 'QUIET CONFIDENCE',
    fullText: ['**Six weeks** later...', '○○'],
    cueText: ['SIX WEEKS LATER'],
    voiceDirection:
      'This stands alone. Do not rush it. No triumph. The hold is deliberately halved (owner call, 28 Aug): the pause before the outcome is now a beat, not a wait, so “six weeks later” hands straight over to the number.',
    speakDuration: 1.5,
    holdDuration: 0.55,
  },
  {
    id: 17,
    beat: 'RESULT',
    intent: 'CERTAIN',
    fullText: ['there’s a **number** →', 'and a **decision**', 'people can actually **make**. ↓↓ ○○'],
    cueText: ['NUMBER → DECISION → MAKE'],
    voiceDirection:
      'The progression is number, decision, make. Underplay the whole thing. Specificity provides the power.',
    speakDuration: 3.8,
    holdDuration: 1.1,
  },
  {
    id: 18,
    beat: 'BEYOND OPERATIONS',
    intent: 'LIGHT',
    fullText: ['But I don’t just sweat the **mechanics**. ↓ ○'],
    cueText: ['NOT JUST MECHANICS'],
    voiceDirection: 'Keep “But”. It introduces another dimension. A tiny natural smile is okay.',
    speakDuration: 2.5,
    holdDuration: 0.7,
  },
  {
    id: 19,
    beat: 'QUALITY',
    intent: 'ENGAGED',
    fullText: ['I care about getting →', 'the **best work out**. ↓ ○'],
    cueText: ['BEST WORK OUT'],
    voiceDirection:
      'Practical language, not marketing language. This connects operational quality directly to the quality of the output. The machine is not the destination. The work is.',
    speakDuration: 2.8,
    holdDuration: 0.6,
  },
  {
    id: 20,
    beat: 'CUSTOMER EFFECT',
    intent: 'ENGAGED',
    fullText: ['Work that makes customers →', '**feel something** →', 'and **act**. ↓ ○○'],
    cueText: ['WORK → FEEL → ACT'],
    voiceDirection:
      'The progression is work, feel, act. “Feel something” should sound human, not theoretical. “Act” completes the thought.',
    speakDuration: 3.3,
    holdDuration: 0.8,
  },
  {
    id: 21,
    beat: 'COMMERCIAL EFFECT',
    intent: 'DRY',
    fullText: ['Because ultimately... →', 'it **has to sell**. ↓↓ ○○'],
    cueText: ['ULTIMATELY', 'HAS TO SELL'],
    voiceDirection:
      'Almost throw away “Because ultimately…”. Then “it has to sell.” Direct eye contact. No sales voice. No theatrical punch. Simply commercial reality.',
    speakDuration: 2.5,
    holdDuration: 1.1,
  },
  {
    id: 22,
    beat: 'INVITATION',
    intent: 'OPEN',
    fullText: ['If something important **isn’t landing**... →', 'let’s **talk**. ↓'],
    cueText: ['IMPORTANT NOT LANDING', 'LET’S TALK'],
    voiceDirection: 'Warm. Direct. No pitch.',
    speakDuration: 3.0,
    holdDuration: 0.7,
  },
  {
    id: 23,
    beat: 'VALUE',
    intent: 'QUIETLY CERTAIN',
    fullText: ['I work for **impact** →', 'not to burn **hours**. ↓↓ ○○'],
    cueText: ['IMPACT → NOT HOURS'],
    voiceDirection:
      'Quiet certainty. Not aggressive, and not a criticism of consultants or time-based billing. Simply a statement about how you approach an engagement. Land on “impact” as the important idea: “not to burn hours” is the contrast, not the punchline.',
    speakDuration: 3.0,
    holdDuration: 1.2,
  },
  {
    id: 24,
    beat: 'CLOSE',
    intent: 'WARM',
    fullText: ['I’d love to **hear from you**. ↓'],
    cueText: ['LOVE TO HEAR FROM YOU'],
    voiceDirection:
      'Simple. Human. Warm. After the line, do nothing. Maintain natural eye contact with the lens. Do not nod, do not look at the laptop, do not reach for anything, do not make a “finished” expression. Hold for the full two seconds.',
    speakDuration: 2.2,
    holdDuration: 2.0,
  },
];

/** The arc, for the setup screen. Card 8 is the pivot. */
export const ARC =
  'WARM → NATURAL → ASSURED → CREDIBLE → REFLECTIVE → INCISIVE → PRACTICAL → REASSURING → EVIDENCE-LED → QUALITY-DRIVEN → COMMERCIAL → HUMAN';
