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

async function runAnimation() {
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

module.exports = { runAnimation };
