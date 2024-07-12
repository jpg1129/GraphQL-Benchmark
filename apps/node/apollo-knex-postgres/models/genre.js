const { Model } = require("objection")
const db = require("../knex")

Model.knex(db)

class Genre extends Model {
  static tableName = "Genre"
  static idColumn = "GenreId"
}

module.exports = Genre
