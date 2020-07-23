import React from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {colors} from "../../colors"
export class Supporter extends React.Component<Props, State> {

  constructor(props) {
    super(props);
  }


  render() {
    const initial = this.props.pending? "!" : this.props.name.charAt(0)
    const color = (this.props.index % 2 == 0) ? colors.mediumPurple : colors.lightPurple
    const avatarStyle= {
      backgroundColor: color,
    } 
   return (
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <div style={styles.cardElement}>
          <Avatar style={avatarStyle} >{initial}</Avatar>
          </div>
          <div style={styles.cardElement}>{this.props.name}</div>
          <div style={styles.cardElement}>{this.props.phonenumber}</div>
        </CardContent>
    </Card>)
    }

}

const styles = {
  card: {
    flex:1,
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
    backgroundColor: "rgba(237, 219, 217, 0.6)"
  },
  cardContent: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  },
  cardElement: {
    display: "flex",
    flex: 1
  }
}
