const path = require('path');
const logger = require("../logger");
const fs = require('fs');
const moment = require('moment');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


/* get Langauge */
async function getLang(){

  langFileEN = process.env.locale_path + "/" + process.env.locale_en;
  langFileCN = process.env.locale_path + "/" + process.env.locale_cn;
  langFileTW = process.env.locale_path + "/" + process.env.locale_tw;

  let rawdataEN = fs.readFileSync(langFileEN);
  let languageContentEN = JSON.parse(rawdataEN);
  let rawdataCN = fs.readFileSync(langFileCN);
  let languageContentCN = JSON.parse(rawdataCN);
  let rawdataTW = fs.readFileSync(langFileTW);
  let languageContentTW = JSON.parse(rawdataTW);

  return {
    languageContentEN,
    languageContentCN,
    languageContentTW
  }
}

/* update Language */
async function updateLang(lang, langRecord){

  now = moment().format("YYYYMMDDHHmmss");

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

  fs.renameSync(oldPath, newPath);

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
};
