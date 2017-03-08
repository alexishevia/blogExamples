# Using CORS in Express
This is an example application that uses the concepts explained on my [Using
CORS in Express](https://medium.com/trisfera/) blog post.

## Getting Started
The example is made up of 2 individual applications: `backend/` and `frontend/`.
They both run on NodeJS (tested on v4.7.3), but are served from different ports
to force CORS usage.

### Backend
1. `cd` to the `backend/` directory
2. Install dependencies with `yarn`
3. Run `npm start`

The backend app should now be available on [http://localhost:3000](http://localhost:3000)

### Frontend
1. `cd` to the `frontend/` directory
2. Install dependencies with `yarn`
3. Run `npm start`

The frontend app should now be available on [http://localhost:9080](http://localhost:9080)

### Expected behaviour
You should see your frontend app making a CORS request to the backend, and
being able to read the `X-Foo` custom header.

If you reload the frontend app, you'll see that the `sessionId` cookie is being
sent to the backend correctly (take a look at the backend logs).
