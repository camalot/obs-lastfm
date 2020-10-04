'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../../lib/lastfm');

router.get('/tracks/:user', (req, res, next) => {
	return lastfm.getTracks(req.params.user).then((tracks) => {
		return res.json(tracks);
	}).catch( (err) => {
		console.error(err);
		return next(err);
	});
});

router.get('/tracks/raw/:user', (req, res, next) => {
	return lastfm.getTracksRaw(req.params.user).then((tracks) => {
		return res.json(tracks);
	}).catch((err) => {
		console.error(err);
		return next(err);
	});
});

module.exports = router;
