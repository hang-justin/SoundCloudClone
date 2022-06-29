module.exports = {
  "featureName": "Albums Feature",
  "endpoints": [
    {
      "endpointName": "Get all Albums",
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
            "body.Albums.minLength": 20,
            "body.Albums.description.allowNull": true,
            "body.Albums.previewImage.allowNull": true,
            "body.Albums.createdAt.validate": {
              "isISO8601": true
            },
            "body.Albums.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Albums.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get all Albums created by the Current User",
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
            "body.Albums.minLength": 2,
            "body.Albums.description.allowNull": true,
            "body.Albums.previewImage.allowNull": true,
            "body.Albums.createdAt.validate": {
              "isISO8601": true
            },
            "body.Albums.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Albums.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for an Album from an id",
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
              "title": "Time",
              "description": "An album about time.",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36",
              "previewImage": "image url",
              "Artist": {
                "id": 1,
                "username": "JohnSmith",
                "previewImage": "image url"
              },
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
            "body.description.allowNull": true,
            "body.previewImage.allowNull": true,
            "body.Artist.previewImage.allowNull": true,
            "body.Songs.description.allowNull": true,
            "body.Songs.previewImage.allowNull": true,
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.previewImage.validate": {
              "isURL": true
            },
            "body.Artist.previewImage.validate": {
              "isURL": true
            },
            "body.Songs.url.validate": {
              "isURL": true
            },
            "body.Songs.createdAt.validate": {
              "isISO8601": true
            },
            "body.Songs.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Songs.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for an Album from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Album with the specified id",
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
        }
      ]
    },
    {
      "endpointName": "Create and return a new Album",
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
              "title": "Time",
              "description": "An album about time.",
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
              "title": "Time",
              "description": "An album about time.",
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
                "title": "Album title is required"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Updates and returns an existing Album",
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
              "title": "Time",
              "description": "An album about time.",
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
              "title": "Time",
              "description": "An album about time.",
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
                "title": "Album title is required"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for an Album from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Album with the specified id",
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
        }
      ]
    },
    {
      "endpointName": "Delete an Album",
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
      "endpointName": "Delete an Album from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Album with the specified id",
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
        }
      ]
    }, 
  ]
};