const Knex = require("knex").default

const db = Knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgrespassword@localhost:5432/postgres",
})

module.exports = db
