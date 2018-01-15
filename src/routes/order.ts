import * as express from 'express';
import order from '../models/order';
import menu from '../models/menu';
import { createRes, log } from '../util';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

const router = express.Router();

router.post('/', async(req, res, next) => {
  const menuId = req.body.menuId;
  if (typeof menuId === 'undefined') {
    return res.json(createRes(-1, {}, '请求参数错误'));
  }
  try {
    const menuIdObj = new mongoose.Types.ObjectId(menuId);
    const targetMenu = await menu.findById(menuIdObj);
    if (!targetMenu) {
      return res.json(createRes(-1, {}, '请求参数错误'));
    }
    await order.create(new order({
      menu: menuIdObj,
      createDate: new Date(),
    }));
    res.json(createRes(0, {}));
  }catch (err) {
    next(new Error(log('database', err.message)));
  }
});

router.get('/getTodayOrder', async(req, res, next) => {
  try {
    const data = await order.find({
      createDate: {
        $gte: new Date(moment().set('hour', 0).set('minute', 0).set('second', 0).toString()),
        $lte: new Date(moment().set('hour', 23).set('minute', 59).set('second', 59).toString()),
      },
    }).populate({
      path: 'menu',
      select: 'name price',
    });
    const orders = data.map(item => {
      return {
        name: item.menu.name,
        price: item.menu.price,
        createDate: item.createDate,
      };
    });
    res.json(createRes(0, {
      data: orders,
    }));
  }catch(err) {
    next(new Error(log('database', err.message)));
  }
});

export default router;
