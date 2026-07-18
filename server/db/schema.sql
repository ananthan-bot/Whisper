CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  alias VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(20) PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  script TEXT,
  proof_type VARCHAR(20) DEFAULT 'screenshot',
  alias VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'open',
  proof TEXT,
  helper_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  task_id VARCHAR(20) REFERENCES tasks(id),
  sender_id INTEGER REFERENCES users(id),
  sender_role VARCHAR(20) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  task_id VARCHAR(20) REFERENCES tasks(id),
  helper_id INTEGER REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
