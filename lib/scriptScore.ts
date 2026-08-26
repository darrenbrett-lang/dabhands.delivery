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
    fullText: ['Hi, I’m **Darren**. ↓ ○○'],
    cueText: ['HI, I’M DARREN.'],
    voiceDirection: 'Warm eye contact. This should feel like meeting somebody, not beginning a presentation.',
    speakDuration: 1.5,
    holdDuration: 0.8,
  },
  {
    id: 2,
    beat: 'ORIGIN',
    intent: 'REFLECTIVE',
    fullText: ['Man and boy... →', 'I’ve been understanding how to make things **go** ↑', 'and work **better**. ↓ ○○'],
    cueText: ['MAN AND BOY…', 'make things go', 'work better'],
    voiceDirection: '“Man and boy” should feel remembered rather than announced. “Better” resolves the thought.',
    speakDuration: 5.0,
    holdDuration: 0.8,
  },
  {
    id: 3,
    beat: 'STRENGTH',
    intent: 'ASSURED',
    fullText: ['I’m good at holding a lot of **moving parts** →', 'and knowing **where every one of them is**. ↓ ○'],
    cueText: ['HOLDING MOVING PARTS…', 'where every one is'],
    voiceDirection: 'Understated confidence. Description rather than boast.',
    speakDuration: 5.0,
    holdDuration: 0.6,
  },
  {
    id: 4,
    beat: 'THINKING STYLE',
    intent: 'PLAIN',
    fullText: ['I bring **both sides of the brain** →', 'to work in **equal measure**. ↓ ○'],
    cueText: ['BOTH SIDES…', 'equal measure'],
    voiceDirection: 'Matter-of-fact. Do not make “both sides of the brain” sound clever.',
    speakDuration: 3.5,
    holdDuration: 0.6,
  },
  {
    id: 5,
    beat: 'RESULT',
    intent: 'ENERGY',
    fullText: ['I move from **logic** →', 'to **vision** ↑ fast. ○', 'Which makes me a great **problem solver**. ↓↓ ○○'],
    cueText: ['LOGIC → VISION, FAST…', 'problem solver'],
    voiceDirection: 'A small natural acceleration on “fast” is okay. Settle immediately afterwards. Land “problem solver”.',
    speakDuration: 4.5,
    holdDuration: 0.8,
  },
  {
    id: 6,
    beat: 'EXPERIENCE',
    intent: 'AUTHORITY',
    fullText: ['I’ve spent my working life →', 'where **ambition** has to become **reality**. ↓ ○'],
    cueText: ['WORKING LIFE…', 'ambition → reality'],
    voiceDirection: 'Subtle contrast between ambition and reality. Do not overemphasise.',
    speakDuration: 4.0,
    holdDuration: 0.7,
  },
  {
    id: 7,
    beat: 'SCALE',
    intent: 'PLAIN',
    fullText: ['**Tier-one** agencies. ○', 'Working at **scale** →', 'with **major brands**. ↓'],
    cueText: ['TIER-ONE…', 'scale', 'major brands'],
    voiceDirection: 'Underplay status. The facts confer credibility.',
    speakDuration: 3.0,
    holdDuration: 0.6,
  },
  {
    id: 8,
    beat: 'FOUNDER',
    intent: 'MATTER-OF-FACT',
    fullText: ['Then I **co-founded** an agency of my own →', 'and ran **ops** for **seven years**. ↓ ○'],
    cueText: ['CO-FOUNDED…', 'ops, seven years'],
    voiceDirection: 'Deliberately understated.',
    speakDuration: 4.0,
    holdDuration: 0.6,
  },
  {
    id: 9,
    beat: 'COMMERCIAL CREDIBILITY',
    intent: 'CERTAIN',
    fullText: ['I’ve carried the **P&L** →', 'as well as the **plan**. ↓↓ ○○'],
    cueText: ['CARRIED THE P&L…', 'as well as the plan'],
    voiceDirection: '“Plan” is the landing point, not P&L. Give the thought room afterwards.',
    speakDuration: 3.0,
    holdDuration: 1.0,
  },
  {
    id: 10,
    beat: 'OBSERVATION',
    intent: 'REFLECTIVE',
    fullText: ['Here’s what I **notice**... ↓', '○○'],
    cueText: ['HERE’S WHAT I NOTICE…'],
    voiceDirection:
      'The major pivot in the film. Direct eye contact. Do not hurry into the next sentence. The silence creates authority.',
    speakDuration: 1.5,
    holdDuration: 1.3,
  },
  {
    id: 11,
    beat: 'TRUTH',
    intent: 'CERTAIN',
    fullText: ['Organisations **don’t lack** →', '**good thinking**. ↓ ○'],
    cueText: ['DON’T LACK…', 'good thinking'],
    voiceDirection: 'Conversational certainty. The implied thought is: “That isn’t actually the problem.”',
    speakDuration: 2.8,
    holdDuration: 0.7,
  },
  {
    id: 12,
    beat: 'REAL PROBLEM',
    intent: 'CONCERNED',
    fullText: ['They struggle to **preserve its impact** →', 'on the **way out**. ↓ ○'],
    cueText: ['PRESERVE ITS IMPACT…', 'on the way out'],
    voiceDirection: 'Slight gravity. No drama.',
    speakDuration: 3.5,
    holdDuration: 0.7,
  },
  {
    id: 13,
    beat: 'INSIGHT',
    intent: 'CERTAIN',
    fullText: ['It gets **traded away** →', 'in **systems** and **misalignments**. ↓↓', '○○'],
    cueText: ['IT GETS TRADED AWAY…', 'systems', 'misalignments'],
    voiceDirection: 'This is the diagnosis. Give it space. Do not rush onwards.',
    speakDuration: 3.5,
    holdDuration: 1.2,
  },
  {
    id: 14,
    beat: 'CAPABILITY',
    intent: 'ASSURED',
    fullText: [
      'I know what it takes ↑',
      'to build the **operating system** of a business →',
      'and keep the work **flowing**',
      '**cleanly** through it. ↓↓',
      '○',
    ],
    cueText: ['I KNOW WHAT IT TAKES…', 'operating system', 'flowing cleanly'],
    voiceDirection:
      'Potentially the most authoritative line in the film. Authority should come from slowing down, not getting louder.',
    speakDuration: 6.0,
    holdDuration: 0.8,
  },
  {
    id: 15,
    beat: 'PIVOT',
    intent: 'LIGHT',
    fullText: ['But I don’t just sweat the **mechanics**. ↓ ○'],
    cueText: ['BUT NOT JUST MECHANICS…'],
    voiceDirection: 'Keep “But”. This introduces another dimension. A very slight natural smile is okay.',
    speakDuration: 2.5,
    holdDuration: 0.7,
  },
  {
    id: 16,
    beat: 'BELIEF',
    intent: 'ENGAGED',
    fullText: ['I care about the work →', 'making people **feel** ↑', 'and **act**. ↓', '○'],
    cueText: ['MAKING PEOPLE…', 'feel', 'act'],
    voiceDirection: '“Feel” opens the thought. “Act” completes it.',
    speakDuration: 3.8,
    holdDuration: 0.7,
  },
  {
    id: 17,
    beat: 'COMMERCIAL TRUTH',
    intent: 'DRY',
    fullText: ['That’s not just **nicer**... →', '○', 'It **sells**. ↓↓', '○○'],
    cueText: ['NOT JUST NICER…', 'it sells'],
    voiceDirection:
      'Important moment. Almost throw away “That’s not just nicer”. Then direct eye contact for “It sells.” No sales voice. Just fact.',
    speakDuration: 2.8,
    holdDuration: 1.1,
  },
  {
    id: 18,
    beat: 'INVITATION',
    intent: 'OPEN',
    fullText: ['If something important **isn’t landing**... →', 'let’s **talk**. ↓ ○'],
    cueText: ['ISN’T LANDING…', 'let’s talk'],
    voiceDirection:
      'Return to warmth. The argument is finished. Now you are talking directly to somebody who might need you.',
    speakDuration: 3.5,
    holdDuration: 0.8,
  },
  {
    id: 19,
    beat: 'REMOVE THE RISK',
    intent: 'RELAXED',
    fullText: ['**Start small**. ↓ ○', '**No big bet**. ↓ ○○'],
    cueText: ['START SMALL…', 'no big bet'],
    voiceDirection: 'Tiny natural smile is okay. Relaxed and confident.',
    speakDuration: 2.2,
    holdDuration: 0.8,
  },
  {
    id: 20,
    beat: 'VALUE',
    intent: 'QUIETLY CERTAIN',
    fullText: ['I work for **impact** →', 'not to **burn hours**. ↓↓', '○○'],
    cueText: ['FOR IMPACT…', 'not burn hours'],
    voiceDirection: 'Not aggressive. Not an attack on consultants. Simply a statement about how you work.',
    speakDuration: 3.0,
    holdDuration: 1.2,
  },
  {
    id: 21,
    beat: 'CLOSE',
    intent: 'HUMAN',
    fullText: ['If useful... →', '○', 'I’d love to **hear from you**. ↓'],
    cueText: ['IF USEFUL…', 'hear from you'],
    voiceDirection:
      'After the words finish, hold for the full two seconds. The system is deliberately keeping you looking into the lens.',
    speakDuration: 2.8,
    holdDuration: 2.0,
  },
];

/** The arc, for the setup screen. Card 10 is the pivot. */
export const ARC = 'WARM → ASSURED → CREDIBLE → REFLECTIVE → INCISIVE → AUTHORITATIVE → ENGAGED → COMMERCIAL → WARM';
