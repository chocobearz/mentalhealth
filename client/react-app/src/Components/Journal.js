import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ReWeightDialog from "./ReWeightDialog"
import {getSentimentLabel, getSentimentEntities, submitSentimentLabel, reweight, sendSMS} from "../Requests/journalRequests"
import {colors} from "../colors"

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export class Journal extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      journalEntry: "",
      label: 0,
      labelText: "",
      entities: [],
      weights: [],
      ratingValue: 3,
      ratingLabel: '',
      dialogOpen: false,
      personalRatedScore: '',
      calculatedScore: '',
      calculatedText: '',
      loadingReweight: false,
      loadingFetch: false

    }
  }

  componentDidMount() {
        this.timer = null;
    }

  handleChange = (event) => {
        clearTimeout(this.timer);

        this.setState({journalEntry: event.target.value});

        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }

    handleKeyDown = (e) =>{
        if (e.keyCode === ENTER_KEY) {
            this.triggerChange();
        }
    }

    triggerChange = () => {
        this.textFieldChange();
    }

  textFieldChange = () => {
    //this.setState({journalEntry: event.target.value})
    this.fetchJournalScore()
    this.fetchJournalEntities()


  }

  fetchJournalEntities = () => {
    let entityList = []
     getSentimentEntities(this.state.journalEntry).then(
      (value) => { 
        for (let i in value.entities) {
          if (0.2 < value.entities[i].salience &&  value.entities[i].salience < 0.7) {
            entityList.push(value.entities[i].name)
          }
        }
        this.setState({entities: entityList})
      },
      (error) => {
      }
    )
  }

  fetchJournalScore = () => {
    this.setState({loadingFetch: true})
     getSentimentLabel(this.state.journalEntry).then(
      (value) => { 
        if(value.label > 0) {
          this.setState({labelText: "happy"})
        } else if (value < -3) {
          this.setState({labelText: "sad"})
        } else {
          this.setState({labelText: "crisis"})
        }
            this.setState({label: value.label, longtermScore: value.longtermScore})
            this.setState({loadingFetch: false})
      },
      (error) => {
      }
    )
  }

  onSubmitRating = () => {
    submitSentimentLabel(this.state.journalEntry).then(
      (value) => { 
        if(value.label == -3) {
          sendSMS()
        }
        this.setState({label: value.label, longtermScore: value.longtermScore})
      },
      (error) => {
      })
  }

  onRatingChange = (event, value) => {
    switch(value) {
      case 0: 
        this.setState({ratingLabel: "crisis"})
        this.setState({ratingValue: -4})
      case 1: 
        this.setState({ratingLabel: "sad"})
        this.setState({ratingValue: -3})
      case 2: 
        this.setState({ratingLabel: "sad"})
        this.setState({ratingValue: -1})
      case 3: 
        this.setState({ratingLabel: "sad"})
        this.setState({ratingValue: 0})
      case 4: 
        this.setState({ratingLabel: "happy"})
        this.setState({ratingValue: 1})
      case 5: 
        this.setState({ratingLabel: "happy"})
        this.setState({ratingValue: 3})
    }
  }

  openDialog = () => {
    this.setState({dialogOpen: true})
  }

  fetchReWeight = () => {
    this.setState({dialogOpen: false})
    this.setState({loadingReweight: true})
    reweight(this.state.journalEntry, this.state.ratingValue).then(
      (value) => { 
        if(value.journalScore > 0) {
          this.setState({calculatedText: "happy"})
        } else if (value < -3) {
          this.setState({calculatedText: "sad"})
        } else {
          this.setState({calculatedText: "crisis"})
        }
        this.setState({personalRatedScore: value.currentScore})
        this.setState({calculatedScore: value.journalScore})
        this.setState({weights: value.weights})
        this.setState({loadingReweight: false})
      },
      (error) => {
      }
    )
  }




  render() {
    let weights = this.state.weights.toString()
    let action = ''
    if (this.state.label == 1) {
      action = "Provide positive reinforcement message"
    } 
    if (this.state.label == -1) {
      action = "Contact first level support. Suggest self-care activity"
    } 
    if (this.state.label == -3) {
      action = "Contact entire support network. Provide crisis intervention resources"
    }
   return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <TextField
            id="journalText"
            label="How are you feeling today?"
            multiline
            value={this.state.journalEntry}
            variant="outlined"
            style= {styles.journal}
            rows={25}
            onChange={this.handleChange}
          />
          <Button onClick={this.onSubmitRating} style={styles.buttonStyle} variant="contained" color="primary">
            Submit
          </Button>
          {this.props.openAnalysisTab &&<Button onClick={this.openDialog} style={styles.buttonStyle} variant="contained" color="primary">
            ReWeight
          </Button> }
        </div>
        {this.props.openAnalysisTab && <div style={styles.container}>
          <Paper elevation={0} variant="outlined" style={styles.analysis}>
            <List>
              <ListItem>
                <ListItemText primary={!this.state.loadingFetch? ("Sentiment Label: " + this.state.labelText) : "Loading..."} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Sentiment Entities: " + this.state.entities.toString()} />
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary={"Action: " + action} />
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary={!this.state.loadingReweight? ("Weights: " + this.state.weights) : "Loading..."} />
              </ListItem>
              <ListItem>
                <ListItemText primary={!this.state.loadingReweight? ("Journal Calculated Score: " + this.state.calculatedText) : "Loading..."}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={!this.state.loadingReweight?  ("Personal Rated Score:" + this.state.ratingLabel) : "Loading..."} />
              </ListItem>
            </List>
          </Paper>
          <ReWeightDialog dialogOpen={this.state.dialogOpen} onSubmit={this.fetchReWeight} onRatingChange={this.onRatingChange}/>
        </div>}
      </div>)
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flex:1,
    margin: 80,
  },
  journal: {
    width: "100%",
    backgroundColor: "rgba(247, 209, 205, 0.3)"
  },
  buttonStyle: {
    margin: 20
  },
  container: {
    flex: 1,
    margin:10
  },
  analysis: {
    backgroundColor: "rgba(209, 179, 196, 1)"
  }
}
