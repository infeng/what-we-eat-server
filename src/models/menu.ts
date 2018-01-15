import * as mongoose from 'mongoose';

const Menu = new mongoose.Schema({
  type: Number,
  name: String,
  price: Number,
});

export interface MenuDoc extends mongoose.Document {
  type: number;
  name: string;
  price: number;
}

const menuModel = mongoose.model<MenuDoc>('menus', Menu);

export default menuModel;
