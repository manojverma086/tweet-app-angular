# Tweetapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests


Hi please follow below instructions to run the app

== Description ==
Features:
Added till now- 
	- 1. Sort based on created_at
	- 2. number of items in each column dropdown.
	- 3. Displaying all tweets with real content with link to user_mentions and hashtags.
	- 4. Urls in tweet text also mapped to real urls.
	- 5. Link to tweet also provided.
	- 6. Localstorage persist filters like sorted and count of items per column. 

== Installation ==
Initial setup guide
	Tools used: Angular-cli, npm, visual studio code, cmd
	Languages: Angular 5, html, css, Angular material 5, typescript

 - Step 1. Install latest version of  npm and nodejs
 - Step 2. Open command line and Install angular cli globally:
npm install -g @angular/cli	
 - Step 3. Unzip the project folder
 - Step 4. Edit server/config.json file and put all secrets and token of your twitter account
 - Step 5. Go to the project directory where angular-cli.json file located
 - Step 6. Run command "npm run start-erver", it will start twitter-proxy with given secret and tokens in server/config.json file
 - Step 7. Open new command line window
 - Step 8. Run command "npm start" in this window   
 - Step 9. The ng serve command builds the app, starts the development server, watches the source files, and rebuilds the app as you make changes to those files.
The --open flag opens a browser to http://localhost:4200/.
 - Step 10. Before opening url in browser, install any cors extension to enable cors in browser. This is only in development version, for production use we can allow cors for ui server on our backend server. 
 - Step 11. Enable cors and open url http://localhost:4200/dashboard in browser.