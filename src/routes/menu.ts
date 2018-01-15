import * as express from 'express';
import { Router } from 'express';
import menu from '../models/menu';
import { createRes, log } from '../util';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const menus = await menu.find();
    res.json(createRes(0, {
      menus,
    }));
  }catch (err) {
    next(new Error(log('database', err.message)));
  }
});

export default router;
