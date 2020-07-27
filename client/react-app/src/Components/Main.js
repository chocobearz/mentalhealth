import React from 'react'
import TextField from '@material-ui/core/TextField';
import {colors} from "../colors"
import {Nav} from "./Nav/Nav"
import {Journal} from "./Journal"
import {Support} from "./Support/Support"
const logo = require('./IW.png')

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
      <img src={logo} />
      <Nav changeNavPage={this.changeNavPage} toggleOpenAnalysisTab={this.toggleOpenAnalysisTab}/>
      <h2>{this.state.navPage}</h2>
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
  }
}
