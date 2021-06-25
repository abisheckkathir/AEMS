# Amrita Elective Management System

AEMS is a platform that acts as bridge between the students and the institution making the process of opting the elective seamless for both.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* [Node.js®](https://nodejs.org/en/download/) - An open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

    Please read [Installation Instructions](https://nodejs.org/en/download/package-manager/) for details on how to install and setup Node.js® on your system.
* [Yarn](https://yarnpkg.com/getting-started) - Yarn is a modern package manager split into various packages. Its novel architecture allows to do things currently impossible with existing solutions.

    Please read [Installation Instructions](https://yarnpkg.com/getting-started/install) for details on how to install and setup Yarn on your system.
* [Docker](https://docs.docker.com/) - Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

    Please read [Installation Instructions](https://docs.docker.com/get-docker/) for details on how to install and setup Docker on your system.

## Running the App

A step by step series of examples that tell you how to get a development env running

Installing the required dependencies

```
yarn install
```
### Running the server
The server has to be started before running the client

```
yarn run server
```
The client will start at http://localhost:4000
### Running the Client
Starting the client

```
yarn run client
```
Once the client starts, the web app will be available at http://localhost:3000/
### Running both concurrently
Both the server and client can be started concurrently

```
yarn start
```
This will be helpful if you are unable to open two different terminal windows.
## Running the tests

Automated tests are configured for the app.

```
yarn test
```
## Dockerization

The application can be dockerized if needed.

### To dockerize server
Navigate to the server directory
```
cd server
```
Using make to build the docker image
```
make build
```
### To dockerize client
Navigate to the client directory
```
cd client
```
Using make to build the docker image
```
make build
```
### To run the dockerized app
Using make to build the docker image
```
make run-dev
```
## Deployment

The docker containers can be hosted on [Heroku](https://devcenter.heroku.com/).
[Deploying with Docker](https://devcenter.heroku.com/categories/deploying-with-docker) -
Guide to deploying on Heroku 

## Built With

* [**M**ongoDB](https://docs.mongodb.com/) - The database used
* [**E**xpress.js](https://expressjs.com/) - Web application framework used
* [**R**eact.js](https://reactjs.org/docs/getting-started.html) - The front-end JavaScript library used
* [**N**ode.js®](https://nodejs.org/en/docs/) - The back-end JavaScript runtime environment used
* [React-Redux](https://react-redux.js.org/) - The state container used for React
* [Material-UI](https://material-ui.com/) - The React UI framework

## Authors

* **Abisheck Kathirvel** - [abisheckkathir](https://github.com/abisheckkathir) -  
*Front-end, back-end, dockerization and deployment*
* **Ravula Dhanush Reddy** - [dhanushcrueiso](https://github.com/dhanushcrueiso) -  
*Back-end and database*
* **Aaditya U** - [aaditya47](https://github.com/aaditya47) -  
*Back-end and integration testing*
* **Sahasra Bommineni** - [sahasrabommineni](https://github.com/sahasrabommineni) -  
*Unit testing and UI testing*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Made this as a part of the Software Engineering course in junior year
