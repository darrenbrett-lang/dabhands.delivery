/**
 * The memory cards for /script.
 *
 * ⚠ DO NOT rewrite, tighten, polish, shorten or make this language more
 * presentational. These are not slogans and not a script. Each card carries
 * ALL the talking points for one set piece, so that a single glance loads the
 * whole thought and Darren can then look away from the screen and say it in
 * his own words:
 *
 *     GLANCE AT THE WHOLE CARD → LOAD THE THOUGHT → LOOK AWAY → TALK
 *
 * Because of that, every line has to stay on the card. If a card will not fit,
 * the type gets smaller (the page measures and scales it automatically) — the
 * content is never cut to make the type bigger.
 *
 * `label` is the section name, used for orientation and in the next-card
 * preview. `groups` are the talking points: lines inside a group belong to one
 * continuous thought and sit tight together, groups are separated by air.
 * `anchor` names the one line that carries the card, set larger and heavier.
 */

export interface Card {
  id: number;
  /** Section name. Orientation, not a talking point. */
  label: string;
  /** Talking points. Each inner array is one continuous thought. */
  groups: string[][];
  /** The line that carries the card. Must match a line in `groups` exactly. */
  anchor: string;
}

export const SCORE: Card[] = [
  {
    id: 1,
    label: 'Open',
    groups: [
      ['THANKS FOR CHECKING IN'],
      ['EASIEST WAY TO EXPLAIN WHAT I DO'],
      ['ALWAYS HAD A THING FOR', 'MAKING THINGS GO', 'AND WORK BETTER'],
    ],
    anchor: 'MAKING THINGS GO',
  },
  {
    id: 2,
    label: 'How I’m wired',
    groups: [
      ['MESSY · STUCK · COMPLICATED'],
      ['I WANT TO UNDERSTAND IT', 'WHAT’S ACTUALLY GOING ON?', 'GET IT MOVING'],
      ['THAT’S JUST HOW MY BRAIN WORKS'],
    ],
    anchor: 'WHAT’S ACTUALLY GOING ON?',
  },
  {
    id: 3,
    label: 'Been around',
    groups: [
      ['SOMEBODY HAS AN AMBITION', 'PEOPLE HAVE TO MAKE IT REAL'],
      ['BIG AGENCIES', 'MAJOR BRANDS', 'BUILT + RAN MY OWN', 'SEVEN YEARS'],
      ['SEEN IT FROM BOTH SIDES'],
    ],
    anchor: 'SEEN IT FROM BOTH SIDES',
  },
  {
    id: 4,
    label: 'Ambition outruns it',
    groups: [
      ['BUSINESSES DON’T RUN OUT OF GOOD IDEAS'],
      ['WHAT THEY’RE TRYING TO DO GETS BIGGER + FASTER', 'THAN THE WAY THE BUSINESS ACTUALLY WORKS'],
      ['THE OLD INFORMAL WAYS STOP BEING ENOUGH'],
      ['THAT’S THE MOMENT I RECOGNISE'],
    ],
    anchor: 'THAT’S THE MOMENT I RECOGNISE',
  },
  {
    id: 5,
    label: 'Get it moving',
    groups: [
      ['THAT’S WHERE I’M USEFUL'],
      [
        'COME INTO SOMETHING COMPLICATED',
        'UNDERSTAND WHAT’S REALLY HAPPENING',
        'FIND WHAT’S STUCK OR UNCLEAR',
        'GET PEOPLE ALIGNED',
        'CREATE MOVEMENT',
      ],
      ['NOT THEORY', 'MAKE THE THING GO'],
    ],
    anchor: 'MAKE THE THING GO',
  },
  {
    id: 6,
    label: 'Don’t kill the good bit',
    groups: [
      ['BETTER ORGANISED ≠ CORPORATE', 'NOT SLOW', 'NOT BLAND'],
      ['MAKE THE BUSINESS MORE CAPABLE', 'WITHOUT FLATTENING'],
      ['THE INSTINCT', 'THE ENERGY', 'THE CHARACTER'],
      ['WHAT MADE IT GOOD IN THE FIRST PLACE'],
    ],
    anchor: 'WITHOUT FLATTENING',
  },
  {
    id: 7,
    label: 'The work has to work',
    groups: [
      ['NOT EFFICIENT MACHINERY FOR ITS OWN SAKE'],
      ['GET THE BEST WORK OUT', 'REACH THE CUSTOMER', 'MAKE THEM FEEL SOMETHING', 'MAKE THEM ACT'],
      ['ULTIMATELY', 'IT HAS TO SELL'],
    ],
    anchor: 'IT HAS TO SELL',
  },
  {
    id: 8,
    label: 'Close',
    groups: [
      ['SO YEAH', 'THAT’S KIND OF WHERE I COME IN'],
      ['SOMETHING IMPORTANT', 'YOU’RE TRYING TO GET MOVING'],
      ['I’D LOVE TO HAVE A CHAT'],
    ],
    anchor: 'THAT’S KIND OF WHERE I COME IN',
  },
];
