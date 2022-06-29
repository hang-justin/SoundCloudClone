module.exports = {
  "featureName": "Artists Feature",
  "endpoints": [
    {
      "endpointName": "Get details for an Artist from an id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "username": "JohnSmith",
              "totalSongs": 10,
              "totalAlbums": 2,
              "previewImage": "image url"
            },
            "body.previewImage.allowNull": true,
            "body.previewImage.validate": {
              "isURL": true
            },
          }
        }
      ]
    },
    {
      "endpointName": "Get details for an Artist from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Artist with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Artist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Artist couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Return all Songs for an Artist by Artist id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "Songs": [
                {
                  "id": 1,
                  "userId": 1,
                  "albumId": 1,
                  "title": "Yesterday",
                  "description": "A song about the past.",
                  "url": "audio url",
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36",
                  "previewImage": "image url"
                }
              ]
            },
            "body.Songs.description.allowNull": true,
            "body.Songs.createdAt.validate": {
              "isISO8601": true
            },
            "body.Songs.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Songs.previewImage.allowNull": true,
            "body.Songs.previewImage.validate": {
              "isURL": true
            },
          }
        },
      ]
    },
    {
      "endpointName": "Return all Songs for an Artist from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Artist with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Artist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Artist couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Return all Albums for an Artist by Artist id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "Albums": [
                {
                  "id": 1,
                  "userId": 1,
                  "title": "Time",
                  "description": "An album about time.",
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36",
                  "previewImage": "image url"
                }
              ]
            },
            "body.Albums.description.allowNull": true,
            "body.Albums.createdAt.validate": {
              "isISO8601": true
            },
            "body.Albums.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Albums.previewImage.allowNull": true,
            "body.Albums.previewImage.validate": {
              "isURL": true
            },
          }
        },
      ]
    },
    {
      "endpointName": "Return all Albums for an Artist from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Artist with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Artist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Artist couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Return all Playlists for an Artist by Artist id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "Playlists": [
                {
                  "id": 1,
                  "userId": 1,
                  "name": "Current Favorites",
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36",
                  "previewImage": "image url"
                }
              ]
            },
            "body.Playlists.createdAt.validate": {
              "isISO8601": true
            },
            "body.Playlists.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Playlists.previewImage.allowNull": true,
            "body.Playlists.previewImage.validate": {
              "isURL": true
            },
          }
        },
      ]
    },
    {
      "endpointName": "Return all Playlists for an Artist from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Artist with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Artist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Artist couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
  ]
};