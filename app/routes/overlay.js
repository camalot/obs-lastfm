'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../lib/lastfm');

router.get('/:user/:video?', (req, res, next) => {
	let user = req.params.user;
	let pvideo = req.params.video;
	let video = {
		url: pvideo ? `https://i.imgur.com/${pvideo}.mp4` : null,
		enabled: pvideo ? true : false
	}
	lastfm.getTracks(req.params.user)
		.then((track) => {
			console.log(track);
			res.render("overlay", { user: user, track: track, video: video });
		}).catch((err) => {
			console.error(err);
			return next(err);
		});
});


module.exports = router;
