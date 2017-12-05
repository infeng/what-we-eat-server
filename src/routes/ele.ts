import * as express from 'express';
import * as request from 'request-promise';
import * as url from 'url';
import { read } from 'fs';

const router = express.Router();

router.get('/menu', async (req, res) => {
  /**
   * example target
   * https%3A%2F%2Fh5.ele.me%2Fshop%2F%23geohash%3Dws0e7v4m2sqq%26id%3D794023%26s_type%3D0
   */
  const target = req.query.target;
  const urlObj = url.parse(target);
  if (!urlObj.hash) {
    res.json({
      status: '-1',
    });
  }
  let regResult = urlObj.hash.match(/\&id=(\w+)\&/);
  let id = null;
  if (regResult) {
    id = regResult[1];
  }
  const body = await request.get(`https://restapi.ele.me/shopping/v2/menu?restaurant_id=${id}`);
  const menu = JSON.parse(body);

  res.json(menu);
});

export default router;
