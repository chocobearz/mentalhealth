import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export class NavListItem extends React.Component<Props, State> {

  constructor(props) {
    super(props);
  }

  onNavClick = () => {
    this.props.onNavClick(this.props.id)
  }

  render() {
   return (<ListItem button onClick={this.onNavClick}>
              <ListItemIcon> {this.props.icon} </ListItemIcon>
              <ListItemText primary={this.props.id} />
            </ListItem>
          )
    }

}
