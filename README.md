
> Before starting made sure you have 
> installed the prerequisite software

# Prerequisites

To use this branch, you must have the following software installed. Use the latest stable versions.

-   Node.js - https://nodejs.org/en/download/
-   Git bash - https://git-scm.com/download/
-   PostgresDB - https://www.postgresql.org/download/

# Creating Your Development Environment

Open a git bash terminal, Using 'cd' change directory to where you want to create your installation folder.
For example your root c drive. 
```
cd c:\
```
Next download your hackathon team repo

For Team 1
``` 
https://github.com/jasonmccormack1970/TEAM1.git 
```

For Team 2 
```
https://github.com/jasonmccormack1970/TEAM2.git
```

For Team 3 
```
https://github.com/jasonmccormack1970/TEAM3.git
```

For Team 4
```
https://github.com/jasonmccormack1970/TEAM4.git
```

A new folder called TEANn will have been created. We now need to download and install all the required program dependencies and generates the necessary node_modules folder(s). 
Change directory into your TEAMn folder then run the npm package manager installer
```
cd TEAM1/
npm install
```
Now change directory into the react client folder and run the npm package manager installer
```
cd client
npm install
```
You can close your Git Bash terminal once the npm installer has completed.
Now open the ETNA_MFG_HACKATHON_TEMPLATE folder in Visual Code.
Check that you have a node_modules folder in the root of your project and a second node_modules folder under the client folder.

Now open a Git Bash terminal from within Visual Code and start your development environment.
```
npm run dev
```
You should see the following messages displayed in the terminal window. Note: there will be other information logged, take a moment to check that no errors were encoutered. 

```
Loading mock_api_data.json

Resources
http://localhost:3700/departments
http://localhost:3700/customers
http://localhost:3700/customer_dept

Home
http://localhost:3700

Express GraphQL Server Started ... Listening on Port 3600 - http://localhost:3600/graphql
```

A browser session should also automatically start connecting you to http://localhost:3500/ 
This is the home page of your development environment. 

# Creating Your Postgres Database & Test Data




## NPM Scripts

to start EXPRESS, GRAPHQL, JSON and REACT

```
npm run dev
```

To only start the Express/GraphQL Server

```
npm run server
```

To only start the JSON Server

```
npm run json:server
```

To only start the react-app

```
npm run client
```



## Override Default Port Numbers

From the root of the project

-   Use the client/.env file to set the react_app port number
-   Use the config.json file to set he Express/GraphQL server port number
-   Use the json-server.json file to set the JSON server port number

## How to enable CORS for Express-GraphQL & Apollo Server

If you follow many of the example on how to configure an Express-GraphQL & Apollo Server you may encounter a problem with Cross-origin resource sharing, (CORS)

Example:

```
Access to fetch at 'http://localhost:3100/graphql' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

The CORS middleware has already been implemented on this repo so this common error should not be encountered

```
./lib/index.js
.
.
const cors = require('cors');
.
.
app.use(cors());
```

For more information on what causes this error and how to fix it visit:
https://www.prisma.io/blog/enabling-cors-for-express-graphql-apollo-server-1ef999bfb38d
