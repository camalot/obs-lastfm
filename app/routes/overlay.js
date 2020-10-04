'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../lib/lastfm');
const TwitchApi = require("../lib/utils").twitch;

function requestOverlay(twitchId, userId, videoId) {
	return new Promise((resolve, reject) => {
		const api = new TwitchApi();

		let videoObject = {
			url: videoId ? `https://i.imgur.com/${videoId}.mp4` : null,
			enabled: videoId ? true : false
		};

		return api.getSubscription(twitchId)
			.then((sub) => {
				if (sub) {
					return lastfm.getTracks(userId);
				} else {
					console.log("not subscribed");
					return resolve({ user: userId, error: { message: "Not Subscribed." } });
				}
			})
			.then((track) => {
				console.log(track);
				return resolve({ user: userId, track: track, video: videoObject });
			})
			.catch((err) => {
				return reject(err);
			});
	});
}

router.get('/v2/:twitchId/:user/:video?', (req, res, next) => {
	return requestOverlay(req.params.twitchId, req.params.user, req.params.video)
		.then((result) => {
			return res.render("overlay", result);
		})
		.catch((err) => {
			console.error(err);
			return next(err);
		});
});


// router.get('/:user/:video?', (req, res, next) => {
// 	// this will go away!!
// 	return requestOverlay('58491861', req.params.user, req.params.video)
// 		.then((result) => {
// 			return res.render("overlay", result);
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			return next(err);
// 		});
// });


module.exports = router;
