import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {NavListItem} from "./NavListItem"

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

  onNavClick = (id) => {
    this.props.changeNavPage(id)
    this.setState({navOpen: false})
  }

  render() {
   return (
      <div style={styles.navWrapper}>
        <Button onClick={this.toggleDrawer}><MenuIcon fontSize="large"/></Button>
        <Drawer anchor="left" open={this.state.navOpen} onClose={this.toggleDrawer}>
        <List>
          <NavListItem id="Journal"  onNavClick={this.onNavClick} icon={<MenuBookIcon />}/>
          <NavListItem id="Support Network" onNavClick={this.onNavClick} icon={<PeopleIcon />}/>
        </List>
        <Divider/>
        <List>
          <NavListItem id="Analysis" text="Text Analysis" onNavClick={this.onNavClick} icon={<AssignmentIcon />}/>
        </List>
        </Drawer>
      </div>)
    }

}

const styles = {
  navWrapper: {
    display: "flex",
    justifyContent: "flex-start"
  },
}
