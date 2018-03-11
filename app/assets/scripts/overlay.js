"use strict";
$(function() {
	let scobble = $("#scobble");
	let user = scobble.data("user");
	let pollInterval = parseInt(scobble.data("poll") || "5000", 0);
	setInterval(function() {
		$.ajax(`/api/user/tracks/${user}`, {
			success: (data, text, xhr) => {

				if(data === null) {
					scobble.addClass("hidden");
					return;
				} else {
					scobble.removeClass("hidden");
				}

				let $image = $(".lastfm-art img", scobble);
				let $title = $(".lastfm-title", scobble);
				let $artist = $(".lastfm-artist", scobble);
				let $album = $(".lastfm-album", scobble);

				$image.attr("src", data.image);
				$title.text(data.title);
				$artist.text(data.artist);
				$album.text(data.album);
			}
		});
	}, pollInterval);
});
