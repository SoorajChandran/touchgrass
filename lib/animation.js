const { getRandomEvent } = require('./events.js');
const { sleep, clearScreen, printFrame } = require('./utils.js');

const closingArt = [
  '   _                   _',
  '  | |_ ___  _   _  ___| |__',
  '  | __/ _ \\| | | |/ __| \'_ \\',
  '  | || (_) | |_| | (__| | | |',
  '   \\__\\___/ \\__,_|\\___|_| |_|',
  '    __ _ _ __ __ _ ___ ___',
  '   / _` | \'__/ _` / __/ __|',
  '  | (_| | | | (_| \\__ \\__ \\',
  '   \\__, |_|  \\__,_|___/___/',
  '   |___/',
];

async function playFrames(frames, delay) {
  for (const frame of frames) {
    clearScreen();
    printFrame(frame);
    await sleep(delay);
  }
}

function waitForKey() {
  if (!process.stdin.isTTY) {
    return sleep(1200);
  }

  return new Promise((resolve) => {
    process.stdout.write('\x1b[2m  press \u2192 to continue\x1b[0m\n');

    process.stdin.setRawMode(true);
    process.stdin.resume();

    const onData = (data) => {
      const s = data.toString();
      if (s === '\x03') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        process.exit(0);
      }
      if (s === '\x1b[C' || s === '\r' || s === ' ') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeListener('data', onData);
        resolve();
      }
    };

    process.stdin.on('data', onData);
  });
}

// --- Frame data ---

