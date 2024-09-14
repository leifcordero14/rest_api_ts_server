import { connectDB } from "../app";
import db from "../config/db";

jest.mock("../config/db");

describe("connectDB", () => {
	it("should handle DB connection error", async () => {
		jest
			.spyOn(db, "authenticate")
			.mockRejectedValueOnce(new Error("Error while trying to connect to DB"));

		const consoleSpy = jest.spyOn(console, "log");

		await connectDB();

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining("Error while trying to connect to DB")
		);
	});
});
