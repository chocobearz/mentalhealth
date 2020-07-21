import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Main} from "./Components/Main";
import {myTheme} from "./theme"
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (<div className="App">
    <ThemeProvider theme={myTheme}>
        <Main/>
    </ThemeProvider>
    </div>);
}

export default App;
