// const axios = require("axios");
import fetch from "node-fetch";

exports.handler = async (event, context) => {
  //load data from body
  const data = JSON.parse(event.body);
  const manifest = data.manifest;
  // extract value
  const cloudinaryURLValue = data.cloudinary_url.split("=")[1];
  // set process.env before loading cloudinary
  process.env["CLOUDINARY_URL"] = cloudinaryURLValue;
  const cloudinary = require("cloudinary").v2;

  const publicId = data.public_id;
  const notificationURL = data.notification_url;
  console.log(manifest, cloudinaryURLValue, notificationURL, publicId);

  // set up params for signing:parse credentials
  const config = cloudinary.config();
  const cloudName = config.cloud_name;
  const apiKey = config.api_key;
  const apiSecret = config.api_secret;
  console.log("config:", cloudName, apiKey, "secret");

  const timestamp = Math.floor(new Date().getTime() / 1000);

  // const paramsToSign = {
  //   manifest_json: JSON.stringify(manifest),
  //   public_id: publicId,
  //   notification_url: notificationUrl,
  //   timestamp: timestamp,
  // };
  const paramsToSign = {
    manifest_json: JSON.stringify(manifest),
    public_id: publicId,
    timestamp: timestamp,
  };

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

  console.log("prior post", JSON.stringify(body));
  console.log(
    "post to:",
    `https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`
  );

  // const response = await fetch(
  //   `https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`,
  //   { method: "POST", body: body }
  // );
  // const resData = await response.json();

  // console.log(resData);
  console.log("return 200");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK", status: "200" }),
  };

  // post to create slideshow api
  // axios
  //   .post(
  //     `https://api.cloudinary.com/v1_1/${cloudName}/video/create_slideshow`,
  //     body
  //   )
  //   .then(res => {
  //     // console.log(`statusCode: ${res.status}`);
  //     // console.log(res);
  //     console.log("success");
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify({message:"OK",status:"200"})
  //     };
  //   })
  //   .catch((error) => {
  //     console.error("faile");
  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify({message:"error"})
  //     }
  //   });
};
