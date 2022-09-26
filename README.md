# SonusNimbus 
Welcome to SonusNimbus, a SoundCloud clone in development. SonusNimbus's current main features are songs, comments, and an audio player. Users can create, view, update, and delete songs. Users are also able to add, view, and delete comments on songs. Lastly, users are able to listen to their newly posted song or listen to songs that have already been posted for free!

Follow the link below to get started.

https://sonus-nimbus.herokuapp.com/

## Landing Page
![image](https://user-images.githubusercontent.com/60123981/192245458-aeb7bb5f-2dfa-40ed-9d3d-4ee131ff537f.png)
You will be greeted with the landing page imaged above. From there, you can sign in, create an account, play songs by hovering over the song image and click the play button, or even navigate to a song page by clicking on its text.

## Stream and view songs
![image](https://user-images.githubusercontent.com/60123981/192246325-e054b5b2-2004-4b8f-8307-b1d4bd4d5c16.png)
After logging in, the stream page can be accessed and you can view the songs uploaded by others or you! You can also edit/delete songs that you have made. You can also view the last 3 songs that songs that you have played on the right hand side.

## View a song page and add comments
![image](https://user-images.githubusercontent.com/60123981/192246949-5fd0b11f-cf4b-4f4e-95c9-a90cdc168882.png)
On the song page, you can view the song's description and view and add comments to the song. The creator of the song will also have a 'CREATOR' tag appear next to their name if they made a comment.

## Upload a Song
![image](https://user-images.githubusercontent.com/60123981/192246095-06acf6c9-8048-49e1-9d90-5c8726c21017.png)
To upload a song, provide a non-empty title and an audio URL. Currently, only mpg/wav/ogg audio URLs are supported.

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

## Future Features
1. Waveforms for each song
2. Playlists
3. Albums
4. User pages
