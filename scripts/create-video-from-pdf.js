require('dotenv').config()
const cloudinary = require('cloudinary').v2
const axios = require("axios");

const publicId = "slides-shirley";

const config = cloudinary.config();
const cloudName = config.cloud_name;
const apiKey = config.api_key;
const apiSecret = config.api_secret;
const notificationUrl =
  "https://webhook.site/a7cbf678-adf7-4847-8586-96e6825cea46";


const timestamp = Math.floor(new Date().getTime() / 1000);
console.log("timestamp", timestamp);

const manifest = {
  "w": 500,
  "h": 500,
  "du": 10,
  "fps": 20,
  "vars": {
    "transition": "s:linearblur",
    "sdur": 1000,
    "tdur": 500,
    "slides": [
      {
        "media": "s:https://res.cloudinary.com/dhhz4q1ip/image/upload/w_400,c_scale,pg_1,f_png/shirly-test",
        "type": "s:image"
      },
      {
        "media": "s:https://res.cloudinary.com/dhhz4q1ip/image/upload/w_400,c_scale,pg_2,f_png/shirly-test",
        "type": "s:image"
      },
      {
        "media": "s:https://res.cloudinary.com/dhhz4q1ip/image/upload/w_400,c_scale,pg_3,f_png/shirly-test",
        "type": "s:image"
      },
      {
        "media": "s:https://res.cloudinary.com/dhhz4q1ip/image/upload/w_400,c_scale,pg_4,f_png/shirly-test",
        "type": "s:image"
      },
      {
        "media": "s:https://res.cloudinary.com/dhhz4q1ip/image/upload/w_400,c_scale,pg_5,f_png/shirly-test",
        "type": "s:image"
      },
      {
        "media": "s:https://res.cloudinary.com/dhhz4q1ip/image/upload/w_400,c_scale,pg_6,f_png/shirly-test",
        "type": "s:image"
      }
    ]
  }
};
function createVideo() {
  const paramsToSign = {
    manifest_json: JSON.stringify(manifest),
    public_id: publicId,
    notification_url: notificationUrl,
    timestamp: timestamp,
  };
  console.log("params:", paramsToSign);
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  console.log("sig", signature);

  const body = {
    public_id: publicId,
    // notification_url: notificationUrl,
    api_key: apiKey,
    resource_type: "video",
    timestamp: timestamp,
    signature: signature,
    notification_url: notificationUrl,
    manifest_json: JSON.stringify(manifest),
  };
  axios
    .post(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`,
      body
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(JSON.stringify(error, null, 2));
    });
}

createVideo();
