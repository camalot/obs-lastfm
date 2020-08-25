'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../lib/lastfm');
const TwitchApi = require("../lib/utils").twitch;

router.get('/:twitchId/:user/:video?', (req, res, next) => {
	let user = req.params.user;
	let pvideo = req.params.video;
	let twitchId = req.params.twitchId;

	const api = new TwitchApi();

	let video = {
		url: pvideo ? `https://i.imgur.com/${pvideo}.mp4` : null,
		enabled: pvideo ? true : false
	};

	api.getSubscription(twitchId)
	.then((sub) => {
		if(sub) {
			return lastfm.getTracks(req.params.user);
		} else {
			return new Promise((resolve, reject) => {
				res.render("overlay", { user: user, error: { message: "Not Subscribed." } });
			});
		}
	})
	.then((track) => {
		console.log(track);
		res.render("overlay", { user: user, track: track, video: video });
	})
	.catch((err) => {
		console.error(err);
		return next(err);
	});
});


router.get('/:user/:video?', (req, res, next) => {
	let user = req.params.user;
	let pvideo = req.params.video;

	let video = {
		url: pvideo ? `https://i.imgur.com/${pvideo}.mp4` : null,
		enabled: pvideo ? true : false
	};

	return lastfm.getTracks(req.params.user)
	.then((track) => {
		console.log(track);
		res.render("overlay", { user: user, track: track, video: video });
	})
	.catch((err) => {
		console.error(err);
		return next(err);
	});
});


module.exports = router;
