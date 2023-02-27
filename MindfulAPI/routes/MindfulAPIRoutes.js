const express = require('express');
const router = express.Router();
const Event = require('../services/Event');
const NFT = require('../services/Nft');
const Artwork = require('../services/Artwork');
const User = require('../services/User');
const Language = require('../services/Language');
const logger = require("../logger");

/* GET event */
router.get('/event', async function(req, res, next) {
  try {
    res.json(await Event.getEvent(req.query.eventId, req.query.title, req.query.startTime, req.query.endTime));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

/* POST event */
router.post('/event', async function(req, res, next) {
  try {
    res.json(await Event.createEvent(req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* PUT event */
router.put('/event/:id', async function(req, res, next) {  
  try {
    res.json(await Event.updateEvent(req.params.id, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

/* GET NFT Details */
router.get('/nft/:type/:address', async function(req, res, next) {  
  try {
    res.json(await NFT.getNFT(req.params.type, req.params.address));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

/* GET total no. of NFT */
router.get('/nfttotal/:type', async function(req, res, next) {  
  try {
    res.json(await NFT.getNFTTotal(req.params.type));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

/* GET language file */
router.get('/language/:lang', async function(req, res, next) {
  try {
    res.json(await Language.getLang(req.params.lang));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

/* PUT langauge file */
router.put('/language/:lang', async function(req, res, next) {
  try {
    res.json(await Language.updateLang(req.params.lang, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});


module.exports = router;
