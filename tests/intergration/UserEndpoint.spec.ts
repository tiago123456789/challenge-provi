import app from "../../src/config/Server";
import request from "supertest";
import connection from "../../src/config/Database";
import { Db } from "mongodb";
import UserRepository from "../../src/repositories/UserRepository";
import UserRepositoryFactory from "../../src/factories/UserRepositoryFactory";

describe("Integration tests endpoint /api/v1/users", () => {

    beforeEach(async () => {
        const connectionDB: Db | null = await connection;
        // @ts-ignore
        await connectionDB.collection("users").remove({ });
    })

    it("POST /api/v1/users return statusCode 400", (done) => {
        request(app)
            .post('/api/v1/users')
            .send({ email: "", password: "" })
            .expect(400, done);
    });

    it("POST /api/v1/users return statusCode 200", (done) => {
        request(app)
            .post('/api/v1/users')
            .send({
                "email": "test@gmail.com",
                "password": "123456789"
            })
            .expect(200, done);
    })

    it("POST /api/v1/users return statusCode 403", (done) => {
        request(app)
            .post('/api/v1/users/cpf-teste')
            .send({
                "token": "test@gmail.com",
                "data": "123456789"
            })
            .expect(403, done);
    });

    it("POST /api/v1/users return statusCode 409", async (done) => {
        const userRepository = new UserRepositoryFactory().make({});
        await userRepository.save(
            {
                "email" : "test@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "nextStep" : "cpf"
            }
        );
        request(app)
            .post('/api/v1/users')
            .send(  {
                "email" : "test@gmail.com",
                "password" : "123456789",
            })
            .expect(409, done);
    });


    it("POST /api/v1/users/cpf-test return statusCode 400", async (done) => {
        const userRepository = new UserRepositoryFactory().make({});
        await userRepository.save(
            {
                "email" : "test@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "nextStep" : "cpf"
            }
        );
        request(app)
            .post('/api/v1/users/cpf-test')
            .send(  {
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "data" : "123456789",
            })
            .expect(400, done);
    });

    it("POST /api/v1/users/cpf return statusCode 400 due data invalid", async (done) => {
        const userRepository = new UserRepositoryFactory().make({});
        await userRepository.save(
            {
                "email" : "test@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "nextStep" : "cpf"
            }
        );
        request(app)
            .post('/api/v1/users/cpf')
            .send(  {
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "data" : "123456789",
            })
            .expect(400, done);
    });

    it("POST /api/v1/users/cpf return statusCode 409 due update data duplicate", async (done) => {
        const userRepository = new UserRepositoryFactory().make({});
        await userRepository.save(
            {
                "email" : "test@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "nextStep" : "cpf",
                "cpf": [
                    { data: "500.150.920-38", createdAt: new Date() }
                ]
            }
        );

        await userRepository.save(
            {
                "email" : "test111@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959adafdsafa",
                "nextStep" : "cpf",
                "cpf": [
                    { data: "500.150.920-38", createdAt: new Date() }
                ]
            }
        );
        request(app)
            .post('/api/v1/users/full-name')
            .send(  {
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959adafdsafa",
                "data" : "500.150.920-38",
            })
            .expect(409, done);
    });

    it("POST /api/v1/users/cpf return statusCode 409 due update data duplicate", async (done) => {
        const userRepository = new UserRepositoryFactory().make({});
        await userRepository.save(
            {
                "email" : "test@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "nextStep" : "cpf"
            }
        );
        request(app)
            .post('/api/v1/users/full-name')
            .send(  {
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "data" : "500.150.920-38",
            })
            .expect(409, done);
    });

    it("POST /api/v1/users/cpf return statusCode 409 due update data duplicate", async (done) => {
        const userRepository = new UserRepositoryFactory().make({});
        await userRepository.save(
            {
                "email" : "test@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959aa",
                "nextStep" : "cpf",
                "cpf": [
                    { data: "500.150.920-38", createdAt: new Date() }
                ]
            }
        );

        await userRepository.save(
            {
                "email" : "test111@gmail.com",
                "password" : "123456789",
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959adafdsafa",
                "nextStep" : "cpf",
                "cpf": [
                    { data: "500.150.920-38", createdAt: new Date() }
                ]
            }
        );
        request(app)
            .post('/api/v1/users/full-name')
            .send(  {
                "token" : "ca88cc54-8d87-43c7-a673-b3813f7959adafdsafa",
                "data" : "500.150.920-38",
            })
            .expect(409, done);
    });
});