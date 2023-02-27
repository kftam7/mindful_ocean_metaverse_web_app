//const db = require('../db');
//const helper = require('../helper');
//const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
//const fileSystem = require("browserify-fs");
const fs = require('fs');
const moment = require('moment');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


/* get Langauge */
async function getLang(lang){


  if (lang == "EN"){
    langFile = process.env.locale_path + "/" + process.env.locale_en;
  }else if (lang == "CN"){
    langFile = process.env.locale_path + "/" + process.env.locale_cn;
  }else if (lang == "TW"){
    langFile = process.env.locale_path + "/" + process.env.locale_tw;
  }

/*
  //console.log(langFile);
  fileSystem.readFile("../langauge_file/locale_en.json", (err, data) => {
  if(err) {
   console.log("File reading failed", err)
   //return
  }
    console.log("File data:", data)
  })
*/

  let rawdata = fs.readFileSync(langFile);
  let languageContent = JSON.parse(rawdata);
  //console.log(langaugeContent);

  //import data from '../langauge_file/locale_en.json' assert { type: 'JSON' };
  //import data from '../langauge_file/locale_en.json';
  //const data = helper.emptyOrRows(rows);
  //const meta = "1";

  return {
    //data,
    languageContent
  }
}

/* update Language */
async function updateLang(lang, langRecord){

  now = moment().format("YYYYMMDDHHmmss");
  //var jsonContent = JSON.stringify(langRecord);


  if (lang == "EN"){
    oldPath = process.env.locale_path + "/" + process.env.locale_en;
    newPath = process.env.locale_path + "/" + process.env.locale_en + "." + now;
  }else if (lang == "CN"){
    oldPath = process.env.locale_path + "/" + process.env.locale_cn;
    newPath = process.env.locale_path + "/" + process.env.locale_cn + "." + now;
  }else if (lang == "TW"){
    oldPath = process.env.locale_path + "/" + process.env.locale_tw;
    newPath = process.env.locale_path + "/" + process.env.locale_tw + "." + now;
  }

  //console.log(oldPath);
  //console.log(newPath);
  //console.log(langRecord);

  fs.renameSync(oldPath, newPath);

  //console.log(oldPath);
  
  fs.writeFile(oldPath, JSON.stringify(langRecord), (error) => {
    if (error){
      console.log("An error occured while writing JSON Object to File.");
    } 
  });

  var success = 1;
  
  return {
    success
  }
  
}

module.exports = {
  getLang,
  updateLang
  /*
  createEvent,
  updateEvent
  */
};
