import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    // padding: theme.spacing(2),
    padding: "1rem",

    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      margin: "1rem",
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      // margin: theme.spacing(2),
      margin: "1rem",
    },
  },
}));

const Form = () => {
  const classes = useStyles();
  // create state variables for each input
  const [publicId, setPublicId] = useState("testpublicid");
  const [cloudinaryURL, setCloudiaryURL] = useState(
    "CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
  );
  const [manifest, setManifest] = useState({ width: 50 });
  const [notificationURL, setNotificationURL] = useState(
    "https://webhook.site"
  );
  const [manifestString, setManifestString] = useState('{"width":500}');

  const handleSubmit = (e) => {
    e.preventDefault();
    setManifest(JSON.parse(manifestString));
    console.log(
      publicId,
      cloudinaryURL,
      notificationURL,
      JSON.stringify(manifest, 0, 2)
    );

    // setup options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ public_id: "testvc", manifest: manifest }),
    };

    // post to backend
    fetch(
      "https://next-video-gen.netlify.app/.netlify/functions/create-video/.netlify/functions/create-video",
      options
    )
      .then((res) => res.json())
      .then(async (res) => {
        if (!res.manifest)
          return (document.getElementById("warning").innerHTML =
            "Error capturing screenshot");
        else {
          console.log(res.manifest);
          document.getElementById("result").innerHTML = JSON.stringify(
            res.manifest,
            0,
            2
          );
        }
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("warning").textContent = `${err.toString()}`;
      });
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
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
          maxRows={10}
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
        <TextField
          label="Cloudinary URL"
          placeholder="Enter Cloudinary URL"
          variant="filled"
          type="password"
          required
          value={cloudinaryURL}
          onChange={(e) => setCloudiaryURL(e.target.value)}
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
