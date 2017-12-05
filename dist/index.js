"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const ele_1 = require("./routes/ele");
app.use('/ele', ele_1.default);
const port = 8018;
app.listen(port, '0.0.0.0', () => {
    console.log(`what we eat server start, listening port ${port}`);
});
