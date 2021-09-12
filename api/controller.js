
const wordsModule = require('../randomWordsManipulation');
const Player = require('./models');

const teams = []
const players =  []

module.exports = {

    /* words ---------------- */

    async getWords(req, res){
        try{
            const words = await wordsModule.getWords()
            return  res.json(words);
        }catch(err){
            res.json({status: 'Error', message: err})
        }
    },

    /* players ---------------- */

    async getPlayers(req, res){
        return res.json(players);
    },

    async savePlayer(req, res){
        players.push(req.player);
    },

    async deletePlayer(req, res){
        
    },

    async updatePlayer(req, res){
        
    }

}
