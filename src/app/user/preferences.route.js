const express = require("express");
const { getPreferences, updatePreferences } = require('./preferences.controller');
const { authenticateToken } = require('../../middleware/auth');
const { validatePreferences } = require('./preferences.validation');

const router = express.Router();

router.get("/", authenticateToken, getPreferences);
router.put("/", authenticateToken, validatePreferences, updatePreferences);

module.exports = router;