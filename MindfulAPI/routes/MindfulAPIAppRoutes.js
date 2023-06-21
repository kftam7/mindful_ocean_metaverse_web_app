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
const Credential = require('../services/Credential');
const AppleAuth = require('../services/AppleAuth');
const SignIn = require('../services/SignIn');
const ArtworkFile = require('../services/ArtworkFile');
const Wallet = require('../services/Wallet');
const logger = require("../logger");
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

////////////////// Sign In
/* POST SignIn */
router.post('/signin/:appleId', async function(req, res, next) {
  try {
    res.json(await SignIn.signin(req));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});


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

/* PUT user personal info */
router.put('/userpersonalinfo/:appleId', async function(req, res, next) {  
  try {
    res.json(await User.updateUserPersonalInfo(req.params.appleId, req.body));
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
router.get('/nft/:type/:idtype/:id', async function(req, res, next) {  
  try {
    res.json(await NFT.getNFT(req.params.type, req.params.idtype, req.params.id));
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
router.get('/language', async function(req, res, next) {
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
/* GET all Artwork */
router.get('/artwork', async function(req, res, next) {
  try {
    res.json(await Artwork.getArtwork());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* GET Artwork by appleId */
router.get('/artwork/:appleId', async function(req, res, next) {
  try {
    res.json(await Artwork.getArtwork(req.params.appleId));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* GET Artwork for homepage */
router.get('/artworkhomepage', async function(req, res, next) {
  try {
    res.json(await Artwork.getHomepageArtwork());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* POST Artwork */
router.post('/artwork', async function(req, res, next) {
  try {
    res.json(await Artwork.createArtwork(req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* PUT Artwork */
router.put('/artwork/:artworkId', async function(req, res, next) {  
  try {
    res.json(await Artwork.updateArtwork(req.params.artworkId, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

/* PUT minted Artwork */
router.put('/setmintedartwork/:artworkId', async function(req, res, next) {  
  try {
    res.json(await Artwork.setMintedArtwork(req.params.artworkId));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

/* POST Artwork Files on NFT Storage*/
router.post('/nftstorage/:artworkId', async function(req, res, next) {
  try {
    res.json(await Artwork.nftStorage(req.params.artworkId));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
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
router.post('/personalwebsite/:appleId', async function(req, res, next) {
  try {
    res.json(await PersonalWebsite.createPersonalWebsite(req.params.appleId, req.body));
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

////////////////// Credential
/* GET credential */
router.get('/credential/:login/:credential', async function(req, res, next) {
  try {
    res.json(await Credential.getCrendential(req.params.login,req.params.credential, req.body));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

////////////////// Apple Login
/* GET Apple Login */
router.get('/applelogin', async function(req, res, next) {
  try {
    res.send(await AppleAuth.login());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

/* POST Apple Auth */
router.post('/appleauth', bodyParser.urlencoded({ extended: false }), async function(req, res, next) {
  try {
    //res.json(await AppleAuth.auth(req));
    //const token = JSON.stringify((await AppleAuth.auth(req)));
    //console.log(token);
    //res.redirect(process.env.redirect_address);
    //res.redirect(307, process.env.redirect_address);
    //const param = "?state=1234&code=1243&id_token=1234";
     const param = await AppleAuth.auth(req);
     //console.log(param);
     res.redirect(process.env.redirect_address + param);

  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

/* GET Apple Token */
router.get('/appletoken', async function(req, res, next) {
  try {
    res.send(await AppleAuth.token());
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

/* GET Apple Refresh */
router.get('/applerefresh', async function(req, res, next) {
  try {
    res.json(await AppleAuth.refresh(req));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while getting  `, err.message);
    next(err);
  }
});

////////////////// Artwork Files
/* Upload Artwork Files */
router.post('/artworkfile', async function(req, res, next) {
  try {
    await ArtworkFile.upload(req, res);
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* GET Artwork Files List */
router.get('/artworkfile', async function(req, res, next) {
  try {
    await ArtworkFile.getListFiles(res);
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* Download Artwork Files */
router.get('/artworkfile/:filename', async function(req, res, next) {
  try {
    await ArtworkFile.download(req, res);
  } catch (err) {
    logger.log('error', 'Error while downloading file', err.message);
    console.error(`Error while downloading file`, err.message);
    next(err);
  }
});

/* DELETE Artwork Files */
router.delete('/artworkfile/:filename', async function(req, res, next) {
  try {
    await ArtworkFile.remove(req, res);
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});


////////////////// Crypto Wallet
/* Update wallet address */
router.post('/updatewallet/:appleId/:walletAddress', async function(req, res, next) {
  try {
    res.json(await Wallet.updateWallet(req.params.appleId, req.params.walletAddress));
  } catch (err) {
    logger.log('error', 'Error while getting %s', err.message);
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});


module.exports = router;
