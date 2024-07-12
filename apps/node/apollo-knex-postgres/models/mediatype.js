const { Model } = require("objection")
const db = require("../knex")

Model.knex(db)

class MediaType extends Model {
  static tableName = "MediaType"
  static idColumn = "MediaTypeId"
}

module.exports = MediaType
