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
import { useSelector } from 'react-redux';
import { selectAllCategory } from 'store/feature/categorySlice';
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


export default function PublishStep(props: { publish: any }) {

  const { publish = () => { } } = props;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkIndex, setCheckIndex] = React.useState<number>(1);
  const [desc, setDesc] = React.useState<string>('');
  const [keyword, setKeyword] = React.useState<string>('');
  const steps = getSteps();

  const categoryList = useSelector(selectAllCategory);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2) {
      toPublish();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const toPublish = () => {
    publish({
      description: desc,
      category_id: checkIndex || 1,
      seo_keyword: keyword || 'js'
    })
  }

  function checkTag() {
    return <div>
      {
        categoryList.map((c) =>
          <Chip
            key={c.id}
            label={c.name}
            clickable
            color={checkIndex === c.id ? 'secondary' : 'primary'}
            icon={<FaceIcon />}
            onClick={() => { handleClick(c.id) }}
            deleteIcon={<DoneIcon />}
          />
        )
      }

    </div>
  }

  function checkKeyWord() {
    return <TextField id="outlined-basic" label="Outlined" variant="outlined" value={keyword} onChange={(e) => { setKeyword(e.target.value) }} />
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
    return ['设置标签', '设置关键字', '文章简短描述'];
  }

  function shoTagName(id: number) {
    return categoryList.find(i => i.id === id)?.name;
  }

  function getStepData(index: number) {
    if (activeStep === index) return '';
    let result;
    switch (index) {
      case 0:
        result = shoTagName(checkIndex);
        break;
      case 1:
        result = keyword;
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
            <StepLabel>{label + ' ' + getStepData(index)}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    返回
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '发布' : '下一步'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
