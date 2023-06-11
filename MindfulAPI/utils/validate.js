const axios = require('axios');
const fsPromises = require('fs/promises');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

async function validateContent(content){

  const complete_content = "Does \'" + content + "\' contain dirty language or sensitive content? Yes or No."; 
  const messages_content = [{"role": "user", "content": complete_content}];
  const options = {
    'proxy': {
      'protocol': 'http',
      'host': '127.0.0.1',
      'port': 7890
    },
    'method': 'POST',
    'url': 'https://api.openai.com/v1/chat/completions',
    'headers': {
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer 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',
      'Host': 'api.openai.com',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive'
    },
    'data': {
      'model': 'gpt-3.5-turbo',
      //'messages': [{"role": "user", "content": "Does 'fxxk you' contain dirty language or sensitive content? Yes or No."}],
      'messages': messages_content,
      'temperature': 0.7
    }
  };

  //console.log("options.messages[0].content :" , options.data.messages[0].content);

  try {
    const result = await axios(options);
    let chatgptResult = result.data.choices[0].message.content;
    console.log("Yes or No: ", chatgptResult);
    if (chatgptResult.toLowerCase().includes("yes")){
      return 1;
    }else if (chatgptResult.toLowerCase().includes("no")){
      return 0;
    }else{
      return -1;
    }
  } catch (e) {
    return -1;
  }

}

async function validateURL(content){

  try {
    const blackList = await fsPromises.readFile(process.env.BlackListFile, 'utf-8');
    if (blackList.includes(content)){
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