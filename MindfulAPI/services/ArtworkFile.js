const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const util = require("util");
const multer = require("multer");
const fs = require('fs');
//const baseUrl = "http://localhost:8080/files/";
const uploadFile = require("./upload");

// upload artwork file
async function upload(req, res){

  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
  
}

// list artwork files in the directory
async function getListFiles(res){

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

    const fileName = req.params.filename;
    const directoryPath = path.resolve(__dirname, '../resources/static/assets/uploads') + '/';
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
    });
}

// delete artwork file
async function remove(req, res){

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
