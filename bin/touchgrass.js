#!/usr/bin/env node

const command = process.argv[2];

process.on('SIGINT', () => {
  process.stdout.write('\n');
  process.exit(0);
});

if (command === undefined) {
  const { runAnimation } = require('../lib/animation.js');
  runAnimation().then(() => process.exit(0));
} else if (command === 'breathe') {
  const { runMeditation } = require('../lib/meditation.js');
  runMeditation().then(() => process.exit(0));
} else {
  if (command !== '--help' && command !== '-h') {
    process.stderr.write(`Unknown command: ${command}\n\n`);
  }
  const out = command === '--help' || command === '-h' ? process.stdout : process.stderr;
  out.write(`Usage:\n`);
  out.write(`  touchgrass          Run the grass-touching animation\n`);
  out.write(`  touchgrass breathe  Run breathing meditation\n`);
  out.write(`  touchgrass --help   Show this help\n`);
  process.exit(command === '--help' || command === '-h' ? 0 : 1);
}
