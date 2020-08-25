"use strict";

function TwitchApi() {
	const async = require('async');
	const request = require('request');
	const api = require('twitch-api-v5');

	const CLIENT_ID = process.env.APP_TWITCH_CLIENT_ID;
	const OAUTH = process.env.APP_TWITCH_BROADCASTER_OAUTH.replace("oauth:", "");
	const CHANNELID = process.env.APP_TWITCH_BROADCASTER_CHANNEL_ID;
	const CHANNELNAME = process.env.APP_TWITCH_BROADCASTER_CHANNEL_USER;
	api.clientID = CLIENT_ID;

	this.getSubscription = (userId) => {
		return new Promise((resolve, reject) => {
			api.channels.checkSub(
				{ auth: OAUTH, channelID: CHANNELID, userID: userId },
				(err, data) => {
					if (err) {
						console.error(err);
						return reject(err);
					}
					if (data.error && data.status === 404) {
						return resolve(null);
					} else if (data.error && data.status !== 404) {
						return reject(data.message);
					} else {
						return resolve(data);
					}
				}
			);
		});
	};
}

module.exports = TwitchApi;
