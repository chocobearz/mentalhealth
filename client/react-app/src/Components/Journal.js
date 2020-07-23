import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {colors} from "../colors"
export class Journal extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      journalEntry: ""
    }
  }

  textFieldChange = (event) => {
    this.setState({journalEntry: event.target.value})
  }


  render() {
   return (
      <div style={styles.wrapper}>
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
      </div>)
  }
}

const styles = {
  wrapper: {
    flex:1,
    margin: 100,
  },
  journal: {
    width: "100%",
    backgroundColor: "rgba(247, 209, 205, 0.3)"
  },
  buttonStyle: {
    margin: 20
  }
}
