const express = require('express');
const router = express.Router();
const Event = require('../services/Event');
const NFT = require('../services/Nft');
const Artwork = require('../services/Artwork');
const User = require('../services/User');
const Language = require('../services/Language');
const AppVersion = require('../services/AppVersion');
const JoinedEvent = require('../services/JoinedEvent');
const PersonalWebsite = require('../services/PersonalWebsite');
const logger = require("../logger");


////////////////// User
/* GET user - ALL*/
router.get('/user', async function(req, res, next) {
  try {
    res.json(await User.getUser());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

/* GET user - Particular user*/
router.get('/user/:appleId', async function(req, res, next) {
  try {
    res.json(await User.getUser(req.params.appleId));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});


/* POST user */
router.post('/user', async function(req, res, next) {
  try {
    res.json(await User.createUser(req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});


/* PUT user */
router.put('/user/:appleId', async function(req, res, next) {  
  try {
    res.json(await User.updateUser(req.params.appleId, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});


////////////////// Event
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

////////////////// NFT
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

////////////////// Language File
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

////////////////// AppVersion
/* GET AppVersion */
router.get('/appversion/:version', async function(req, res, next) {
  try {
    res.json(await AppVersion.getAppVersion(req.params.version));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* POST AppVersion */
router.post('/appversion', async function(req, res, next) {
  try {
    res.json(await AppVersion.createAppVersion(req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* PUT AppVersion */
router.put('/appversion/:version', async function(req, res, next) {  
  try {
    res.json(await AppVersion.updateAppVersion(req.params.version, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

////////////////// Artwork
/* GET AppVersion */
router.get('/artwork', async function(req, res, next) {
  try {
    res.json(await Artwork.getArtwork());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

router.get('/artwork/:appleId', async function(req, res, next) {
  try {
    res.json(await Artwork.getArtwork(req.params.appleId));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* POST AppVersion */
router.post('/artwork', async function(req, res, next) {
  try {
    res.json(await Artwork.createArtwork(req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* PUT AppVersion */
router.put('/artwork/:artworkId', async function(req, res, next) {  
  try {
    res.json(await Artwork.updateArtwork(req.params.artworkId, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

////////////////// JoinedEvent
/* GET JoinedEvent */
router.get('/joinedevent', async function(req, res, next) {
  try {
    res.json(await JoinedEvent.getJoinedEvent());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

router.get('/joinedevent/:appleId', async function(req, res, next) {
  try {
    res.json(await JoinedEvent.getJoinedEvent(req.params.appleId));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* POST JoinedEvent */
router.post('/joinedevent', async function(req, res, next) {
  try {
    res.json(await JoinedEvent.createJoinedEvent(req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* PUT JoinedEvent */
router.put('/joinedevent/:joinedEventId', async function(req, res, next) {  
  try {
    res.json(await JoinedEvent.updateJoinedEvent(req.params.joinedEventId, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

////////////////// PersonalWebsite
/* GET PersonalWebsite */
router.get('/personalwebsite', async function(req, res, next) {
  try {
    res.json(await PersonalWebsite.getPersonalWebsite());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

router.get('/personalwebsite/:appleId', async function(req, res, next) {
  try {
    res.json(await PersonalWebsite.getPersonalWebsite(req.params.appleId));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* POST PersonalWebsite */
router.post('/personalwebsite', async function(req, res, next) {
  try {
    res.json(await PersonalWebsite.createPersonalWebsite(req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* PUT PersonalWebsite */
router.put('/personalwebsite/:websiteId', async function(req, res, next) {  
  try {
    res.json(await PersonalWebsite.updatePersonalWebsite(req.params.websiteId, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

module.exports = router;
