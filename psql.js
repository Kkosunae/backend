import pg from 'pg';

const client = new pg.Client({
  user: 'kkosunae',
  host: 'postgresql-kkosunae-dev.c5bgg6amlf0l.ap-northeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'kkosunaedev230715',
  port: 5432,
});
client.connect();
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});
