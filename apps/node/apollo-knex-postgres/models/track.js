const { Model } = require("objection")
const path = require("path")

const db = require("../knex")
Model.knex(db)

class Track extends Model {
  static tableName = "Track"
  static idColumn = "TrackId"

  static relationMappings = {
    Genre: {
      relation: Model.HasOneRelation,
      modelClass: path.join(__dirname, "genre"),
      join: {
        from: "Track.GenreId",
        to: "Genre.GenreId",
      },
    },
    MediaType: {
      relation: Model.HasOneRelation,
      modelClass: path.join(__dirname, "mediatype"),
      join: {
        from: "Track.MediaTypeId",
        to: "MediaType.MediaTypeId",
      },
    },
    Album: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "album"),
      join: {
        from: "Track.AlbumId",
        to: "Album.AlbumId",
      },
    },
  }
}

module.exports = Track
