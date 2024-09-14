import request from "supertest";
import app from "../../app";

describe("POST /products", () => {
	it("should display validation errors", async () => {
		const response = await request(app).post("/products").send({});

		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(4);
		expect(response.statusCode).toBe(400);

		expect(response.statusCode).not.toBe(201);
		expect(response.statusCode).not.toBe(404);
	});

	it("should validate the price is greater than 0", async () => {
		const response = await request(app).post("/products").send({
			name: "Mouse - Testing",
			price: 0
		});

		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.statusCode).toBe(400);

		expect(response.statusCode).not.toBe(201);
		expect(response.statusCode).not.toBe(404);
	});

	it("should validate the price is a number and greater than 0", async () => {
		const response = await request(app).post("/products").send({
			name: "Mouse - Testing",
			price: "hola"
		});

		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(2);
		expect(response.statusCode).toBe(400);

		expect(response.statusCode).not.toBe(201);
		expect(response.statusCode).not.toBe(404);
	});

	it("should create a new product", async () => {
		const response = await request(app).post("/products").send({
			name: "Mouse - Testing",
			price: 50
		});

		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty("data");
		expect(response.headers["content-type"]).toMatch(/json/);

		expect(response.statusCode).not.toBe(200);
		expect(response.statusCode).not.toBe(404);
		expect(response.body).not.toHaveProperty("errors");
	});
});

describe("GET /products", () => {
	it("should check if /products url exists", async () => {
		const response = await request(app).get("/products");

		expect(response.status).not.toBe(404);
	});

	it("should get a JSON response with all products", async () => {
		const response = await request(app).get("/products");

		expect(response.status).toBe(200);
		expect(response.header["content-type"]).toMatch(/json/);
		expect(response.body).toHaveProperty("data");

		expect(response.body).not.toHaveProperty("errors");
		expect(response.status).not.toBe(404);
	});
});

describe("GET /products/:id", () => {
	it("should return a 404 response for a non-existent product", async () => {
		const productId = 2000;
		const response = await request(app).get(`/products/${productId}`);

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Product Not Found");

		expect(response.body).not.toHaveProperty("data");
		expect(response.statusCode).not.toBe(200);
	});

	it("should check a valid ID in the URL", async () => {
		const response = await request(app).get(`/products/hello`);

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("Invalid ID");

		expect(response.body).not.toHaveProperty("data");
		expect(response.statusCode).not.toBe(200);
	});

	it("should get a JSON response with a single product", async () => {
		const response = await request(app).get(`/products/1`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("data");

		expect(response.body).not.toHaveProperty("errors");
		expect(response.statusCode).not.toBe(404);
	});
});

describe("PUT /products/:id", () => {
	it("should validate the price is greater than 0", async () => {
		const response = await request(app).put("/products/1").send({
			name: "Monitor Curvo - Testing",
			availability: true,
			price: 0
		});

		expect(response.body).toHaveProperty("errors");
		expect(response.statusCode).toBe(400);
		expect(response.body.errors).toBeTruthy();
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("Invalid price");

		expect(response.statusCode).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});

	it("should display validation error messages when updating a product", async () => {
		const response = await request(app).put("/products/1").send({});

		expect(response.body).toHaveProperty("errors");
		expect(response.statusCode).toBe(400);
		expect(response.body.errors).toBeTruthy();
		expect(response.body.errors).toHaveLength(4);

		expect(response.statusCode).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});

	it("should check a valid ID in the URL", async () => {
		const response = await request(app).put(`/products/hello`).send({
			name: "Monitor Curvo - Testing",
			availability: true,
			price: 300
		});

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("Invalid ID");

		expect(response.body).not.toHaveProperty("data");
		expect(response.statusCode).not.toBe(200);
	});

	it("should return a 404 response for a non-existent product", async () => {
		const productId = 2000;
		const response = await request(app).put(`/products/${productId}`).send({
			name: "Monitor Curvo - Testing",
			availability: true,
			price: 300
		});

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Product Not Found");

		expect(response.body).not.toHaveProperty("data");
		expect(response.statusCode).not.toBe(200);
	});

	it("should update an existing product with valid data", async () => {
		const response = await request(app).put("/products/1").send({
			name: "Monitor Curvo - Testing",
			availability: true,
			price: 300
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("data");

		expect(response.body).not.toHaveProperty("errors");
		expect(response.body).not.toHaveProperty("error");
		expect(response.statusCode).not.toBe(404);
	});
});

describe("PATCH /products/:id", () => {
	it("should return a 404 response for a non-existing product", async () => {
		const productId = 2000;
		const response = await request(app).patch(`/products/${productId}`);

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Product Not Found");

		expect(response.statusCode).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});

	it("should check a valid ID in the URL", async () => {
		const response = await request(app).patch(`/products/hello`);

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("Invalid ID");

		expect(response.body).not.toHaveProperty("data");
		expect(response.statusCode).not.toBe(200);
	});

	it("should update the availability of a product", async () => {
		const response = await request(app).patch("/products/1");

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data.availability).toBe(false);

		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(400);
		expect(response.body).not.toHaveProperty("error");
	});
});

describe("DELETE /products/:id", () => {
	it("should check a valid ID", async () => {
		const response = await request(app).delete("/products/hello");

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors[0].msg).toBe("Invalid ID");

		expect(response.body).not.toHaveProperty("data");
		expect(response.statusCode).not.toBe(200);
	});

	it("should return a 404 response for a non-existent product", async () => {
		const productId = 2000;
		const response = await request(app).delete(`/products/${productId}`);

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Product Not Found");

		expect(response.body).not.toHaveProperty("data");
		expect(response.statusCode).not.toBe(200);
	});

	it("should delete a product", async () => {
		const response = await request(app).delete(`/products/1`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data).toBe("Product has been successfully deleted");

		expect(response.body).not.toHaveProperty("errors");
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(400);
	});
});
