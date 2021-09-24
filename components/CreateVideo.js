import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

const manifest = {
  w: 500,
  h: 500,
  du: 10,
  fps: 20,
  vars: {
    transition: "s:linearblur",
    sdur: 2000,
    tdur: 100,
    slides: [
      {
        media:
          "s:https://res.cloudinary.com/pictures77/image/upload/w_400,c_scale,pg_3,f_png/TestSlide",
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
};

const options = {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ public_id: "testvc", manifest: manifest }),
};


export default function CreateVideo() {
  useEffect(() => {
    document.querySelector("#create-video").addEventListener("click", (e) => {
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
          document.getElementById("result").textContent = `${err.toString()}`;
        });
    });
  });

  return (
    <Card sx={{ maxWidth: "md" }}>
      <CardContent sx={{ maxWidth: "md" }}>
        <Typography component="div" variant="h5">
          Create Video
        </Typography>
        <Button id="create-video" sx={{ display: "block" }}>
          Run function to create video
        </Button>
        <Typography id="warning" />
        <Typography id="result"></Typography>
      </CardContent>
    </Card>
  );
}
