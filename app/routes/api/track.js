'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../../lib/lastfm');

router.get('/:artist/:track', (req, res, next) => {
	lastfm.getTrackInfo({ artist: req.params.artist, track: req.params.track })
	.then((track) => {
		res.json(track);
	}).catch((err) => {
		console.error(err);
		return next(err);
	});
});

router.get('/raw/:artist/:track', (req, res, next) => {
	lastfm.getTrackInfoRaw({ artist: req.params.artist, track: req.params.track })
	.then((tracks) => {
		res.json(tracks);
	}).catch((err) => {
		console.error(err);
		return next(err);
	});
});

module.exports = router;
