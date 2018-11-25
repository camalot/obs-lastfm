"use strict";
$(function () {
	let scobble = $("#scobble");
	let user = scobble.data("user");
	let pollInterval = parseInt(scobble.data("poll") || "5000", 0);
	let transparent = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

	setInterval(function () {
		$.ajax(`/api/user/tracks/${user}`, {
			success: (data, text, xhr) => {
				if (data === null) {
					scobble
						.fadeOut("fast");
					return;
				} else {
					console.log("show track available");
					scobble
						.fadeIn("fast", () => {
							if (scobble.data("id") !== data.id) {
								updateSong(scobble, data, () => {
								});
							}
						});
				}
			}
		});
	}, pollInterval);

	function updateSong(scobble, data, callback) {
		let container = $(".scobble-container", scobble);
		console.log(container);
		scobble.data("id", data.id || data.title.toLowerCase().replace(/\s/gi, ""));

		let $image = $(".lastfm-art img", scobble);
		let $title = $(".lastfm-title", scobble);
		let $artist = $(".lastfm-artist", scobble);
		let $album = $(".lastfm-album", scobble);

		container.animate({ "left": '-=500' }, () => {
			$image.attr("src", data.image == null || data.image === "" ? transparent : data.image);
			if(!data.image) {
				$image.addClass("default-image");
			} else {
				$image.removeClass("default-image");
			}
			$title.text(data.title || "");
			$artist.text(data.artist || "");
			$album.text(data.album || "");
		})
		.animate({ "left": '+=500' }, callback);
	}
});
