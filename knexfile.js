// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
  }

};
