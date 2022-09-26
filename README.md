# SonusNimbus 
Welcome to SonusNimbus, a SoundCloud clone in development. SonusNimbus's current main features are songs, comments, and an audio player. Users can create, view, update, and delete songs. Users are also able to add, view, and delete comments on songs. Lastly, users are able to listen to their newly posted song or listen to songs that have already been posted for free!

Follow the link below to get started.

https://sonus-nimbus.herokuapp.com/

### Landing Page
![image](https://user-images.githubusercontent.com/60123981/192244865-c44c3765-25d1-467a-9eec-e1b3170426cb.png)

## Running SonusNimbus Locally
1. Download the repository.
2. ```cd``` into the backend folder and run ```npm install```
3. Repeat step 2 for the frontend folder
4. To seed your database, run the following commands:
```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

5. ```cd``` into the backend folder and run ```npm start```
6. Repeat step 5 for the frontend folder

## Technologies Used

* <img src="https://user-images.githubusercontent.com/60123981/187137781-0a1212e8-5ec4-4dd9-8020-f4de064b0ba0.svg" width="20"> PostgresSQL
* <img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" width="20"> Express
* <img src="https://user-images.githubusercontent.com/60123981/187137950-ae685ce8-b20c-4ac9-a84d-b636fb8bcae5.svg" width="20"> React
* <img src="https://user-images.githubusercontent.com/60123981/187136616-22db5723-87da-453b-b9c8-bb1aaa415288.svg" width="20"> NodeJS
* <img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" width="20"> JavaScript
* <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="20"> CSS
* <img src="https://user-images.githubusercontent.com/25181517/117447535-f00a3a00-af3d-11eb-89bf-45aaf56dbaf1.png" width="20"> HTML5

