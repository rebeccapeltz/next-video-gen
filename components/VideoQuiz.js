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
import { useRouter } from "next/router";

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

export default function VideoQuiz(props) {
  // console.log("props", props.quiz);
  // console.log("times",props.quiz.playedEventTimes)

  const cld = new Cloudinary({ cloud_name: props.quiz.cloudName });
  const publicId = props.quiz.publicId;

  
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [media, setMedia] = React.useState(null);

  const [formDataAnswer, setFormDataAnswer] = useState("");
  const [formDataCorrect, setFormDataCorrect] = useState(false);
  const [question, setQuestion] = useState(""); 
  const [errorResponse, setErrorResponse] = useState(""); // Correct:
  const [correctResponse, setCorrectResponse] = useState(""); // Correct!
  const [correctAnswer, setCorrectAnswer] = useState(""); 
  // form is initially neither valid nor invalid
  // user must submit before one of they get set
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [helper, setHelper] = useState("Enter a number");


  const initState = () => {
    setOpen(false);
    setQuestion("");
    setErrorResponse("");
    setCorrectResponse("");
    setCorrectAnswer("");
    setIsFormInvalid(false);
    setHelper("Enter a number");
  };

  const navToCreateVideo = () => {
    router.push("/create_video");
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
    // debugger;
    setFormDataCorrect(event.target.value === correctAnswer);
  }
  useEffect(() => {
    const media = cld.videoPlayer("myvideo", {
      publicId: publicId,
      fluid: true,
      controls: true,
      autoplay: false,
      preload: "auto",
      mute: true,
      bigPlayButton: true,
      playedEventTimes: props.quiz.playedEventTimes,
      transformation: {
        aspect_ratio: "1.5",
        width: 400,
        crop: "fill",
      },
      
      posterOptions: {
        publicId: "cats-and-dogs",
      },
    });
    setMedia(media);
    media.on("ended", (event) => {
      initState();
    });
    media.on("timeplayed", (event) => {
      let time = event.eventData.time;
      if (props.quiz.questions[time]){
        media.pause();
        handleOpen();
        // debugger;
        setQuestion(props.quiz.questions[time].question);
        setCorrectResponse(props.quiz.questions[time].correctResponse);
        setErrorResponse(props.quiz.questions[time].errorResponse);
        setCorrectAnswer(props.quiz.questions[time].correctAnswer);
      }
      console.log(event.eventData.time + " seconds played");
    });
  }, []);

  const playVideo = () => {
    media.play();
    //disable button
  };
  return (
    <Card sx={{ maxWidth: "sm" }}>
      <CardContent sx={{ maxWidth: "sm" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={navToCreateVideo}
          sx={{ display: "block" }}
        >
          Go to Create Video
        </Button>
        <Typography component="div" variant="h5">
          Video
        </Typography>
        {/* <Button onClick={playVideo} sx={{ display: "inline" }}>
          Play Video
        </Button> */}
        <Modal
          open={open}
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
