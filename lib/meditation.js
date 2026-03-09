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

const inhaleFrames = [
  [
    '',
    '  🌿 breathe in...',
    '',
  ],
  [
    '',
    '  🌿🌿 breathe in...',
    '',
  ],
  [
    '',
    '  🌿🌿🌿 breathe in...',
    '',
  ],
];

const exhaleFrames = [
  [
    '',
    '  🌿🌿🌿 breathe out...',
    '',
  ],
  [
    '',
    '  🌿🌿 breathe out...',
    '',
  ],
  [
    '',
    '  🌿 breathe out...',
    '',
  ],
];

async function runMeditation() {
  // Opening
  clearScreen();
  printFrame([
    '',
    '  Let\'s breathe together.',
    '',
  ]);
  await sleep(1500);

  // 2 breathing cycles
  for (let cycle = 0; cycle < 2; cycle++) {
    // Inhale
    for (const frame of inhaleFrames) {
      clearScreen();
      printFrame(frame);
      await sleep(600);
    }
    // Hold
    await sleep(400);

    // Exhale
    for (const frame of exhaleFrames) {
      clearScreen();
      printFrame(frame);
      await sleep(600);
    }
    // Hold
    await sleep(400);
  }

  // Closing
  clearScreen();
  printFrame([
    '',
    '  Calm restored. 🌿',
    '  Return to your code when ready.',
    '',
  ]);
  await sleep(1800);
}

module.exports = { runMeditation };
