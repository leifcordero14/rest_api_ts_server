import "dotenv/config";
import { Sequelize } from "sequelize-typescript";

const db = new Sequelize(process.env.DATABASE_URL!, {
	models: [`${__dirname}/../models/**/*`],
	logging: false
});

export default db;