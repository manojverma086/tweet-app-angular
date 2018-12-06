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

== Installation ==
Initial setup guide
	Tools used: Angular-cli, npm, visual studio code, cmd
	Languages: Angular 5, html, css, Angular material 5, typescript

 - Step 1. Install latest version of  npm and nodejs
 - Step 2. Open command line and Install angular cli globally:
npm install -g @angular/cli	
 - Step 3. You can run twitter-proxy module from command line using command twitter-proxy ./config.json
this way you will face CORS issue in browser. just install any cors extension and allow origin * it will work.
 - Step 4. Unzip the project folder
 - Step 5. Go to the project directory where angular-cli.json file located
 - Step 6. Open the application in browser using command   
ng serve --open   
 - Step 7. The ng serve command builds the app, starts the development server, watches the source files, and rebuilds the app as you make changes to those files.
The --open flag opens a browser to http://localhost:4200/.