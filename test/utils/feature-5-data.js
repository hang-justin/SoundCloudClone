module.exports = {
  "featureName": "Playlists Feature",
  "endpoints": [
    {
      "endpointName": "Get details for a Playlist from an id",
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
              "userId": 1,
              "name": "Current Favorites",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36",
              "previewImage": "image url",
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
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.previewImage.allowNull": true,
            "body.previewImage.validate": {
              "isURL": true
            },
            "body.Songs.description.allowNull": true,
            "body.Songs.previewImage.allowNull": true,
            "body.Songs.previewImage.validate": {
              "isURL": true
            },
            "body.Songs.createdAt.validate": {
              "isISO8601": true
            },
            "body.Songs.updatedAt.validate": {
              "isISO8601": true
            },
          }
        }
      ]
    },
    {
      "endpointName": "Get details for a Playlist from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Playlist with the specified id",
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
              "message": "Playlist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Playlist couldn't be found";
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
      "endpointName": "Get all Playlists created by the Current User",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
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
              "Playlists":[
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
        }
      ]
    },
    {
      "endpointName": "Create and return a new Playlist",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "name": "Current Favorites",
              "imageUrl": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "201",
            "body": {
              "id": 1,
              "userId": 1,
              "name": "Current Favorites",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36",
              "previewImage": "image url"
            },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.previewImage.allowNull": true,
            "body.previewImage.validate": {
              "isURL": true
            },
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {}
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "name": "Playlist name is required"
              }
            }
          }
        }
      ]
    },



    {
      "endpointName": "Add a Song to a Playlist by Playlist id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "songId": 1
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "201",
            "body": {
              "id": 1,
              "playlistId": 1,
              "songId": 1
            },
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {}
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Song couldn't be found",
              "statusCode": 404
            }
          }
        }
      ]
    },
    {
      "endpointName": "Add a Song to a Playlist with a non-existent Playlist id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Playlist with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "songId": 1
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Playlist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Playlist couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        },
      ]
    },
    {
      "endpointName": "Updates and returns an existing Playlist",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "name": "Current Favorites",
              "imageUrl": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "userId": 1,
              "name": "Current Favorites",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-20 20:00:00",
              "previewImage": "image url"
            },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.previewImage.allowNull": true,
            "body.previewImage.validate": {
              "isURL": true
            },
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {}
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "name": "Playlist name is required"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for a Playlist from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Playlist with the specified id",
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
              "message": "Playlist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Playlist couldn't be found";
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
      "endpointName": "Delete a Playlist",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
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
              "message": "Successfully deleted",
              "statusCode": 200
            },
            "body.message.validate": {
              "bodyMessage": function(value){
                return value === "Successfully deleted";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 200;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Delete a Playlist from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Playlist with the specified id",
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
              "message": "Playlist couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Playlist couldn't be found";
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