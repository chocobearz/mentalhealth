import React from 'react'
import ReactDOM from 'react-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {colors} from "../colors"
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIcon from '@material-ui/icons/Assignment';

export class Nav extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    }
  }

  toggleDrawer = (newState) => {
    this.setState({navOpen: !this.state.navOpen})
  }

  handleClose = () => {

  }

  render() {
   return (
      <div>
        <Button onClick={this.toggleDrawer}><MenuIcon/></Button>
        <Drawer anchor="left" open={this.state.navOpen} onClose={this.toggleDrawer}>
        <List>
            <ListItem button key="Journal">
              <ListItemIcon> <MenuBookIcon /> </ListItemIcon>
              <ListItemText primary="Journal" />
            </ListItem>
            <ListItem button key="Support">
              <ListItemIcon> <PeopleIcon /> </ListItemIcon>
              <ListItemText primary="Support Network" />
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button key="Analysis">
              <ListItemIcon> <AssignmentIcon /> </ListItemIcon>
              <ListItemText primary="Text Analysis" />
            </ListItem>
        </List>
        </Drawer>
      </div>)
    }

}