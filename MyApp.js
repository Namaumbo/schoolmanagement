const express = require('express')
const app = express();

require('dotenv').config();

const logger = require("morgan")
const helmet = require("helmet")
app.use(logger("common"))
app.use(helmet())
app.use(express.json())