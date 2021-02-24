import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Users", () => {
	beforeAll(async () => {
		const connection = await createConnection()
		await connection.runMigrations();
	})

	it("Should be able to create a new user", async () => {
		const response = await request(app).post("/Users")
			.send({
				email: "eu@gmail.com",
				name: "User Test"
			})

		expect(response.status).toBe(200);
	})

	it("Should not be able to create a user with exists email", async () => {
		const response = await request(app).post("/Users")
			.send({
				email: "eu@gmail.com",
				name: "User Test"
			})

		expect(response.status).toBe(400);
	})

})