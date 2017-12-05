import * as express from 'express';
import * as cheerio from 'cheerio';
import * as request from 'request';
import * as url from 'url';

const app = express();

import eleRouter from './routes/ele';

app.use('/ele', eleRouter);

const port = 8018;

app.listen(port, '0.0.0.0', () => {
  console.log(`what we eat server start, listening port ${port}`);
});
