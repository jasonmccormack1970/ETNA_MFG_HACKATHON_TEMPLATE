# Prerequisites

To use this branch, you must have the following software installed. Use the latest stable versions.

-   Node.js - https://nodejs.org/en/download/
-   Git bash - https://git-scm.com/download/
-   MongoDB - https://www.mongodb.com/download-center/community
-   PostgresDB - https://www.postgresql.org/download/

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
