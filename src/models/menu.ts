import * as mongoose from 'mongoose';

const Menu = new mongoose.Schema({
  type: Number,
  name: String,
  price: Number,
});

const menuModel = mongoose.model('menus', Menu);

export default menuModel;
