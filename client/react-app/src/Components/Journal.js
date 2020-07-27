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
import {getSentimentLabel, getSentimentEntities, reweight} from "../Requests/journalRequests"
import {colors} from "../colors"
export class Journal extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      journalEntry: "",
      label: 0,
      entities: [],
      weights: [],
      ratingValue: 3,
      dialogOpen: false,
      personalRatedScore: '',
      calculatedScore: ''

    }
  }

  textFieldChange = (event) => {
    this.setState({journalEntry: event.target.value})
    this.fetchJournalScore()
    this.fetchJournalEntities()


  }

  fetchJournalEntities = () => {
    let entityList = []
     getSentimentEntities(this.state.journalEntry).then(
      (value) => { 
        for (let i in value.entities) {
          if (0.3 < value.entities[i].salience &&  value.entities[i].salience < 0.7)
            entityList.push(value.entities[i].name)
        }
        this.setState({entities: entityList})
      },
      (error) => {
      }
    )
  }

  fetchJournalScore = () => {
     getSentimentLabel(this.state.journalEntry).then(
      (value) => { 
        this.setState({label: value.label})
      },
      (error) => {
      }
    )
  }

  onRatingChange = (event, value) => {
    this.setState({ratingValue: value})
  }

  openDialog = () => {
    this.setState({dialogOpen: true})
  }

  fetchReWeight = () => {
    reweight(this.state.journalEntry, this.state.ratingValue).then(
      (value) => { 
        this.setState({dialogOpen: false})
        this.setState({personalRatedScore: value.currentScore})
        this.setState({calculatedScore: value.journalScore})
        this.setState({weights: value.weights})
      },
      (error) => {
      }
    )
  }




  render() {
    let entityList = this.state.entities.toString()
    let weights = this.state.weights.toString()
    let action = ''
    if (this.state.label == 0) {
      action = "No action"
    } 
    if (this.state.label == -2) {
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
            onChange={this.textFieldChange}
          />
          <Button style={styles.buttonStyle} variant="contained" color="primary">
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
                <ListItemText primary={"Sentiment Label: " + this.state.label} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Sentiment Entities: " + this.state.entityList} />
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary={"Action: " + action} />
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary={"Weights: " + this.state.weights} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Journal Calculated Score: " + this.statecalculatedScore}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={"Personal Rated Score:" + this.state.personalRatedScore } />
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
