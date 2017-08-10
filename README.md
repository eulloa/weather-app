## weather-app
A simple React application that uses data fetched from [Open Weather Map](http://openweathermap.org/) to build the UI and bundles the project with [Webpack](https://webpack.js.org/).

##Available Scripts
The following scripts are available to be run at the root of the project directory.

**Prior to running the project locally, make sure to install all project dependencies by running `npm install` at the project root.**

`npm start`
Uses Webpack's [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) to run the project in dev mode. It also leverages the hot-reload feature, to speed up application development.

`npm run build`
Creates an optimized build of the project with Webpack, per the configuration options in the project's webpack.config.js file.