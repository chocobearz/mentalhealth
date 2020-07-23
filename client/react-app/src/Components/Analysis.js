import React from 'react'
import TextField from '@material-ui/core/TextField';
import {colors} from "../colors"
import {Nav} from "./Nav"
export class Analysis extends React.Component<Props, State> {

  constructor(props) {
    super(props);
  }


  render() {
   return (
      <div style={styles.wrapper}>
        <TextField
          id="journalText"
          label="How are you feeling today?"
          multiline
          variant="outlined"
          style= {styles.journal}
          rows={25}
        />
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
  }
}
