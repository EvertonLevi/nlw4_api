import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Suveys", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations();
    })

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys")
            .send({
                title: "Title example",
                description: "Description example"
            })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    })
})