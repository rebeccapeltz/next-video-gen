exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  const manifest = data.manifest;
  const cloudinaryURL = data.cloudinaryURL;
  const publicId = data.publicId;
  const notifcationURL = data.notifcationURL;

  console.log(manifest)
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
      notifcationURL: notifcationURL
    }),
  };
  
};
