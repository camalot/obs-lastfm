FROM node:alpine

# set version label
ARG PROJECT_NAME="obs-lastfm"
ARG BUILD_VERSION="1.0.0-snapshot"

ARG PUID=3000
ARG PGID=3000

ARG VUSER="abc"
ARG VGROUP="abc"

RUN addgroup "${VGROUP}" -g "${PGID}" && \
	adduser -S -G "${VGROUP}" -u "${PUID}" "${VUSER}"

LABEL \
	LABEL="${PROJECT_NAME}-v${BUILD_VERSION}" \
	VERSION="${BUILD_VERSION}" \
	MAINTAINER="camalot <camalot@gmail.com>"

EXPOSE 3000

RUN \
	apk update && apk upgrade \
	&& apk add redis \
	&& apk add nodejs \
	&& apk add bash \
	&& rm -rf /var/cache/apk/* \
	&& mkdir -p /soundboard


COPY . /soundboard
WORKDIR /soundboard

RUN \
	chown -R "${VUSER}:${VGROUP}" /soundboard

USER ${VUSER}

RUN \
	npm version "${BUILD_VERSION}" --git-tag-version && \
	npm install --production;

ENTRYPOINT ["npm", "start"]
