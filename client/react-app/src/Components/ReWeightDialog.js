import React from 'react'
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {colors} from "../colors"



export default function ReWeightDialog(props) {


    const classes = useStyles()
   return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.dialogOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          How are you feeling right now?
        </DialogTitle>
        <DialogContent >
          <Typography >
            This will help us personalize our app's ratings to your journaling style and increase prediction accuracy.
          </Typography>
        </DialogContent>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            max={6}
            onChange={props.onRatingChange}
            classes={{
              iconFilled: classes.iconFilled,
              iconHover: classes.iconHover
            }}
            name="customized-icons"
            defaultValue={3}
            getLabelText={(value) => customIcons[value].label}
            IconContainerComponent={IconContainer}
          />
        </Box>
        <DialogActions>
          <Button autoFocus onClick={props.onSubmit} color="primary">
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
  );
}
function handleClose(){

  }

  function IconContainer(props){
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }


const useStyles = makeStyles({
  iconFilled: {
    color: '#735D78',
  },
  iconHover: {
    color: '#735D78',
  },
});

const styles = {
  wrapper: {
    flex:1,
    margin: 100,
  },
  journal: {
    width: "100%",
    backgroundColor: "rgba(247, 209, 205, 0.3)"
  },
}

const customIcons = {
        1: {
          icon: <MoodBadIcon />,
          label: 'Very Very Dissatisfied',
        },
        2: {
          icon: <SentimentVeryDissatisfiedIcon />,
          label: 'Very Dissatisfied',
        },
        3: {
          icon: <SentimentDissatisfiedIcon />,
          label: 'Dissatisfied',
        },
        4: {
          icon: <SentimentSatisfiedIcon />,
          label: 'Neutral',
        },
        5: {
          icon: <SentimentSatisfiedAltIcon />,
          label: 'Satisfied',
        },
        6: {
          icon: <SentimentVerySatisfiedIcon />,
          label: 'Very Satisfied',
        }
    };
