import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
const axios = require("axios");

const cloudName = "dhhz4q1ip";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    padding: "1rem",

    "& .MuiTextField-root": {
      margin: "1rem",
      width: "700px",
    },
    "& .MuiButtonBase-root": {
      margin: "1rem",
    },
  }
}));

// setup fn to post to netlify
const FN = "/.netlify/functions/create-video";
const requestCreateVideo = async (FN, body) => {
  console.log("before post", JSON.parse(body))
  try {
    const response = await axios.post(FN, body);
    console.log("response:", response);
    document.getElementById("result").innerHTML = JSON.stringify(
      response,
      0,
      2
    );
  } catch (error) {
    console.log("error:", error);
    document.getElementById("warning").textContent = `${error.toString()}`;
  }
};
const inititalManifest = {
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
    ],
  },
}
const Form = () => {
  const router = useRouter();
  const classes = useStyles();
  // create state variables for each input
  const [publicId, setPublicId] = useState("testpublicid");
  let manifest = null;
  // const [manifest, setManifest] = useState(null);
  const [notificationURL, setNotificationURL] = useState(
    "https://webhook.site/a7cbf678-adf7-4847-8586-96e6825cea46"
  );
  const [manifestString, setManifestString] = useState(
    JSON.stringify(inititalManifest, 0, 2)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    // setManifest(JSON.parse(manifestString));
    manifest = JSON.parse(manifestString);
    console.log("after parse",manifest, JSON.stringify(manifest))

    // setup body
    const body = JSON.stringify({
      public_id: publicId,
      manifest: manifest,
      notification_url: notificationURL,
    });

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
          InputProps={{ style: { fontSize: 12 } }}
          maxRows={10}
          value={manifest}
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
