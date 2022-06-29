module.exports = {
  "featureName": "Songs Feature",
  "endpoints": [
    {
      "endpointName": "Get all Songs",
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
              "Songs":[
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
            "body.Songs.minLength": 20,
            "body.Songs.previewImage.allowNull": true,
            "body.Songs.createdAt.validate": {
              "isISO8601": true
            },
            "body.Songs.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Songs.url.validate": {
              "isURL": true
            },
            "body.Songs.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get all Songs created by the Current User",
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
            "body.Songs.minLength": 2,
            "body.Songs.previewImage.allowNull": true,
            "body.Songs.createdAt.validate": {
              "isISO8601": true
            },
            "body.Songs.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Songs.url.validate": {
              "isURL": true
            },
            "body.Songs.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for a Song from an id",
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
              "albumId": 1,
              "title": "Yesterday",
              "description": "A song about the past.",
              "url": "audio url",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36",
              "previewImage": "image url",
              "Artist": {
                "id": 1,
                "username": "JohnSmith",
                "previewImage": "image url"
              },
              "Album": {
                "id": 1,
                "title": "Time",
                "previewImage": "image url"
              }
            },
            "body.previewImage.allowNull": true,
            "body.Artist.previewImage.allowNull": true,
            "body.Album.previewImage.allowNull": true,
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.url.validate": {
              "isURL": true
            },
            "body.previewImage.validate": {
              "isURL": true
            },
            "body.Artist.previewImage.validate": {
              "isURL": true
            },
            "body.Album.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for a Song from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Song with the specified id",
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
              "message": "Song couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Song couldn't be found";
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
      "endpointName": "Create and return a new Song",
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
              "title": "Yesterday",
              "description": "A song about the past.",
              "url": "audio url",
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
              "albumId": 1,
              "title": "Yesterday",
              "description": "A song about the past.",
              "url": "audio url",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36", 
              "previewImage": "image url"
            },
            "body.previewImage.allowNull": true,
            "body.description.allowNull": true,
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.url.validate": {
              "isURL": true
            },
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
                "title": "Song title is required",
                "url": "Audio is required"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create a Song with a non-existent Album id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Album with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "title": "Yesterday",
              "description": "A song about the past.",
              "url": "audio url",
              "imageUrl": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Album couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Album couldn't be found";
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
      "endpointName": "Updates and returns an existing Song",
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
              "title": "Yesterday",
              "description": "A song about the past.",
              "url": "audio url",
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
              "albumId": 1,
              "title": "Yesterday",
              "description": "A song about the past.",
              "url": "audio url",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-20 20:00:00", 
              "previewImage": "image url"
            },
            "body.previewImage.allowNull": true,
            "body.description.allowNull": true,
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.url.validate": {
              "isURL": true
            },
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
                "title": "Song title is required",
                "url": "Audio is required"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for a Song from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Song with the specified id",
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
              "message": "Song couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Song couldn't be found";
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
      "endpointName": "Delete a Song",
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
      "endpointName": "Delete a Song from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Song with the specified id",
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
              "message": "Song couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Song couldn't be found";
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