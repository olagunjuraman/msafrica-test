export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    connection: process.env.DB_CONNECTION,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.DB_SYNCHRONIZE,
    entities: process.env.DB_ENTITIES,
    migrations: process.env.DB_MIGRATIONS,
    migrationsDir: process.env.DB_MIGRATIONS_DIR,
  },
});
