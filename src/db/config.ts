import { Sequelize } from "sequelize-typescript";
import { Books } from "../model/book";
const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "shahMuh123*",
  database: "books",
  logging: false,
  models: [Books],
});

export default connection;
