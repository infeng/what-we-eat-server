"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const request = require("request-promise");
const url = require("url");
const router = express.Router();
router.get('/menu', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
    const body = yield request.get(`https://restapi.ele.me/shopping/v2/menu?restaurant_id=${id}`);
    const menu = JSON.parse(body);
    res.json(menu);
}));
exports.default = router;
