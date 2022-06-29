# SoundCloud Test Specs

## Authentication Required:
### User Authentication
- GET /me - Get the Current User
  - [ ] Success

### Songs
- GET /me/songs - Return all Songs created by Current User
  - [ ] Success
- POST /albums/:albumId/songs - Create a Song for an Album by Album id
  - [ ] Success
  - [ ] Body validation
  - [ ] Invalid id
- PUT /songs/:songId - Update a Song
  - [ ] Success
  - [ ] Body validation
  - [ ] Invalid id
- DELETE /songs/:songId - Delete a Song
  - [ ] Success
  - [ ] Invalid id

### Albums
- GET /me/albums - Return all Albums created by Current User
  - [ ] Success
- POST /albums - Create an Album
  - [ ] Success
  - [ ] Body validation
- PUT /albums/:albumId - Update an Album
  - [ ] Success
  - [ ] Body validation
  - [ ] Invalid id
- DELETE /albums/:albumId - Delete an Album
  - [ ] Success
  - [ ] Invalid id

### Comments
- POST /songs/:songId/comments - Create a Comment for a Song by Song id
  - [ ] Success
  - [ ] Body validation
  - [ ] Invalid id
- PUT /comments/:commentId - Update a Comment
  - [ ] Success
  - [ ] Body validation
  - [ ] Invalid id
- DELETE /comments/:commentId - Delete a Comment
  - [ ] Success
  - [ ] Invalid id

### Playlists
- POST /playlists - Create a Playlist
  - [ ] Success
  - [ ] Body validation
- POST /playlists/:playlistId/songs - Add a Song to a Playlist by Playlist id
  - [ ] Success
  - [ ] Invalid id - Playlist
  - [ ] Invalid id - Song
- PUT /playlists/:playlistId - Update a Playlist
  - [ ] Success
  - [ ] Body validation
  - [ ] Invalid id
- DELETE /playlists/:playlistId - Delete a Playlist
  - [ ] Success
  - [ ] Invalid id
- GET /me/playlists - Return all Playlists created by Current User
  - [ ] Success


## No Authentication Required:
### User Authentication
- POST /login - Log in a User
  - [ ] Success
  - [ ] Invalid credentials
  - [ ] Body validation
- POST /signup - Sign up a User
  - [ ] Success
  - [ ] User exists
  - [ ] Body validation

### Songs
- GET /songs - Return all Songs
  - [ ] Success
- GET /songs/:songId - Return Song details by id
  - [ ] Success
  - [ ] Invalid id

### Albums
- GET /albums - Return all Albums
  - [ ] Success
- GET /albums/:albumId - Return Album details by id
  - [ ] Success
  - [ ] Invalid id

### Comments
- GET /songs/:songId/comments - Return all Comments for a Song by Song id
  - [ ] Success
  - [ ] Invalid id

### Artists
- GET /artists/:artistId - Return Artist details by id
  - [ ] Success
  - [ ] Invalid id
- GET /artists/:artistId/songs - Return all Songs for an Artist by Artist id
  - [ ] Success
  - [ ] Invalid id
- GET /artists/:artistId/albums - Return all Albums for an Artist by Artist id
  - [ ] Success
  - [ ] Invalid id
- GET /artists/:artistId/playlists - Return all Playlists by an Artist by Artist id
  - [ ] Success
  - [ ] Invalid id

### Playlists
- GET /playlists/:playlistId - Return Playlist details by id
  - [ ] Success
  - [ ] Invalid id

### Query Params - Songs
- GET /songs?page&size&title&createdAt - Return all Songs filtered by query params
  - [ ] Success
  - [ ] Param validation