'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../lib/lastfm');

router.get('/:user', (req, res, next) => {
	let user = req.params.user;
	lastfm.getTracks(req.params.user).then((track) => {
		res.render("overlay", { user: user, track: track});
	}).catch((err) => {
		console.error(err);
		return next(err);
	});
});


module.exports = router;
