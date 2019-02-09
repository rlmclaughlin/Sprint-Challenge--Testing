const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

 afterEach(async () => {
   await db('games').truncate();
});

describe('server.js', () => {
  describe('Get /games endpoint', () => {

    it('Responds with a status code of 200', async () => {
        let response = await request(server).get('/games');
        expect(response.status).toBe(200);
    })

    it('Responds with JSON', async () => {
        let response = await request(server).get('/games');
        expect(response.type).toMatch(/json/i);
     });

    it('Responds with empty array', async () => {
      let expected = [];
      let response = await request(server).get('/games');
      expect(response.body).toEqual(expected);
     });

    it('should respond with an array of games', async () => {
       let expected = [
          {
             title: 'Pacman',
             genre: 'Arcade',
             releaseYear: 1980,
          },
          {
             title: 'Snake',
             genre: 'Mobile',
             releaseYear: 1981,
          },
       ];

       let response = await request(server)
         .post('/games')
         .send({
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980,
         });   

         response = await request(server)
           .post('/games')
           .send({
              title: 'Snake',
              genre: 'Mobile',
              releaseYear: 1981,
           });   

         response = await request(server).get('/games');

         expect(response.body).toEqual(expected);
     });
  });

   describe('POST /games endpoint', () => {
     it('Responds with status code 201', async () => {
        let body = {
           title: 'Pacman',
           genre: 'Arcade',
           releaseYear: 1980,
        };

        let res = await request(server)
          .post('/games')
          .send(body);
          expect(res.status).toBe(201);
     });

      it('Returns the id of the created game', async () => {
        let body = {
           title: 'Pacman',
           genre: 'Arcade',
           releaseYear: 1980,
        };

        let res = await request(server)
          .post('/games')
          .send(body);
          expect(res.body).toEqual([1]);
     });

      it('Returns the id of the created game', async () => {
        let body = {
           title: 'Pacman',
           genre: null,
           releaseYear: 1980,
        };

        let res = await request(server)
          .post('/games')
          .send(body);

           expect(res.status).toEqual(422);
      })
   })
})