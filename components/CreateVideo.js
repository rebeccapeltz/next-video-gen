import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from '@mui/styles';



export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    margin: "1rem", 
    color: "red"   
  },
  
}))

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
const manifestString = JSON.stringify(manifest, 0, 2);

const options = {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ public_id: "testvc", manifest: manifest }),
};

export default function CreateVideo() {
  const classes = useStyles();

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
    
    <Box component="span"  sx={{ display: "flex"  }}>
      <Card className={classes.root}>
      <Button id="create-video" sx={{ display: "block" }}>
            Run function to create video
          </Button>
        <CardContent sx={{ maxWidth: "lg" }}>
          <Typography component="div" variant="h5">
            Create Video
          </Typography>
          <TextField
            id="public-id"
            variant="outlined"
            label="Video Public ID"
            placeholder="Enter Public ID"

            // error={isFormInvalid}
            helperText={"Enter a cloudinary public id"}
            name="public-id"
            // onChange={handleFormChange}
            // defaultValue={formDataAnswer}
            sx={{ display: "block" }}
          />

          <TextField
            // hintText="CLOUDINARY_URL"
            type="password"
            placeholder="Enter or paste Cloudinary URL"

            // floatingLabelText="Password"
            name="cld-url"
            label="CLOUDINARY_URL"
            // helperText="Paste in CLOUDINARY_URL"
            id="cld-url"
            sx={{ display: "block" }}
          ></TextField>

          {/* <TextareaAutosize
            aria-label="text area to enter manifest"
            placeholder="Enter manifest.json"
            style={{ width: 300, height: 200 }}
            sx={{ display: "block" }}
            defaultValue={{ manifestString }}
          /> */}

          <TextField
            id="outlined-multiline-flexible"
            label="Multiline"
            placeholder="Enter or paste manifest"
            multiline
            // style={{ width: 300, height: 200 }}
            maxRows={10}
            value={manifestString}
            sx={{ display: "block" }}
            // onChange={handleChange}
          />
         
          <Typography id="warning" />
          <Typography id="result"></Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
