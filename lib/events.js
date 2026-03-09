const events = [
  { emoji: '🐞', text: 'A ladybug lands on your hand.', effect: '+1 luck' },
  { emoji: '🦋', text: 'A butterfly appears nearby.', effect: '+2 happiness' },
  { emoji: '🍀', text: 'You found a lucky clover.', effect: '+3 fortune' },
  { emoji: '🌧', text: 'Light rain begins to fall.', effect: 'The grass smells fresh.' },
  { emoji: '🐦', text: 'A bird chirps in the distance.', effect: '+1 peace' },
  { emoji: '🌸', text: 'You notice a small flower growing.', effect: '+1 wonder' },
  { emoji: '🐜', text: 'Ants are working hard nearby.', effect: '+1 motivation' },
  { emoji: '🌈', text: 'A rainbow appears briefly.', effect: '+5 joy' },
  { emoji: '🐸', text: 'A frog jumps away suddenly.', effect: '+1 surprise' },
  { emoji: '☀', text: 'The sun feels warm on your face.', effect: '+2 comfort' },
  { emoji: '🌻', text: 'A sunflower turns toward you.', effect: '+1 warmth' },
  { emoji: '🍃', text: 'A gentle breeze rustles the leaves.', effect: '+2 calm' },
];

function getRandomEvent() {
  return events[Math.floor(Math.random() * events.length)];
}

module.exports = { getRandomEvent };
