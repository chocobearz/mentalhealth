import React from 'react'
import TextField from '@material-ui/core/TextField';
import {colors} from "../colors"
import {Nav} from "./Nav/Nav"
import {Journal} from "./Journal"
import {Support} from "./Support/Support"
const logo = require('./logo.png')

export class Main extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      navPage: "Journal",
      userId: 1,
      openAnalysisTab: false
    }
  }

  changeNavPage = (selectedPage) => {
    this.setState({navPage: selectedPage})
  }

  toggleOpenAnalysisTab = () => {
    this.setState({openAnalysisTab: !this.state.openAnalysisTab})
  }

  render() {
   return (
    <div style={styles.base}>
      <div  style={styles.header}>
        <div style={styles.navcontainer}>
          <Nav changeNavPage={this.changeNavPage} toggleOpenAnalysisTab={this.toggleOpenAnalysisTab}/>
        </div>
        <div style={styles.imgcontainer}>
          <img src={logo} style={styles.img}/> 
        </div>
      </div>
        {this.state.navPage == "Journal" && <Journal userId={this.state.userId} openAnalysisTab={this.state.openAnalysisTab}/>}
        {this.state.navPage == "Support Network" && <Support userId={this.state.userId}/>}
    </div>)
    }

}

const styles = {
  base: {
    flex:1
  },
  wrapper: {
    flex:1,
    margin: "80 100",
  },
  journal: {
    width: "100%",
    backgroundColor: "rgba(247, 209, 205, 0.3)"
  },
  img: {
    width: '150px'
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop:10
  },
  navcontainer : {
    marginTop: 30,
    marginLeft: 10
  },
  imgcontainer: {
    flex: '0 1 auto',
      width: '150px',
      height: '100px',
      position: 'absolute',             /* new */
      left: '50%',
      transform: 'translateX(-50%)'
  }
}
