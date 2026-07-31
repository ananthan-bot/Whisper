/**
 * SQLite / PostgreSQL Database Seeder Script for Whisper Server
 */

const SAMPLE_SEED_TASKS = [
  {
    id: 'TASK-1001',
    category: 'negotiator',
    description: 'Call cable provider to negotiate lower monthly bill rate.',
    bounty: 45,
    status: 'open',
  },
  {
    id: 'TASK-1002',
    category: 'secretary',
    description: 'Reschedule dental appointment to next Tuesday afternoon.',
    bounty: 25,
    status: 'open',
  },
];

function seedDatabase() {
  console.log(`Seeding database with ${SAMPLE_SEED_TASKS.length} initial tasks...`);
  return SAMPLE_SEED_TASKS;
}

module.exports = { seedDatabase, SAMPLE_SEED_TASKS };
