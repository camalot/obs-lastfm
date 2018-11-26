# OBS-LASTFM

Display `now playing` track information as an OBS Overlay

## ENDPOINTS

`/overlay/:user` : Where `:user` is your lastfm username.
`/overlay/:user/:video` : Where `:video` is a video id on [imgur](https://imgur.com). For example, if your video is `https://i.imgur.com/Gbdpl6H.gifv`, your video id is `Gbdpl6H`

### CUSTOMIZATION

#### CSS CLASSES

- `#scobble` : Container of the scobble info
- `.lastfm-art` : Container for the `img` for the album art
- `.lastfm-art img.default-image` : When there is no album art
- `.lastfm-title` : Container for the song title
- `.lastfm-artist` : Container for the artist
- `.lastfm-album` : Container for the name of the album

## DEPLOY

There are multiple ways that you can run this yourself. Here are a couple.

### HEROKU

- Click the `Deploy to Heroku` link below
- Create a heroku account or login
- Fill out the form with the information requested
- Use the `herokuapp.com` url in OBS as a `Browser Source` using the endpoints above.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

After deploying, you can manage the app in Heroku to set up automatic deployments, and it will automatically deploy updates when the code is changed. 

[![Auto Deploy](https://i.imgur.com/nNb6oBOl.png)](https://i.imgur.com/nNb6oBO.png)

### DOCKER

The container exposes port 3000. `-P` will map the port on the host.

```shell
$ docker run -d -P \
	--restart unless-stopped \
	--name "obs-lastfm" \
	-e LASTFM_API_KEY="${LASTFM_API_KEY}" \
	-e LASTFM_API_SECRET="${LASTFM_API_SECRET}" \
	-t camalot/obs-lastfm
```

### LOCAL

- Create a `.env` file in the `obs-lastfm` directory. 
- Add the following:
```
LASTFM_API_KEY=<your-lastfm-api-key>
LASTFM_API_SECRET=<your-lastfm-api-secret>
```
- Open shell and run the following:
```shell
$ npm install
$ npm start
```
- Open a browser to `http://localhost:3000/overlay/<lastfm-username>`


## SETUP OBS

- Add New Browser Source
- Enter the URL to the overlay: `http://localhost:3000/overlay/<lastfm-username>` or the `herokuapp` url
- Set the `width` to `450`
- Set the `height` to `72`
