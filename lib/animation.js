const { getRandomEvent } = require('./events.js');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearScreen() {
  if (process.stdout.isTTY) {
    process.stdout.write('\x1b[2J\x1b[H');
  } else {
    process.stdout.write('\n'.repeat(20));
  }
}

function printFrame(lines) {
  process.stdout.write(lines.join('\n') + '\n');
}

async function playFrames(frames, delay) {
  for (const frame of frames) {
    clearScreen();
    printFrame(frame);
    await sleep(delay);
  }
}

// --- Frame data ---

const openingFrame = [
  '',
  '  You step outside...',
  '',
  '        ☀',
  '  🌳  🌳  🌳',
  '',
];

const walkingFrames = [
  [
    '',
    '',
    '',
    '  🚶',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '',
    '        🚶',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '',
    '             🚶',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '',
    '                 🚶',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '              You see some grass...',
    '                 🚶',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

const touchingFrames = [
  [
    '',
    '              You kneel down...',
    '',
    '                \\o/',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '',
    '                \\o',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '              * touches grass *',
    '                _o_/',
    '              🌱 🌱 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

async function parkAnimation() {
  // Opening
  clearScreen();
  printFrame(openingFrame);
  await sleep(1200);

  // Walking
  await playFrames(walkingFrames, 450);

  // Touching grass
  await playFrames(touchingFrames, 500);

  // Random event
  const event = getRandomEvent();
  clearScreen();
  printFrame([
    '',
    '              * touches grass *',
    '                _o_/',
    '              🌱 🌱 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    `  ${event.emoji} ${event.text}`,
    `     ${event.effect}`,
    '',
  ]);
  await sleep(2000);

  // Closing
  clearScreen();
  printFrame([
    '',
    '',
    '  You touched grass 🌱',
    '  Stress reduced.',
    '',
    '  Now get back to coding.',
    '',
  ]);
  await sleep(1500);
}

// --- Mountain frame data ---

const mountainOpeningFrame = [
  '',
  '  You hike up the mountain...',
  '',
  '            /\\',
  '           /  \\    /\\',
  '          /    \\  /  \\',
  '         /      \\/    \\',
  '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  '',
];

const climbingFrames = [
  [
    '',
    '            /\\',
    '           /  \\    /\\',
    '    🚶    /    \\  /  \\',
    '     .   /      \\/    \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '            /\\',
    '           /  \\    /\\',
    '          /    \\  /  \\',
    '       🚶/      \\/    \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '            /\\',
    '       🚶  /  \\    /\\',
    '        . /    \\  /  \\',
    '         /      \\/    \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '            /\\',
    '         🚶/  \\    /\\',
    '          /    \\  /  \\',
    '         /      \\/    \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '              Almost there...',
    '           🚶/\\',
    '           /  \\    /\\',
    '          /    \\  /  \\',
    '         /      \\/    \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

const mountainTouchingFrames = [
  [
    '',
    '            /\\',
    '        \\o//  \\    /\\',
    '          /    \\  /  \\',
    '       🌱 🌱 🌱       \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '            /\\',
    '         \\o/  \\    /\\',
    '          /    \\  /  \\',
    '       🌱 🌱 🌱       \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '            * touches alpine grass *',
    '            /\\',
    '         _o_/ \\    /\\',
    '          /    \\  /  \\',
    '       🌱 🌱 🌱 🌱 🌱  \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

async function mountainAnimation() {
  // Opening
  clearScreen();
  printFrame(mountainOpeningFrame);
  await sleep(1200);

  // Climbing
  await playFrames(climbingFrames, 450);

  // Touching alpine grass
  await playFrames(mountainTouchingFrames, 500);

  // Random event
  const event = getRandomEvent();
  clearScreen();
  printFrame([
    '            * touches alpine grass *',
    '            /\\',
    '         _o_/ \\    /\\',
    '          /    \\  /  \\',
    '       🌱 🌱 🌱 🌱 🌱  \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    `  ${event.emoji} ${event.text}`,
    `     ${event.effect}`,
    '',
  ]);
  await sleep(2000);

  // Closing
  clearScreen();
  printFrame([
    '',
    '',
    '  You touched grass 🌱',
    '  Stress reduced.',
    '',
    '  Now get back to coding.',
    '',
  ]);
  await sleep(1500);
}

// --- Garden frame data ---

const gardenOpeningFrame = [
  '',
  '  You enter a quiet garden...',
  '',
  '          |   |',
  '         _|___|_',
  '        |       |',
  '       _|       |_',
  '          | |',
  '      🎋  | |  🎋',
  '',
];

const steppingStoneFrames = [
  [
    '',
    '',
    '    🚶',
    '    [stone]   [stone]   [stone]',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '              🚶',
    '    [stone]   [stone]   [stone]',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '              🚶',
    '    [stone]   [stone]   [stone]',
    '    ~~~~~~~~🐟~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '                        🚶',
    '    [stone]   [stone]   [stone]',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

const stillnessFrames = [
  [
    '',
    '                      |',
    '        o            _|',
    '       /|\\            \\',
    '       / \\        |____|',
    '    🌱 🌱 🌱  ~~~~~~~~~~~~',
    '',
    '                   drip...',
  ],
  [
    '',
    '                      |',
    '        o            _|',
    '       /|\\            \\',
    '       / \\        |____|',
    '    🌱 🌱 🌱  ~~~~~~~~~~~~',
    '',
    '              drip... drip...',
  ],
  [
    '',
    '                      |',
    '        o            _|',
    '       /|\\            \\',
    '       / \\        |____|',
    '    🌱 🌱 🌱  ~~~~~~~~~~~~',
    '',
    '',
  ],
];

const gardenTouchingFrames = [
  [
    '',
    '',
    '         \\o',
    '          \\         _',
    '       🌱 🌱 🌱    |_| 🌱',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '',
    '         _o',
    '          \\         _',
    '       🌱 🌱 🌱    |_| 🌱',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '       * touches moss *',
    '         _o_/        _',
    '                    |_|',
    '       🌱 🌱 🌱 🌱 🌱 🌱',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

async function gardenAnimation() {
  // Opening
  clearScreen();
  printFrame(gardenOpeningFrame);
  await sleep(1200);

  // Walking across stepping stones
  await playFrames(steppingStoneFrames, 450);

  // Stillness — the zen moment
  for (const frame of stillnessFrames) {
    clearScreen();
    printFrame(frame);
    await sleep(800);
  }

  // Touching moss
  await playFrames(gardenTouchingFrames, 500);

  // Random event
  const event = getRandomEvent();
  clearScreen();
  printFrame([
    '',
    '       * touches moss *',
    '         _o_/        _',
    '                    |_|',
    '       🌱 🌱 🌱 🌱 🌱 🌱',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    `  ${event.emoji} ${event.text}`,
    `     ${event.effect}`,
    '',
  ]);
  await sleep(2000);

  // Closing
  clearScreen();
  printFrame([
    '',
    '',
    '  You touched grass 🌱',
    '  Stress reduced.',
    '',
    '  Now get back to coding.',
    '',
  ]);
  await sleep(1500);
}

async function runAnimation() {
  const pick = Math.random();
  if (pick < 1/3) {
    await parkAnimation();
  } else if (pick < 2/3) {
    await mountainAnimation();
  } else {
    await gardenAnimation();
  }
}

module.exports = { runAnimation };
