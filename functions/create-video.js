const axios = require("axios");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

exports.handler = async (event) => {
  // parse data from body
  const data = JSON.parse(event.body);
  // console.log("data:",data);

  // extract data elements
  const publicId = data.public_id;
  const notificationURL = data.notification_url;
  const manifest = data.manifest;
   console.log(JSON.stringify(manifest,0,2), notificationURL, publicId);

  // set up params for signing:parse credentials
  // parse cloudinary URL values
  const cloudName = cloudinary.config().cloud_name;
  console.log("cloudname:", cloudName);
  const apiKey = cloudinary.config().api_key;
  const apiSecret = cloudinary.config().api_secret;

  // define api
  const API = `https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`;

  const timestamp = Math.floor(new Date().getTime() / 1000);

  // setup params to sign
  const paramsToSign = {
    manifest_json: JSON.stringify(manifest),
    public_id: publicId,
    notification_url: notificationURL,
    timestamp: timestamp,
  };

  // sign params
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  // set up body to post to Cloudinary
  const body = {
    public_id: publicId,
    notification_url: notificationURL,
    api_key: apiKey,
    resource_type: "video",
    timestamp: timestamp,
    signature: signature,
    manifest_json: JSON.stringify(manifest),
  };

  try {
    const response = await axios.post(API, body);
    return {
      statusCode: response.status,
      body: JSON.stringify({ message: "success" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "error" }),
    };
  }
};
