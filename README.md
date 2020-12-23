# World Capitals Quiz

This project helps users learn about countries and capitals from around the world. There are two game modes (standard and destroyer) that were created by using http.get() requests to fetch data from servers (REST countries API and Google Maps API), cleaning the data using array methods such  sort() and filter(), and displaying it on the template using a blend of data binding, string interpolation, and structural directives. 

![1](https://user-images.githubusercontent.com/62124046/103040963-d980ba80-4529-11eb-8d59-cfec058be59c.png)

Clicking on "Standard Mode" from the home page takes the user to a "classic style" 10 question quiz mode. The Fisher-Yates shuffle algorithm was helpful in shuffling the data (quiz questions) every time the component intiates or a user switches the world region.

![2](https://user-images.githubusercontent.com/62124046/103040961-d980ba80-4529-11eb-9ebc-5b8d83eb45d5.png)

Every quiz item is focused on one country. Additional data is provided for the specific country (i.e. Language, GINI coefficient, currency). The latitude and longitude coordinates from the REST Countries API is passed to the map component and the Google Maps API renders the map to the country location. 

![3](https://user-images.githubusercontent.com/62124046/103040960-d8e82400-4529-11eb-8c17-2582144eaf44.png)

Clicking on "Destroyer Mode" from the home page provides the user with an input, a list of countries, and a section with game controls (Start timer, pause timer, refresh game). 

![4](https://user-images.githubusercontent.com/62124046/103040957-d84f8d80-4529-11eb-8bf7-3f86053b5268.png)

Upon clicking on the start button, a 5 minute timer will begin, and the user is able to type world capitals. The use of reactive forms,  the valueChanges observable, and a loop allows the program to monitor user input and detect whether a valid capital was typed or not. Renderer2 allows the correct capital inputs to be dynamically rendered as table headers in the template. Furthermore, the user may pause the game or refresh it entirely.

![5](https://user-images.githubusercontent.com/62124046/103040954-d685ca00-4529-11eb-977a-bed6aa5f7a2c.png)

If you clone, note that you will need to provide a Google Maps API key in the app.module.ts file in order for the map component in standard mode to work. A live version will be deployed soon.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
