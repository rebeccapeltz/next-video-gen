import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Cloudinary } from "cloudinary-core";
import "cloudinary-video-player/dist/cld-video-player.min.js";
import "cloudinary-video-player/dist/cld-video-player.min.css";
import { useEffect } from "react";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const publicId = "slides-video";
const cld = new Cloudinary({ cloud_name: "pictures77" });

export default function VideoQuiz() {
  // const question = "What is one?";
  // const correctAnswer = "1";
  // const errorResponse = "Correct: 1";
  // const correctResponse = "Correct!";
  const [open, setOpen] = React.useState(false);
  const [media, setMedia] = React.useState(null);

  const [formDataAnswer, setFormDataAnswer] = useState("");
  const [formDataCorrect, setFormDataCorrect] = useState(false);
  const [question, setQuestion] = useState(""); // What is
  const [errorResponse, setErrorResponse] = useState(""); // Correct:
  const [correctResponse, setCorrectResponse] = useState(""); // Correct!
  const [correctAnswer, setCorrectAnswer] = useState(""); //"1"
  // form is initially neither valid nor invalid
  // user must submit before one of they get set
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [helper, setHelper] = useState("Enter a number");

  const initState = () => {
    setOpen(false);
    setMedia(null);
    setQuestion("");
    setErrorResponse("");
    setCorrectResponse("");
    setCorrectAnswer("");
    setIsFormInvalid(false);
    setHelper("Enter a number");
  };

  const handleOpen = () => {
    setIsFormInvalid(false);
    setOpen(true);
  };
  const handleClose = () => {
    setFormDataAnswer("");
    setFormDataCorrect(false);
    setOpen(false);
    media.play();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormInvalid(false);
    validate();
  };

  // called when formed is submitted
  const validate = () => {
    // nothing entered show no helper
    if (formDataAnswer.length === 0) {
      setHelper("Enter a number");
      setIsFormInvalid(false);
    } else {
      if (!formDataCorrect) {
        setHelper(errorResponse);
        setIsFormInvalid(true);
      } else {
        setHelper(correctResponse);
      }
    }
  };
  function handleFormChange(event) {
    setFormDataAnswer(event.target.value);
    setFormDataCorrect(event.target.value === correctAnswer);
  }

  useEffect(() => {
    const media = cld.videoPlayer("myvideo", {
      publicId: publicId,
      fluid: true,
      controls: false,
      autoplay: false,
      preload: "auto",
      mute: true,
      bigPlayButton: false,
      playedEventTimes: [3, 7.5, 12, 16.5, 21],
      transformation: {
        aspect_ratio: "1.5",
        width: 400,
        crop: "fill",
      },
      posterOptions: {
        publicId: "cats-and-dogs",
        transformation: {
          aspect_ratio: "1.5",
          width: 400,
          crop: "fill",
        },
      },
    });
    setMedia(media);
    media.on("ended", (event) => {
    //   .video-js .vjs-big-play-button {
    //     display: none;
    // }
    // .video-js .vjs-control-bar {
    //     display: flex;
    // }
      initState();
    });
    media.on("timeplayed", (event) => {
      if (event.eventData.time === 12) {
        media.pause();
        handleOpen();
        setQuestion("How many kittens?");
        setCorrectResponse("Correct!");
        setErrorResponse("Correct answer: 1");
        setCorrectAnswer("1");
      } else if (event.eventData.time === 21) {
        media.pause();
        handleOpen();
        setQuestion("How many puppies?");
        setCorrectResponse("Correct!");
        setErrorResponse("Correct answer: 2");
        setCorrectAnswer("2");
      } else {
        // do nothing
      }
      // alert('timeplayed: ' + event.eventData.time)
      console.log(event.eventData.time + " seconds played");
    });
  }, []);

  const playVideo = () => {
    media.play();
    //disable button
  };
  return (
    <Card sx={{ maxWidth: "md" }}>
      <CardContent sx={{ maxWidth: "md" }}>
        <Typography component="div" variant="h5">
          Video
        </Typography>
        <Button onClick={playVideo} sx={{ display: "inline" }}>
          Play Video
        </Button>
        <Modal
          disableBackdropClick="true"
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style} autoComplete="off">
            <Div>{question}</Div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              error={isFormInvalid}
              helperText={helper}
              name="answer"
              onChange={handleFormChange}
              defaultValue={formDataAnswer}
              sx={{ display: "block" }}
            />

            <Button
              onClick={handleSubmit}
              sx={{ display: "inline" }}
              type="submit"
            >
              Submit
            </Button>
            <Button onClick={handleClose} sx={{ display: "inline" }}>
              Close
            </Button>
          </Box>
        </Modal>
      </CardContent>
      <CardMedia
        component="video"
        sx={{ maxWidth: "md" }}
        className="cld-video-player cld-flui"
        id="myvideo"
      />
    </Card>
  );
}
