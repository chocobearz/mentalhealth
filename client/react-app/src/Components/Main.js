import React from 'react'
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import {colors} from "../colors"
import {Nav} from "./Nav"
export class Main extends React.Component<Props, State> {

  constructor(props) {
    super(props);
  }


  render() {
   return (
    <div style={styles.base}>
      <Nav/>
      <div style={styles.wrapper}>
        <TextField
          id="journalText"
          label="How are you feeling today?"
          multiline
          variant="outlined"
          style= {styles.journal}
          rows={25}
        />
      </div>
    </div>)
    }

}

const styles = {
  base: {
    flex:1
  },
  wrapper: {
    flex:1,
    margin: 100,
  },
  journal: {
    width: "100%",
    backgroundColor: "rgba(247, 209, 205, 0.3)"
  }
}
