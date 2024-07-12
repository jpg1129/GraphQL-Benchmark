const { gql } = require('apollo-server');
const Album = require('./models/album');
const Artist = require('./models/artist');
const Track = require('./models/track');
const Genre = require('./models/genre');
const MediaType = require('./models/mediatype');
const db = require('./knex');

const typeDefs = gql`
  scalar bigint
  scalar numeric
  scalar timestamptz

  type Artist {
    id: bigint!
    name: String
    albums: [Album!]!
    albums_by_authz: [Album]
  }

  # columns and relationships of "track"
  type Track {
    # An object relationship
    album: Album

    album_id: bigint
    bytes: bigint
    composer: String

    # An object relationship
    genre: Genre
    genre_id: bigint

    # An object relationship
    media_type: MediaType
    media_type_id: bigint
    milliseconds: bigint
    name: String

    id: bigint!
    unit_price: numeric
  }

  # columns and relationships of "genre"
  type Genre {
    id: bigint!
    name: String
  }

  type MediaType {
    id: bigint!
    name: String
  }

  # columns and relationships of "album"
  type Album {
    id: bigint!

    # An object relationship
    artist: Artist
    artist_id: bigint
    title: String
    tracks: [Track!]!
    isValidName: Boolean!
  }

  type Query {
    track: [Track]
    album: [Album]
    artist: [Artist]
    artist_by_id(id: Int!): Artist
    albums_tracks_genre_some: [Album]
    tracks_media_some: [Track]
    artists_collaboration: [Artist]
    albums_by_authz: [Album]
  }
`;

const resolvers = {
  Query: {
    album: () => {
      return db('albums').select('*');
    },
    artist: () => db('artists').select('*'),
    track: () => db('tracks').select('*'),
    artist_by_id: (_, args) => {
      return db('artists').where('id', args.id).select('*').limit(1).first();
    },
    // albums_tracks_genre_some: async () => {
    //   return Album.query().where("ArtistId", 127)
    // },
    // tracks_media_some: () => {
    //   return Track.query().where("composer", "Kurt Cobain")
    // },
    /**
     * select [Artist].* from [Artist]
     * left join [Album] as [Albums] on [Albums].[ArtistId] = [Artist].[ArtistId]
     * left join [Track] as [Albums:Tracks] on [Albums:Tracks].[AlbumId] = [Albums].[AlbumId]
     * where [Albums:Tracks].[composer] = ?
     */
    // artists_collaboration: async () => {
    //   return Artist.query()
    //     .withGraphJoined("Albums.[Tracks]")
    //     .where("Albums:Tracks.composer", "Ludwig van Beethoven")
    // },
  },
  Artist: {
    albums: async (artist, args, ctx) => {
      return await db('albums').where('artist_id', artist.id);
    },
    albums_by_authz: async (artist, args, ctx) => {
      return await db('albums')
        .where('artist_id', artist.id)
        .andWhere(artist.id, '>', 1)
        .andWhere('title', 'ilike', '%the%')
        .select('*');
    },
  },
  Album: {
    artist: async (album, args, ctx) => {
      return await db('artists').where('id', album.artist_id).limit(1).first();
    },

    tracks: async (album, args, ctx) => {
      return await db('tracks').where('album_id', album.id);
    },
  },
  Track: {
    album: async (track, args, ctx) => {
      return await db('albums').where('id', track.album_id).limit(1).first();
    },
    genre: async (track, args, ctx) => {
      return await db('genres').where('id', track.genre_id).limit(1).first();
    },
    media_type: async (track, args, ctx) => {
      return await db('media_types')
        .where('id', track.media_type_id)
        .limit(1)
        .first();
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
