const express = require('express');
const uuid = require('uuid');
const logger = require('./logger');
const bodyParser = express.json();
const bookmarksRouter = express.Router();

const { bookmarks } = require('./BOOKMARKS')
const { PORT } = require('./config');

bookmarksRouter
  .route('/bookmark')

  .get( (req, res) => {
    res
      .json(bookmarks);
  })
  
  .post(bodyParser, (req, res) => {
    const {
      title,
      url,
      desc,
      rating
    } = req.body;

    if ( !title ) {
      logger.error(`Title is required`);
      return (
        res
          .status(400)
          .send('Invalid data')
      );
    };

    if ( !url ) {
      logger.error(`URL is required`);
      return (
        res
          .status(400)
          .send('Invalid data')
      );
    };

    const validUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    if ( !validUrl.test(url) ) {
      logger.error(`URL is incorrect format`);
      return (
        res
          .status(400)
          .send('Invalid data')
      );
    };

    if ( !desc ) {
      logger.error(`Description is required`);
      return (
        res
          .status(400)
          .send('Invalid data')
      );
    };

    if ( !rating ) {
      logger.error(`Rating is required`);
      return (
        res
          .status(400)
          .send('Invalid data')
      );
    };

    if ( isNaN(parseInt(rating)) ) {
      logger.error(`Rating must be a number`);
      return (
        res
        .status(400)
        .send('Invalid data')
      );
    };

    if ( 
      rating < 1 ||
      rating > 5
     ) {
      logger.error(`Rating must be a number between 1 and 5`);
      return (
        res
        .status(400)
        .send('Invalid data')
      );
    };

    const id = uuid();
    const bookmark = {
      id,
      title,
      url,
      desc,
      rating
    };

    bookmarks.push(bookmark);

    logger.info(
      `Bookmark with id ${id} created`
    );

    res
      .status(201)
      .location(`http://localhost:${PORT}/bookmark/${id}`)
      .json(bookmark);
  });

bookmarksRouter
  .route('/bookmark/:id')

  .get( (req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(bookmark =>
      bookmark.id === id  
    );

    if ( !bookmark ) {
      logger.error(`Bookmark with id ${id} not found`);
      return (
        res
        .status(404)
        .send(`Bookmark not found`)
      );
    };

    res
      .json(bookmark);
  })

  .delete( (req, res) => {
    const { id } = req.params;

    const bookmarkIndex = bookmarks.find(bookmark =>
      bookmark.id === id  
    );

    if ( bookmarkIndex === -1 ) {
      logger.error(`Bookmark with id ${id} not found`);
      return (
        res
          .status(404)
          .send(`Resource not found`)
      );
    };

    bookmarks.splice(bookmarkIndex, 1);
    
    logger.info(`Bookmark with id ${id} deleted`);
    
    res
      .status(204)
      .end();
  });

module.exports = bookmarksRouter;