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

module.exports = { sleep, clearScreen, printFrame };
