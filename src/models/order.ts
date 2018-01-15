import * as mongoose from 'mongoose';

const Order = new mongoose.Schema({
  menu: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
  createDate: Date,
});

const orderModel = mongoose.model('orders', Order);

export default orderModel;
