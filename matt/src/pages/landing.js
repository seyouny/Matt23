import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
// import API from '../controllers/controller'
import './style.css'

<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: "#89cff0"
  },
  backButton: {
    marginRight: theme.spacing(1),
    backgroundColor: "#89cff0"

  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["1", "2", "3"];
}



// 'Upload any cute pictures for memories', 'Upload a happy birthday video', 'Pitch in for a butt massager'
function getStepContent(step) {
  // const [songs, setSong] = useState({})
  // state = {
  //   song: '',
  //   artist: ''
  // }

  switch (step) {
    case 0:
      return (
        <div>
          <h3>Please upload a video clip (around 30seconds to a minute) saying Happy Birthday or anything to Matt.</h3>
          <form action="/action_page.php">
            <label for="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*" />
            <input type="submit" />
          </form>
          <br></br>
        </div>
      )
    case 1:
      return (
        <div>
          <h3>This is where you can upload your favorites moments or memories with Matt or anything that represents who he is (like sushi and Russell).</h3>
          <form action="/action_page.php">
            <label for="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*" />
          </form>
          <br></br>
        </div>
      )
    case 2:
      // function myFunction() {
      //   var oneSong = document.getElementById("song").value;
      //   var oneArtist = document.getElementById('artist').value;
      //   console.log(oneSong,oneArtist)
      //   axios({
      //     method: 'post',
      //     url: '/api/song',
      //     data: {
      //       song: oneSong,
      //       artist: oneArtist
      //     }
      //   });
      // }
      return (

        <div>
          <h3>Matt loves his spotify playlists! Let's create him a custom playlist :3</h3>
          <form>
            <label>Song Name: </label>
            <input type="text" id="song" name="song" />
            <br></br>
            <label>Artist Name: </label>
            <input type="text" id="artist" name="artist" />
            <br></br>
            <button type="button" onClick={async(event) => {
              var oneSong = document.getElementById("song").value;
              var oneArtist = document.getElementById('artist').value;
              console.log(oneSong, oneArtist)
              var sendData = {
                song: oneSong,
                artist: oneArtist
              };
              var data = new FormData();
              data.append("json", JSON.stringify(sendData));
              // let formData = new FormData();
              // formData.append('song', oneSong);
              // formData.append('artist', oneArtist);
              console.log('data',JSON.stringify(sendData))
              console.log('data',JSON.parse(JSON.stringify(sendData)))

              fetch('http://localhost:3001/api/song', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)
              })
                .then((response) => { console.log(response) 
                  return response.text()
                }).then((response)=>{
                  console.log(response)
                })
                .catch((err) => {
                  console.log(err)
                })

              // return 
              // console.log(oneSong, oneArtist)
              // axios.post('localhost:3001/', {
              //   song: oneSong,
              //   artist: oneArtist
              // })
              // .then((response) => {
              //   console.log(response)
              // })
              // .catch((error) => {
              //   console.log(error)
              // })
              // event.preventDefault();
            }}


            >Submit</button>


          </form>
        </div>
      );
    default:
      return 'Unknown step';
  }
}


export default function Landing() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
        // find the first step that has been completed
        steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>

              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="#89cff0" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
