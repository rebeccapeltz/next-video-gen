const cloudinary = require("cloudinary").v2;
const axios = require("axios");

exports.handler = async (event, context) => {
  //load data from body
  const data = JSON.parse(event.body);
  const manifest = data.manifest;
  const cloudinaryURL = data.cloudinary_url;
  const publicId = data.public_id;
  const notificationURL = data.notification_url;
  console.log(manifest, cloudinaryURL, notificationURL, publicId);

  // set up params for signing:parse credentials
  const config = cloudinary.config(cloudinaryURL);
  console.log("config:",JSON.stringify(config,0,2));
  const cloudName = config.cloud_name;
  const apiKey = config.api_key;
  const apiSecret = config.api_secret;
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const paramsToSign = {
    manifest_json: JSON.stringify(manifest),
    public_id: publicId,
    timestamp: timestamp,
  };

  // optional notifcation url
  if (notificationURL) {
    paramsToSign.notification_url = notificationURL;
  }

  // sign params
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  // set up body to post to Cloudinary
  const body = {
    public_id: publicId,
    api_key: apiKey,
    resource_type: "video",
    timestamp: timestamp,
    signature: signature,
    manifest_json: JSON.stringify(manifest),
  };

  // optional notifcation url
  if (notificationURL) {
    body.notification_url = notificationURL;
  }
  console.log("prior post", JSON.stringify(body));
  console.log("post to:",`https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`);

  // post to create slideshow api
  axios
    .post(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`,
      body
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
      return {
        statusCode: 200,
        body: JSON.stringify({message:"OK",status:"200"})
        // body: JSON.stringify({
        //   manifest: manifest,
        //   cloudinaryURL: cloudinaryURL,
        //   publicId: publicId,
        //   notificationURL: notificationURL
        // }),
      };
    })
    .catch((error) => {
      console.error(JSON.stringify(error, null, 2));
      return {
        statusCode: 500,
        body: JSON.stringify({message:"error"})
      }
    });
};
