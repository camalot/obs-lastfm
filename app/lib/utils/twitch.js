"use strict";

function TwitchApi() {
  const async = require('async');
  // const request = require('request');
  // const api = require('twitch-api-v5');
  const {
    ApiClient
  } = require("@twurple/api");
  const {
    StaticAuthProvider
  } = require("@twurple/auth");


  const CLIENT_ID = process.env.APP_TWITCH_CLIENT_ID;
  const OAUTH = process.env.APP_TWITCH_BROADCASTER_OAUTH.replace("oauth:", "");
  const CHANNELID = process.env.APP_TWITCH_BROADCASTER_CHANNEL_ID;
  const CHANNELNAME = process.env.APP_TWITCH_BROADCASTER_CHANNEL_USER;

  console.log("create auth provider");
  const authProvider = new StaticAuthProvider(CLIENT_ID, process.env.APP_TWITCH_ACCESS_TOKEN);
  console.log("create api client");
  const apiClient = new ApiClient({
    authProvider
  });

  this.getSubscription = (userId) => {
    return new Promise((resolve, reject) => {
      console.log("get subscription");
      return apiClient.subscriptions.checkUserSubscription({
          broadcaster: CHANNELID.toString(),
          user: userId.toString()
        },
        (err, data) => {
          console.log("got response");
          if (err) {
            console.error(err);
            return reject(err);
          }
          if (data.error && data.status === 404) {
            console.log("not subscribed");
            return resolve(null);
          } else if (data.error && data.status !== 404) {
            console.error(data);
            return reject(data.message);
          } else {
            console.log("subscribed");
            return resolve(data);
          }
        }
      );
    });
  };
}

module.exports = TwitchApi;
