const axios = require('axios');
const fsPromises = require('fs/promises');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

async function validateContent(content){

  // check if validateContent is turned on
  if (process.env.enableValidateContent == "false"){
    return 1;
  }

  const complete_content = "Does \'" + content + "\' contain dirty language or sensitive content? Yes or No."; 
  const messages_content = [{"role": "user", "content": complete_content}];
  let result;

  // define option contents
  const optionsNoProxy = {
    'method': 'POST',
    'url': process.env.chatgptUrl,
    'headers': {
      'Content-Type': 'application/json', 
      'Authorization': process.env.chatgptAuthorization,
      'Host': process.env.chatgptHost,
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive'
    },
    'data': {
      'model': process.env.chatgptModel,
      'messages': messages_content,
      'temperature': process.env.chatgptTemperature
    }
  };

  const optionsProxy = {
    'proxy': {
      'protocol': 'http',
      'host': '127.0.0.1',
      'port': 7890
    },
    'method': 'POST',
    'url': process.env.chatgptUrl,
    'headers': {
      'Content-Type': 'application/json', 
      'Authorization': process.env.chatgptAuthorization,
      'Host': process.env.chatgptHost,
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive'
    },
    'data': {
      'model': process.env.chatgptModel,
      'messages': messages_content,
      'temperature': process.env.chatgptTemperature
    }
  };

  try {
    if (process.env.chatgptIfProxy == "false"){
      result = await axios(optionsNoProxy);
    }else{
      result = await axios(optionsProxy);
    }
    let chatgptResult = result.data.choices[0].message.content;
    console.log("chatgptResult: ", chatgptResult);
    if (chatgptResult.toLowerCase().includes("yes")){
      return 0;
    }else if (chatgptResult.toLowerCase().includes("no")){
      return 1;
    }else{
      return -1;
    }
  } catch (e) {
    //console.log(e);
    return -1;
  }

}

async function validateURL(content){

  // check if validateContent is turned on
  if (process.env.enableValidateURL == "false"){
    return 1;
  }

  try {
    const blackList = await fsPromises.readFile(process.env.BlackListFile, 'utf-8');
    const domain = content.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1];
    //console.log("Domain: ", domain);
    if (blackList.includes(domain)){
      //return ("Error 001: URL contains explicit content");
      return 0;
    }else{
      return 1;
    }
  } catch (err) {
    console.error(err)
    return -1;
  }

}

module.exports = {
  validateContent,
  validateURL
};