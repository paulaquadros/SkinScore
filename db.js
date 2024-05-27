const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'skinscore',
  password: '1337',
  port: 5432,
});

pool.on('connect', () => {
    console.log('Conexão com o banco de dados estabelecida.');
  });
  
  pool.on('error', (err) => {
    console.error('Erro no pool de conexões:', err);
  });

module.exports = pool;
