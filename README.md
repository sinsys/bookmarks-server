# Bookmarks API

This is an API that can be utilized for the bookmarks client covered earlier in the curriculum.

## Authentication

View the `./src/authenticate.js` file for details to mock authentication for grading.

## Endpoints

  - GET `/bookmark`
    - Returns all bookmarks in our store
  - POST `/bookmark`
    - Adds a bookmark to our store
    - Expected format for body is JSON:
      - `title`: `string`
      - `url`: `string` (example.com, www.example.com, http(s)://www.example.com)
      - `desc`: `string`
      - `rating`: `number` (1-5 only)
  - GET `/bookmark/:id`
    - Returns a single bookmark
  - DELETE `/bookmark/:id`
    - Deletes a bookmark from our store

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Run tests and continue watching `npm watch`

## Requirements

  - Use the boilerplate to start a new application named bookmarks-server
  - Configure logging and API key handling middleware on the server
  - Write a route handler for the endpoint GET /bookmarks that returns a list of bookmarks
  - Write a route handler for the endpoint GET /bookmarks/:id that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid
  - Write a route handler for POST /bookmarks that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.
  - Write a route handler for the endpoint DELETE /bookmarks/:id that deletes the bookmark with the given ID.