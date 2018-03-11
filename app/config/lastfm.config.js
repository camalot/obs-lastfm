
'use strict';
const npmpackage = require("../../package.json");
let result = {
	lastfm: {
		VERSION: npmpackage.version,
		API_KEY: process.env.LASTFM_API_KEY,
		API_SECRET: process.env.LASTFM_API_SECRET,
		POLL: parseInt(process.env.POLL_INTERVAL || "5000", 0)
	}
};

module.exports = result;
