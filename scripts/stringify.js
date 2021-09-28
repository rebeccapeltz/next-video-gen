const cloudName = "dhhz4q1ip";
const manifest = {
  w: 500,
  h: 500,
  du: 10,
  fps: 20,
  vars: {
    transition: "s:linearblur",
    sdur: 1000,
    tdur: 500,
    slides: [
      {
        media: `s:https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_scale,pg_1,f_png/test-slide`,
        type: "s:image",
      },
      {
        media: `s:https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_scale,pg_2,f_png/test-slide`,
        type: "s:image",
      },
      {
        media: `s:https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_scale,pg_3,f_png/test-slide`,
        type: "s:image",
      },
      {
        media: `s:https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_scale,pg_4,f_png/test-slide`,
        type: "s:image",
      },
      {
        media: `s:https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_scale,pg_5,f_png/test-slide`,
        type: "s:image",
      },
      {
        media: `s:https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_scale,pg_6,f_png/test-slide`,
        type: "s:image",
      },
    ]
  }
};
console.log(JSON.stringify(manifest,0,2))