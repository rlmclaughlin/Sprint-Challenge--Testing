const express = require('express') 
const middleware = require('./middleware')
const db = require('./data/dbConfig')
const server = express()

middleware(server)

server.get('/', async (req, res) => {
    res.status(200).json({message: 'api loaded'});
 });

 server.get('/games', async (req, res) => {
    const games = await db('games');

    try {
    res.status(200).json(games);
    } catch (err) {
    res.status(500).json({
        message: 'error finding games'
    });    
  }
});
 
server.post('/games', async (req, res) => {
  const game = req.body;

  try { 
    const result = await db('games').insert(game).into('games') 
    res.status(201).json(result);
    }
    catch (err) {
       res.status(422).json({message: "error adding game"
      });
    }
});
 
  module.exports = server;
 
  
 