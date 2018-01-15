import * as mongoose from 'mongoose';

const Order = new mongoose.Schema({
  menu: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
  createDate: Date,
});

export interface OrderDoc extends mongoose.Document {
  menu: any;
  createDate: Date;
}

const orderModel = mongoose.model<OrderDoc>('orders', Order);

export default orderModel;
