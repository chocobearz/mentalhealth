import React from 'react'
import TextField from '@material-ui/core/TextField';
import {Supporter} from "./Supporter"
export class Support extends React.Component<Props, State> {

  constructor(props) {
    super(props);
  }


  render() {
    const supportersList = [{id: 12, name: "Jesse Elm", phonenumber: "1234567890", supportlevel: 3}, {id: 4, name: "Mom", phonenumber: "1234567890", supportlevel: 1}, {id: 5, name: "Casey", phonenumber: "1234567890", supportlevel: 1}]

    let supporters = (supportersList).map((supporter, i) =>
    <Supporter  name={supporter.name} index={i} key={i} id={supporter.id} phonenumber={supporter.phonenumber}/>
    );
   return (
      <div style={styles.wrapper}>
        <div>
        </div>
        <div>
          {supporters}
        </div>
      </div>)
    }

}

const styles = {
  wrapper: {
    flex:1,
    margin: 100,
  },
}