const openingFrame = [
  '',
  '  You step outside...',
  '  The world slows down.',
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
    '              Sunlight through the leaves...',
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

const parkContemplationFrames = [
  [
    '',
    '',
    '              You stand still.',
    '                 o',
    '                /|\\',
    '                / \\',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '              Birds in the distance.',
  ],
  [
    '',
    '',
    '              A gentle breeze.',
    '                 o',
    '                /|\\',
    '                / \\',
    '                 🌱 🌱 🌱',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '',
  ],
];

async function parkAnimation() {
  // Opening
  clearScreen();
  printFrame(openingFrame);
  await sleep(1200);
  await waitForKey();

  // Walking
  await playFrames(walkingFrames, 450);
  await waitForKey();

  // Contemplation pause
  await playFrames(parkContemplationFrames, 800);
  await waitForKey();

  // Touching grass
  await playFrames(touchingFrames, 650);

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
  await waitForKey();

  // Closing
  clearScreen();
  printFrame([
    '',
    '              ✦',
    '',
    '          🌳    🌳',
    '           |    |',
    '       [==========]',
    '        ||      ||',
    '     🌱  🌱  🌱  🌱  🌱',
    '',
    ...closingArt,
    '',
    '  The park will be here tomorrow.',
    '',
  ]);
  await sleep(1500);
}

// --- Mountain frame data ---

const mountainOpeningFrame = [
  '',
  '  You hike up the mountain...',
  '  One step at a time.',
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
    '         The valley stretches below...',
    '           🚶/\\',
    '           /  \\    /\\',
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

const mountainContemplationFrames = [
  [
    '',
    '         You pause at the summit.',
    '            /\\',
    '        \\o//  \\    /\\',
    '          /    \\  /  \\',
    '         /      \\/    \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '         Wind across the peak.',
  ],
  [
    '',
    '         Silence.',
    '            /\\',
    '        \\o//  \\    /\\',
    '          /    \\  /  \\',
    '         /      \\/    \\',
    '    ~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '',
  ],
];

async function mountainAnimation() {
  // Opening
  clearScreen();
  printFrame(mountainOpeningFrame);
  await sleep(1200);
  await waitForKey();

  // Climbing
  await playFrames(climbingFrames, 450);
  await waitForKey();

  // Contemplation pause
  await playFrames(mountainContemplationFrames, 800);
  await waitForKey();

  // Touching alpine grass
  await playFrames(mountainTouchingFrames, 650);

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
  await waitForKey();

  // Closing
  clearScreen();
  printFrame([
    '',
    '              ✦',
    '             /\\',
    '            /  \\    /\\',
    '           /    \\  /  \\',
    '          /      \\/    \\',
    '       ~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    ...closingArt,
    '',
    '  The mountains will wait for you.',
    '',
  ]);
  await sleep(1500);
}

// --- Garden frame data ---

const gardenOpeningFrame = [
  '',
  '  You enter a quiet garden...',
  '  The world falls away.',
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
    '          Each step, a little slower...',
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
  await waitForKey();

  // Walking across stepping stones
  await playFrames(steppingStoneFrames, 450);
  await waitForKey();

  // Stillness — the zen moment
  for (const frame of stillnessFrames) {
    clearScreen();
    printFrame(frame);
    await sleep(800);
  }
  await waitForKey();

  // Touching moss
  await playFrames(gardenTouchingFrames, 650);

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
  await waitForKey();

  // Closing
  clearScreen();
  printFrame([
    '',
    '             _',
    '            |_|',
    '            | |',
    '           _| |_',
    '          |_____|',
    '       🌱 🌱 🌱 🌱 🌱 🌱',
    '',
    ...closingArt,
    '',
    '  The garden stays still.',
    '',
  ]);
  await sleep(1500);
}

// --- Fjord frame data ---

const fjordOpeningFrame = [
  '',
  '  You arrive at a Norwegian fjord...',
  '  Everything is vast and still.',
  '',
  '     ⛰                    ⛰',
  '    /   \\                /   \\',
  '   /     \\    ⛵       /     \\',
  '  /       \\__________/       \\',
  '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  '',
];

const fjordWalkingFrames = [
  [
    '',
    '  🚶',
    '     ⛰                    ⛰',
    '    /   \\                /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '       🚶',
    '     ⛰                    ⛰',
    '    /   \\                /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '            🚶',
    '     ⛰                    ⛰',
    '    /   \\      ⛵         /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '                 🚶',
    '     ⛰                    ⛰',
    '    /   \\      ⛵         /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '           The water is still below...',
    '                      🚶',
    '     ⛰                    ⛰',
    '    /   \\      ⛵         /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '           The air is crisp...',
    '                      🚶',
    '     ⛰                    ⛰',
    '    /   \\      ⛵         /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

const fjordTouchingFrames = [
  [
    '',
    '                     \\o/',
    '     ⛰               🌿   ⛰',
    '    /   \\                /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '                      \\o',
    '     ⛰               🌿   ⛰',
    '    /   \\                /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '        * touches fjord grass *',
    '                      _o_/',
    '     ⛰           🌱 🌱 🌱  ⛰',
    '    /   \\                /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

const fjordContemplationFrames = [
  [
    '',
    '         You stand at the cliff edge.',
    '                      o',
    '     ⛰              /|\\          ⛰',
    '    /   \\            / \\       /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '         The fjord reflects the sky.',
  ],
  [
    '',
    '',
    '                      o',
    '     ⛰              /|\\          ⛰',
    '    /   \\            / \\       /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '',
  ],
];

async function fjordAnimation() {
  // Opening
  clearScreen();
  printFrame(fjordOpeningFrame);
  await sleep(1200);
  await waitForKey();

  // Walking along the cliff edge
  await playFrames(fjordWalkingFrames, 450);
  await waitForKey();

  // Contemplation pause
  await playFrames(fjordContemplationFrames, 800);
  await waitForKey();

  // Touching fjord grass
  await playFrames(fjordTouchingFrames, 650);

  // Random event
  const event = getRandomEvent();
  clearScreen();
  printFrame([
    '        * touches fjord grass *',
    '                      _o_/',
    '     ⛰           🌱 🌱 🌱  ⛰',
    '    /   \\                /   \\',
    '   /     \\            /     \\',
    '  /       \\__________/       \\',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    `  ${event.emoji} ${event.text}`,
    `     ${event.effect}`,
    '',
  ]);
  await sleep(2000);
  await waitForKey();

  // Closing
  clearScreen();
  printFrame([
    '',
    '        ⛰              ⛰',
    '       /  \\            /  \\',
    '      /    \\__________/    \\',
    '      ~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '       \\    /          \\    /',
    '        \\  /            \\  /',
    '',
    ...closingArt,
    '',
    '  The fjord endures.',
    '',
  ]);
  await sleep(1500);
}

// --- Beach frame data ---

const beachOpeningFrame = [
  '',
  '  You walk onto a tropical beach...',
  '  Time stretches out.',
  '',
  '        ☀',
  '  🌴         🌴    🌴',
  '   |          |      |',
  '  .:....sand.....sand.....:',
  '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  '',
];

const beachWalkingFrames = [
  [
    '',
    '        ☀',
    '  🌴         🌴    🌴',
    '  🚶',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '        ☀',
    '  🌴         🌴    🌴',
    '       🚶',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '        ☀',
    '  🌴         🌴    🌴',
    '             🚶       🐚',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '        ☀              🦅',
    '  🌴         🌴    🌴',
    '                  🚶  🐚',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '          Salt air fills your lungs...',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       🚶',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '          Waves lap at your feet...',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       🚶',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~🐠~~~~~~~~~~~~~~~~~~~',
  ],
];

const beachTouchingFrames = [
  [
    '',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       \\o/',
    '  .:....sand.....🌱 🌱.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       \\o',
    '  .:....sand.....🌱 🌱.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
  [
    '       * touches beach grass *',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       _o_/',
    '  .:....sand...🌱 🌱 🌱 🌱..:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  ],
];

const beachContemplationFrames = [
  [
    '',
    '          You stop walking.',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       o',
    '                      /|\\',
    '                      / \\',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '          Waves roll in... and out.',
  ],
  [
    '',
    '',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       o',
    '                      /|\\',
    '                      / \\',
    '  .:....sand.....sand.....:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    '',
  ],
];

async function beachAnimation() {
  // Opening
  clearScreen();
  printFrame(beachOpeningFrame);
  await sleep(1200);
  await waitForKey();

  // Walking across the sand
  await playFrames(beachWalkingFrames, 450);
  await waitForKey();

  // Contemplation pause
  await playFrames(beachContemplationFrames, 800);
  await waitForKey();

  // Touching beach grass
  await playFrames(beachTouchingFrames, 650);

  // Random event
  const event = getRandomEvent();
  clearScreen();
  printFrame([
    '       * touches beach grass *',
    '        ☀',
    '  🌴         🌴    🌴',
    '                       _o_/',
    '  .:....sand...🌱 🌱 🌱 🌱..:',
    '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '',
    `  ${event.emoji} ${event.text}`,
    `     ${event.effect}`,
    '',
  ]);
  await sleep(2000);
  await waitForKey();

  // Closing
  clearScreen();
  printFrame([
    '',
    '              ☀',
    '       🌴            🌴',
    '        |              |',
    '      .:....sand..sand.....:',
    '      ~~~  ~~~  ~~~  ~~~  ~~~',
    '',
    ...closingArt,
    '',
    '  The tide will return.',
    '',
  ]);
  await sleep(1500);
}

async function runAnimation() {
  const pick = Math.random();
  if (pick < 1/5) {
    await parkAnimation();
  } else if (pick < 2/5) {
    await mountainAnimation();
  } else if (pick < 3/5) {
    await gardenAnimation();
  } else if (pick < 4/5) {
    await fjordAnimation();
  } else {
    await beachAnimation();
  }
}

module.exports = { runAnimation };
