# Canada Food Guide

The Canada Food Guide is an online service provided by the Government of Canada to help Canadians improve their health through healthy eating. This repository contains the frontend codebase for the project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Project Structure

The project is organized using the following structure:
<pre>
├── public
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src
│   ├── api       // contains the mock data provided, all schema interfaces, and a useApi custom hook
│   ├── components   // has other building block components and related resources (custom hooks, string constants, styles...)
│   ├── pages       // has the main DailyFoodGuide component (and related resources) rendered within the App.js
│   ├── redux
│   ├── App.js
│   ├── index.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
└── package.json
</pre>


## TODO
- Additional Testing
- Registration Form Data Validation and matching styling
- Consolidation of all string constants to the string constant files
- Comprehensive user asessibility testing and fixes
- COmprehensive testing on different devices
