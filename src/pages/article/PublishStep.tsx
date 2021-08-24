import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Chip, TextField } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);





export default function PublishStep() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkIndex, setCheckIndex] = React.useState<number>(0);
  const [desc, setDesc] = React.useState<string>('');
  const [keyword, setKeyword] = React.useState<string>('');
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function checkTag() {
    return <div>
      <Chip
        label="JavaSrcipt"
        clickable
        color={checkIndex === 0 ? 'secondary' : 'primary'}
        icon={<FaceIcon />}
        onClick={() => { handleClick(0) }}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        label="JavaSrcipt"
        clickable
        color={checkIndex === 1 ? 'secondary' : 'primary'}
        icon={<FaceIcon />}
        onClick={() => { handleClick(1) }}
        deleteIcon={<DoneIcon />}
      />
    </div>
  }

  function checkKeyWord() {
    return <TextField id="outlined-basic" label="Outlined" variant="outlined"  value={keyword} onChange={(e) => { setKeyword(e.target.value) }} />
  }

  function setDescData() {
    return <textarea value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return checkTag();
      case 1:
        return checkKeyWord();
      case 2:
        return setDescData();
      default:
        return 'Unknown step';
    }
  }

  function handleClick(value: number) {
    setCheckIndex(value);
  }

  function getSteps() {
    return ['设置标签', '设置关键字', '简短描述'];
  }

  function getStepData(index: number) {
    if (activeStep === index) return '';
    let result;
    switch (index) {
      case 0:
        result = checkIndex;
        break;
      case 1:
        result = keyword;
        break;
      case 2:
        result = desc;
        break;
      default:
        break;
    }
    return result || ''
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical" style={{ width: '500px' }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label + getStepData(index)}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )} */}
    </div>
  );
}
