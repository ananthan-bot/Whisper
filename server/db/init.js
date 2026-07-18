const pool = require('../db');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

pool.query(schema)
  .then(() => {
    console.log('✅ Tables created successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error creating tables:', err);
    process.exit(1);
  });
