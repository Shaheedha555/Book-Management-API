import {
  Table,
  Model,
  Column,
  DataType,
  BeforeCreate,
  Default,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
  timestamps: false,
  tableName: "books",
})
export class Books extends Model {
  @Default(uuidv4)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.INTEGER,
  })
  publishedYear!: number;

  @BeforeCreate
  static generateId(instance: Books) {
    if (!instance.id) {
      instance.id = uuidv4().split("-").join(" ");
    }
  }
}
