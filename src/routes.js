'use strict';
const { Router } = require('express');
const apllyRoutes = require('./routesClass');

const router = Router();


apllyRoutes.apllyRoutes(router);

module.exports = router;
