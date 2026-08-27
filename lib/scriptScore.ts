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
    fullText: ['Hi, I’m **Darren**. ↓ ○'],
    cueText: ['HI · DARREN'],
    voiceDirection: 'Simple hello. No presenter voice. Warm eye contact.',
    speakDuration: 1.5,
    holdDuration: 0.7,
  },
  {
    id: 2,
    beat: 'ORIGIN',
    intent: 'REFLECTIVE',
    fullText: ['Man and boy... →', 'I’ve been working out how to make things **go** →', 'and work **better**. ↓ ○○'],
    cueText: ['MAN AND BOY', 'GO → BETTER'],
    voiceDirection:
      '“Man and boy” should feel almost remembered. “Working out” should feel practical rather than intellectual. Land “better”.',
    speakDuration: 5.0,
    holdDuration: 0.8,
  },
  {
    id: 3,
    beat: 'STRENGTH',
    intent: 'ASSURED',
    fullText: ['I’m good at holding a lot of **moving parts** →', 'and knowing **where every one of them is**. ↓ ○○'],
    cueText: ['MOVING PARTS', 'EVERY ONE'],
    voiceDirection: 'Matter-of-fact self-knowledge. No boast.',
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
      'This establishes the environment in which I learned my craft. Subtle contrast between ambition and reality.',
    speakDuration: 3.8,
    holdDuration: 0.6,
  },
  {
    id: 5,
    beat: 'SCALE',
    intent: 'PLAIN',
    fullText: ['Inside **tier-one** agencies,', 'at **scale**,', 'with **major brands**. ↓ ○'],
    cueText: ['TIER-ONE', 'SCALE · MAJOR BRANDS'],
    voiceDirection: 'Underplay this. The facts provide the status.',
    speakDuration: 3.0,
    holdDuration: 0.6,
  },
  {
    id: 6,
    beat: 'FOUNDER',
    intent: 'MATTER-OF-FACT',
    fullText: ['Then I **co-founded** an agency of my own →', 'and ran it for **seven years**. ↓'],
    cueText: ['CO-FOUNDED', 'SEVEN YEARS'],
    voiceDirection: 'Again, deliberately understated.',
    speakDuration: 3.8,
    holdDuration: 0.6,
  },
  {
    id: 7,
    beat: 'COMMERCIAL',
    intent: 'CERTAIN',
    fullText: ['So I’ve carried the **P&L** →', 'as well as the **plan**. ↓↓ ○○'],
    cueText: ['P&L → PLAN'],
    voiceDirection: '“Plan” is the landing point. Do not overplay P&L.',
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
      'Major narrative pivot. Direct eye contact. Do not hurry onwards. The silence is intentional.',
    speakDuration: 1.5,
    holdDuration: 1.3,
  },
  {
    id: 9,
    beat: 'TRUTH',
    intent: 'CERTAIN',
    fullText: ['Organisations **rarely lack** →', '**good thinking**. ↓'],
    cueText: ['RARELY LACK', 'GOOD THINKING'],
    voiceDirection:
      'Conversational certainty. The implied thought is: “That usually isn’t the real problem.” “Rarely” rather than “don’t”: it makes the statement feel more thoughtful and less absolute.',
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
      'One of the most important lines in the film. “Ambition starts moving faster than the way the business works” should feel like the central insight. Do not rush it. Subtle emphasis: ambition, moving faster, works. It has to work for both audiences: for founders, growth has outpaced the operating model; for marketing leaders, strategy and ambition are moving faster than the organisation can execute.',
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
    cueText: ['TRADED AWAY', 'SYSTEMS · MISALIGNMENTS', 'NOBODY MANAGING'],
    voiceDirection:
      'The consequence of the previous card. Do not make “systems and misalignments” the main point. The strongest phrase is “nobody is managing.” That should land. The deeper insight is that nobody owns the joins.',
    speakDuration: 4.2,
    holdDuration: 1.2,
  },
  {
    id: 12,
    beat: 'WHAT I DO',
    intent: 'ASSURED',
    fullText: ['People bring me in →', 'to keep **important work moving**. ↓'],
    cueText: ['BRING ME IN', 'KEEP IT MOVING'],
    voiceDirection: 'Plain and confident. This should not sound like a slogan. It is simply what happens.',
    speakDuration: 3.0,
    holdDuration: 0.6,
  },
  {
    id: 13,
    beat: 'THROUGH-LINE',
    intent: 'REASSURING',
    fullText: [
      'Out of the **strategy** →',
      'through the **system** →',
      'and all the way to the **customer**. ↓ ○',
      'Without **flattening** →',
      'what made it **good in the first place**. ↓↓ ○○',
    ],
    cueText: ['STRATEGY → SYSTEM → CUSTOMER', 'WITHOUT FLATTENING', 'WHAT MADE IT GOOD'],
    voiceDirection:
      'This card does two jobs. First the through-line: strategy, system, customer. Then the energy changes slightly for “Without flattening what made it good in the first place.” That line matters most for founder trust: operating discipline is not corporatisation, structure is not bureaucracy, improvement does not mean destroying the character, speed or instinct that made the business successful. Do not make it sentimental. Plain, calm and confident, so the reassurance feels earned rather than salesy. The breath before “Without” is marked on the customer line rather than given a line of its own: at six lines this card pushed reading text to 91% of viewport height on a 720px screen, past the point where the eyes visibly drop.',
    speakDuration: 6.5,
    holdDuration: 1.2,
  },
  {
    id: 14,
    beat: 'PROOF',
    intent: 'MATTER-OF-FACT',
    fullText: ['I’ve walked into **programmes** →', 'where nobody could say', '**where they stood**. ↓ ○'],
    cueText: ['PROGRAMMES', 'WHERE THEY STOOD'],
    voiceDirection: 'No drama. Simply establish the before-state.',
    speakDuration: 4.0,
    holdDuration: 0.8,
  },
  {
    id: 15,
    beat: 'CHANGE',
    intent: 'QUIET CONFIDENCE',
    fullText: ['**Six weeks** later...', '○○'],
    cueText: ['SIX WEEKS LATER'],
    voiceDirection: 'This should stand completely alone. Do not rush it. It creates anticipation for the outcome.',
    speakDuration: 1.5,
    holdDuration: 1.1,
  },
  {
    id: 16,
    beat: 'RESULT',
    intent: 'CERTAIN',
    fullText: ['there’s a **number** →', 'and a **decision**', 'people can actually **make**. ↓↓ ○○'],
    cueText: ['NUMBER → DECISION → MAKE'],
    voiceDirection:
      'Underplay this. The power comes from specificity. Subtle emphasis on number, decision, make. Do not sound triumphant. This is simply what changed.',
    speakDuration: 3.8,
    holdDuration: 1.1,
  },
  {
    id: 17,
    beat: 'BEYOND OPERATIONS',
    intent: 'LIGHT',
    fullText: ['But I don’t just sweat the **mechanics**. ↓ ○'],
    cueText: ['NOT JUST MECHANICS'],
    voiceDirection:
      'Keep “But”. It signals that there is another dimension to you. A very slight natural smile is okay.',
    speakDuration: 2.5,
    holdDuration: 0.7,
  },
  {
    id: 18,
    beat: 'EFFECT',
    intent: 'ENGAGED',
    fullText: ['I care about the work →', 'making people **feel** →', 'and **act**. ↓ ○'],
    cueText: ['FEEL → ACT'],
    voiceDirection: '“Feel” opens the idea. “Act” completes it. Keep it human rather than advertising-theoretical.',
    speakDuration: 3.5,
    holdDuration: 0.7,
  },
  {
    id: 19,
    beat: 'COMMERCIAL EFFECT',
    intent: 'DRY',
    fullText: ['That’s not just **nicer**... →', '○', 'it **sells**. ↓↓ ○○'],
    cueText: ['NOT JUST NICER', 'IT SELLS'],
    voiceDirection:
      'One of the important landing moments. Almost throw away “That’s not just nicer.” Then “It sells.” Direct eye contact. No sales voice. Just fact.',
    speakDuration: 2.8,
    holdDuration: 1.1,
  },
  {
    id: 20,
    beat: 'INVITATION',
    intent: 'OPEN',
    fullText: ['If something important **isn’t landing**... →', 'let’s **talk**. ↓'],
    cueText: ['IMPORTANT NOT LANDING', 'LET’S TALK'],
    voiceDirection: 'Warm. Direct. No pitch.',
    speakDuration: 3.0,
    holdDuration: 0.7,
  },
  {
    id: 21,
    beat: 'LOW RISK',
    intent: 'RELAXED',
    fullText: ['**Start small**. ↓ ○', '**No big bet**. ↓ ○○'],
    cueText: ['START SMALL', 'NO BIG BET'],
    voiceDirection: 'Relaxed confidence. A tiny natural smile is fine.',
    speakDuration: 2.2,
    holdDuration: 0.8,
  },
  {
    id: 22,
    beat: 'VALUE',
    intent: 'QUIETLY CERTAIN',
    fullText: ['I work for **impact** →', 'not to **burn hours**. ↓↓ ○○'],
    cueText: ['IMPACT → NOT HOURS'],
    voiceDirection:
      'Not aggressive. Not a criticism of other consultants. Simply a statement about how you work.',
    speakDuration: 3.0,
    holdDuration: 1.2,
  },
  {
    id: 23,
    beat: 'CLOSE',
    intent: 'WARM',
    fullText: ['I’d love to **hear from you**. ↓'],
    cueText: ['LOVE TO HEAR FROM YOU'],
    voiceDirection:
      'Simple and human. After the words finish, do nothing. Maintain eye contact with the lens. Do not nod, do not look at the laptop, do not reach towards anything. Hold for the full two seconds.',
    speakDuration: 2.2,
    holdDuration: 2.0,
  },
];

/** The arc, for the setup screen. Card 8 is the pivot. */
export const ARC =
  'WARM → PRACTICAL → CREDIBLE → REFLECTIVE → DIAGNOSTIC → ASSURED → EVIDENCE → HUMAN → COMMERCIAL → WARM';
