import axios from 'axios';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = 'https://www.palabrasaleatorias.com/palavras-aleatorias.php?fs=5&fs2=0&Submit=Nova+palavra'

export default async function getWords(){

  try{
    const response  = await axios({
      method: 'get',
      url: url,
    })
  
    const dom = new JSDOM(response.data);
    const words: string[] = []
    const divList: any[] = dom.window.document.querySelectorAll("table > tbody > tr > td > div")
    divList.forEach(div => {
      if(div.textContent)
        words.push(
          div.textContent.replace('\n', '')
        );
    })
    return words;
  }catch(err){
    throw err;
  }

}