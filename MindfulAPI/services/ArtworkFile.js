const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const util = require("util");
const multer = require("multer");
const fs = require('fs');
//const baseUrl = "http://localhost:8080/files/";
const uploadFile = require("../utils/upload");

// upload artwork file
async function upload(req, res){

  logger.log('info', '%s %s %s', 'ArtworkFile', 'upload');

  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      logger.log('error', '%s %s File doesn\'t exist', 'ArtworkFile', 'upload');
      return res.status(400).send({ message: "Please upload a file!" });
    }

    logger.log('info', '%s %s %s Uploaded the file successfully', 'ArtworkFile', 'upload', req.file.originalname);
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });

  } catch (err) {

    if (err.code == "LIMIT_FILE_SIZE") {
      logger.log('error', '%s %s %s File size cannot be larger than 2MB!', 'ArtworkFile', 'upload', req.file.originalname);
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    logger.log('error', '%s %s %s Error: %s', 'ArtworkFile', 'upload', req.file.originalname, err);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
  
}

// list artwork files in the directory
async function getListFiles(res){

  logger.log('info', '%s %s', 'ArtworkFile', 'getListFiles');

  const directoryPath = path.resolve(__dirname, '../resources/static/assets/uploads') + '/';

  fs.readdir(directoryPath, function (err, files) {
      if (err) {
          //return ("Unable to scan files!")
          res.status(500).send({
            message: "Unable to scan files!",
          });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: process.env.artworkFileBaseURL + file,
        });
      });
      
      //console.log(fileInfos);
      res.status(200).send(fileInfos);
  });

}

// download artwork file
async function download(req, res){

  logger.log('info', '%s %s %s', 'ArtworkFile', 'download', req.params.filename);

  const fileName = req.params.filename;
  const directoryPath = path.resolve(__dirname, '../resources/static/assets/uploads') + '/';
  const fullFileName = directoryPath + fileName;
  fs.readFile(fullFileName, function(err, data) {
    if(err) {
      res.send("Oops! Couldn't find that file.");
    } else {
      // set the content type based on the file
      res.contentType(fileName);
      res.send(data);
    }
    res.end();
  });

}

// delete artwork file
async function remove(req, res){

  logger.log('info', '%s %s %s', 'ArtworkFile', 'remove', req.params.filename);
  const fileName = req.params.filename;
  const directoryPath = path.resolve(__dirname, '../resources/static/assets/uploads') + '/';

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });

}   

module.exports = {
    upload,
    getListFiles,
    download,
    remove
};
