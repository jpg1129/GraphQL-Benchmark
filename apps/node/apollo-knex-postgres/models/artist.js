const { Model } = require("objection")
const path = require("path")
const db = require("../knex")

Model.knex(db)

class Artist extends Model {
  static tableName = "Artist"
  static idColumn = "ArtistId"

  static relationMappings = {
    Albums: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, "album"),
      join: {
        from: "Artist.ArtistId",
        to: "Album.ArtistId",
      },
    },
  }
}

module.exports = Artist
