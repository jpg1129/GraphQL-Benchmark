const { Model } = require("objection")
const path = require("path")
const db = require("../knex")

Model.knex(db)

class Album extends Model {
  static tableName = "Album"
  static idColumn = "AlbumId"

  static relationMappings = {
    Artist: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "artist"),
      join: {
        from: "Album.ArtistId",
        to: "Artist.ArtistId",
      },
    },
    Tracks: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, "track"),
      join: {
        from: "Album.AlbumId",
        to: "Track.AlbumId",
      },
    },
  }
}

module.exports = Album
