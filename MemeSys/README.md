# MemeSys

This project is a basic single page application built with Express and Angular 6.
This is an entertainment app. It's intended use is to allow users to easily store and browse images, sorted by different categories.
 
Its core features include: 
- user creation;
- user roles(basic and administrator);
- content generation in the form of categories, memes and comments;
- Infinite scrolling on the main browsing page for better user experience.
- moderation features: category and user moderation accessed trough an administrator account.

The goal of the project is to show the core concepts of building an application with Angular 6. In this project I've used:

- Angular Modules;
- Angular Components;
- Observables;
- Subjects;
- Custom guards, directives and pipes;
- Custom services.

### Prerequisites

- MongoDB.
If you do not have MongoDB installed on your machine follow the instructions on this link: https://www.mongodb.com/ to set it up.

### Installing

Setting up the application to run on your local machine is very easy.

1. Clone the repository.
2. Run 'npm install' inside the 'server' directory to intall all REST server dependencies.
3. Run 'npm install' inside the 'client' directory to install all Angular dependencies.
4. Run the 'start-mongodb' bat file to get an instance of the database.
5. Run 'node server.js' inside the 'server' directory to start the REST server.
6. Run 'npm start' inside the 'client' directory to start the Angular server. 
7. Have fun messing around with the development build.
IMPORTANT: Step 6 is mandatory in order to start the app with the necessary configuration. 
Running ng serve or a similar command will likely result in the application not being able to establish a connection to the REST server.

## Built With

* [Angular](https://angular.io/) - JavaScript Front-End Framework
* [Bootstrap](https://getbootstrap.com/) - html/css Framework
* [ng-bootstrap](https://ng-bootstrap.github.io/#/home) - Library providing Angular compatible implementation of regular Bootstrap components.
* [Express](https://expressjs.com/en/starter/installing.html) - JavaScript Web Framework
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for creating and parsing JSON Web Tokens
* [Mongoose](http://mongoosejs.com/) - ORM Framework
* [NPM](https://www.npmjs.com/) - Node Package Manager

## Authors

* **Danislav Kamenov** - [DanislavKamenov](https://github.com/DanislavKamenov/)

## License

This project is licensed under the MIT License

