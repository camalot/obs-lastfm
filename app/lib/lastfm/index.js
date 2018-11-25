'use strict';

const LastFM = require('lastfmapi');
const config = require('../../config');
const transparentUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
let _getTracksRaw = (user) => {
	return new Promise((resolve, reject) => {
		let lfm = new LastFM({
			api_key: config.lastfm.API_KEY,
			secret: config.lastfm.API_SECRET
		});
		lfm.user.getRecentTracks({ 'limit': 1, 'user': user }, (err, recentTracks) => {
			if (err) {
				console.error(err);
				return reject(err);
			}

			return resolve(recentTracks);
		});
	});
};

let _getTracks = (user) => {
	return new Promise((resolve, reject) => {
		_getTracksRaw(user).then( (recentTracks) => {
			if (recentTracks && recentTracks.track && recentTracks.track.length >= 1) {
				let nowplaying = recentTracks.track[0];
				if (nowplaying && nowplaying['@attr'] && nowplaying['@attr'].nowplaying === 'true') {

					let image = nowplaying.image ? nowplaying.image[0]["#text"] : null;
					let filtered = nowplaying.image.filter((v, i) => {
						return v.size === 'large';
					});

					if (filtered.length > 0) {
						image = filtered[0]["#text"];
					}

					return resolve({
						id: nowplaying.mbid || nowplaying.name.toLowerCase().replace(/\s/gi,"-"),
						title: nowplaying.name,
						artist: nowplaying.artist['#text'],
						album: nowplaying.album['#text'],
						image: !image || image === "" ? transparentUrl : image
					});

				} else {
					return resolve(null);
				}
			} else {
				return resolve(null);
			}
		}).catch( (err) => {
			return reject(err);
		});
	});
};
module.exports = {
	getTracksRaw: _getTracksRaw,
	getTracks: _getTracks
}
