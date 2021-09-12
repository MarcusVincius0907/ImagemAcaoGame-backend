const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = 'https://www.palabrasaleatorias.com/palavras-aleatorias.php?fs=5&fs2=0&Submit=Nova+palavra'

async function getWords(){
  
  const response  = await axios({
    method: 'get',
    url: url,
  })

  const dom = new JSDOM(response.data);
  const words = []
  dom.window.document.querySelectorAll("table > tbody > tr > td > div").forEach(div => {
    if(div.textContent)
      words.push(
        div.textContent.replace('\n', '')
      );
  })

  return words;

}

module.exports = {
  getWords
}