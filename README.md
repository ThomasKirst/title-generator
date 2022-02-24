# Title Builder

This Web App lets you build titles which you can later use in streaming software, for instance.

It is built with NextJS, React, TypeScript, and Tailwind CSS.

## Live Example

Here you can see a running preview of the app:

-> https://title-generator.vercel.app/

## Setup

In order to run the app on your local computer: clone the repository, change into the newly created directory and run `npm install`.

Make sure to set some local environment variables as described in the next paragraph.

## Environment Variables

It is important to set these variables in your local environment file `.env.local`.

| Variable    | Value                                     |
| ----------- | ----------------------------------------- |
| MONGODB_URI | mongodb://localhost:27017/title-generator |
| APP_URL     | http://localhost:3000                     |

## Notes

The app uses MongoDB in order to persist the titles. With the generated deep links of the titles they can later be embedded as a browser source within OBS Studio or any other similar streaming solution.

## Deployment

Feel free to deploy your app to vercel, it is currently the easiest way to get the app running live on the web.

As for the database: MongoDB Atlas would be recommended since the service allows a simple setup and easy configuration.

Enjoy creating colorful titles! :)
