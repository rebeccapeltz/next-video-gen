exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  const manifest = data.manifest;
  const cloudinaryURL = data.cloudinary_url;
  const publicId = data.public_id;
  const notificationURL = data.notification_url;


  console.log(manifest, cloudinaryURL, notificationURL, publicId)
  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      manifest: manifest,
      cloudinaryURL: cloudinaryURL,
      publicId: publicId,
      notificationURL: notificationURL
    }),
  };
  
};
