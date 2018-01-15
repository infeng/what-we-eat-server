import * as express from 'express';
import * as cheerio from 'cheerio';
import * as request from 'request';
import * as url from 'url';
import { createRes } from './util';
import * as bodyParser from 'body-parser';

import * as mongoose from 'mongoose';
const config = require('../config.json');
mongoose.connect(config.database.uris, {
  user: config.database.user,
  pass: config.database.pass,
}, err => {
  if (!err) {
    console.log('database connect success');
  }
}).catch(err => {
  console.log(`database connect faild: ${err.message}`);
});

const app = express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

import eleRouter from './routes/ele';
import menuRouter from './routes/menu';
import orderRouter from './routes/order';

app.use('/ele', eleRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);

app.use((err: Error, req, res, next) => {
  if (err.message.startsWith('[database]')) {
    console.log(err.message);
    res.json(createRes(-1, {}, '系统错误，请稍后再试'));
  }
});

const port = 8018;

app.listen(port, '0.0.0.0', () => {
  console.log(`what we eat server start, listening port ${port}`);
});
