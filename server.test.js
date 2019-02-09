const request = require('supertest');
const db = require('./data/dbConfig');
const server = require('./server');

 afterEach(async () => {
   await db('games').truncate();
});

describe('server.js', () => {
  describe('Get /games endpoint', () => {

    it('Responds with a status code of 200', async () => {
        let res = await request(server).get('/games');
        expect(res.status).toBe(200);
    })

    it('Responds with empty array', async () => {
      let expected = [];
      res = await request(server).get('/games');
      expect(res.body).toEqual(expected);
     });

    it('should respond with an array of games', async () => {
       let expected = [
          {  
             id: 1,
             title: 'Pacman',
             genre: 'Arcade',
             releaseYear: 1980,
          },
          {
             id: 2,
             title: 'Snake',
             genre: 'Mobile',
             releaseYear: 1981,
          },
       ];

       let res = await request(server)
         .post('/games')
         .send({
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980,
         });   

         res = await request(server).post('/games').send({
              title: 'Snake',
              genre: 'Mobile',
              releaseYear: 1981,
           });   

         res = await request(server).get('/games');

         expect(res.body).toEqual(expected);
     });
  });

   describe('POST /games endpoint', () => {
     it('Responds with status code 201', async () => {
        let body = {
           title: 'Pacman',
           genre: 'Arcade',
           releaseYear: 1980,
        };

        let res = await request(server).post('/games').send(body);

          expect(res.status).toBe(201);
     });

      it('Returns the id of the created game', async () => {
        let body = {
           title: 'Pacman',
           genre: 'Arcade',
           releaseYear: 1980,
        };

        let res = await request(server).post('/games').send(body);
          expect(res.body).toEqual([1]);
     });

      it('Returns the id of the created game', async () => {
        let body = {
           genre: 'Arcade',
           releaseYear: 1980,
        };

        let res = await request(server)
          .post('/games')
          .send(body);

           expect(res.status).toEqual(422);
      })
   })
})