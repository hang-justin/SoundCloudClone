module.exports = {
  "featureName": "User Authorization",
  "endpoints": [
    {
      "endpointName": "Get the Current User",
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
              "firstName": "John",
              "lastName": "Smith",
              "email": "john.smith@gmail.com"
            }
          }
        }
      ]
    },
    {
      "endpointName": "Log in a User",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "email": "john.smith@gmail.com",
              "password": "secret password"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "firstName": "John",
              "lastName": "Smith",
              "email": "john.smith@gmail.com",
              "token": ""
            }
          }
        },
        {
          "specName": "Invalid Credentials",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "email": "john.smith@gmail.com",
              "password": "not secret password"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "401",
            "body": {
              "message": "Invalid credentials",
              "statusCode": 401
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Invalid credentials";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 401;
              }
            }
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
                "email": "Email is required",
                "password": "Password is required"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Sign Up a User",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "firstName": "John",
              "lastName": "Smith",
              "email": "john.smith@gmail.com",
              "password": "secret password"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "firstName": "John",
              "lastName": "Smith",
              "email": "john.smith@gmail.com",
              "token": ""
            }
          }
        },
        {
          "specName": "User already exists",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "firstName": "John",
              "lastName": "Smith",
              "email": "john.smith@gmail.com",
              "password": "secret password"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "User already exists",
              "statusCode": 403,
              "errors": {
                "email": "User with that email already exists"
              }
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "User already exists";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 403;
              }
            }
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "email": 4
            }
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
                "email": "Invalid email",
                "firstName": "First Name is required",
                "lastName": "Last Name is required"
              }
            }
          }
        }
      ]
    }
  ]
};