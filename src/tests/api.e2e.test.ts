// import { App } from '../index';
import Api from '../components/services/api';
import express from 'express';
import { AppDataSource } from '../data-source';
import supertest from 'supertest';
import { describe } from "jest-circus";
import { Process } from '../interfaces/process';

const request = supertest;
describe('User testing', () => {
  let user: any;
  let token: string;
  let app: ReturnType<typeof express>;


  beforeAll(async () => {
    await AppDataSource.initialize();
    // process.env.NODE_PORT = '3000';
    // App.init();
    // App.start();
    const App = new Api(<Process>{});
    App.init();
    app = App.App;
    app.listen(3000, () => {
      console.log(`Service ${'api'} at http://localhost:3000`);
    })
  });

  afterAll(async () => {
    await AppDataSource.manager.query("DELETE FROM users WHERE email LIKE 'daniel.marin+22%'");
    await AppDataSource.destroy();
  });

  describe('Login user', () => {
    it('should login user', async () => {
      await request(app)
        .post('/auth/login')
        .send({
          email: "daniel.marin@roweb.ro",
          password: "parola"
        })
        .expect(200)
        .then((res) => {
          token = res.body["auth_token"];
          console.log("token", token)
        })
    });
  });

  describe('Create user', () => {
    it('should create user', async () => {
      await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'testUserFirstName',
          lastName: 'testUserLastName',
          email: "daniel.marin+22@roweb.ro",
          password: "parola"
        })
        .expect(200)
        .then((res) => {
          user = res.body;
          console.log(user)
        });

    })
  })

  describe('Get all users', () => {
    it('should get all users', async () => {
      const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    })
  })
});
