import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({ tableName: "products" })
class Product extends Model {
  @Column(DataType.STRING(100))
  declare name: string;

  @Column(DataType.FLOAT)
  declare price: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare availability: boolean;
}

export default Product;
