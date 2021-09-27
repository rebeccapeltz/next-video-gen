import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
const axios = require("axios");

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    padding: "1rem",

    "& .MuiTextField-root": {
      margin: "1rem",
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: "1rem",
    },
  },
}));

// setup fn to post to netlify
const FN = "/.netlify/functions/create-video";
const requestCreateVideo = async (FN, body) => {
  try {
    const response = await axios.post(FN, body);
    console.log("response:",response);
    document.getElementById("result").innerHTML = JSON.stringify(response, 0, 2);
  } catch (error) {
    console.log("error:",error);
    document.getElementById("warning").textContent = `${error.toString()}`;
  }
};

const Form = () => {
  const router = useRouter();
  const classes = useStyles();
  // create state variables for each input
  const [publicId, setPublicId] = useState("testpublicid");
  const [cloudinaryURL, setCloudiaryURL] = useState(
    "CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
  );
  const [manifest, setManifest] = useState({
    w: 500,
    h: 500,
    du: 20,
    fps: 20,
    vars: {
      transition: "s:linearblur",
      sdur: 2000,
      tdur: 1000,
      slides: [
        {
          media:
            "s:https://res.cloudinary.com/pictures77/image/upload/w_400,c_scale,pg_1,f_png/TestSlide",
          type: "s:image",
        },
        {
          media:
            "s:https://res.cloudinary.com/pictures77/image/upload/w_400,c_scale,pg_2,f_png/TestSlide",
          type: "s:image",
        },
        {
          media:
            "s:https://res.cloudinary.com/pictures77/image/upload/w_400,c_scale,pg_3,f_png/TestSlide",
          type: "s:image",
        },
        {
          media:
            "s:https://res.cloudinary.com/pictures77/image/upload/w_400,c_scale,pg_4,f_png/TestSlide",
          type: "s:image",
        },
        {
          media:
            "s:https://res.cloudinary.com/pictures77/image/upload/w_400,c_scale,pg_5,f_png/TestSlide",
          type: "s:image",
        },
        {
          media:
            "s:https://res.cloudinary.com/pictures77/image/upload/w_400,c_scale,pg_6,f_png/TestSlide",
          type: "s:image",
        },
      ],
    },
  });
  const [notificationURL, setNotificationURL] = useState(
    "https://webhook.site"
  );
  const [manifestString, setManifestString] = useState(
    JSON.stringify(manifest, 0, 2)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setManifest(JSON.parse(manifestString));
    // console.log(
    //   "client:",
    //   publicId,
    //   cloudinaryURL,
    //   notificationURL,
    //   JSON.stringify(manifest, 0, 2)
    // );
  
    // setup body
    const body = JSON.stringify({
      public_id: publicId,
      manifest: manifest,
      cloudinary_url: cloudinaryURL,
      notification_url: notificationURL,
    });
    // console.log("body prior:", body);

    // post to backend
    requestCreateVideo(FN, body);
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.replace("/")}
          >
            Go back to the Video
          </Button>
        </div>
        <h2>Create Video</h2>
        <TextField
          label="Public ID"
          variant="filled"
          placeholder="Enter Public ID  "
          required
          value={publicId}
          onChange={(e) => setPublicId(e.target.value)}
        />
        <TextField
          label="Manifest"
          variant="filled"
          placeholder="Enter manifest"
          required
          multiline
          maxRows={8}
          value={manifestString}
          onChange={(e) => setManifestString(e.target.value)}
        />
        <TextField
          label="Notification URL"
          placeholder="Enter Notifcation URL (optional)"
          variant="filled"
          type="url"
          value={notificationURL}
          onChange={(e) => setNotificationURL(e.target.value)}
        />
        {/* <TextField
          label="Cloudinary URL"
          placeholder="Enter Cloudinary URL"
          variant="filled"
          type="password"
          required
          value={cloudinaryURL}
          onChange={(e) => setCloudiaryURL(e.target.value)}
        /> */}
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit Create Request
          </Button>
        </div>
      </form>
      <div id="warning"></div>
      <div id="result"></div>
    </div>
  );
};

export default Form;
