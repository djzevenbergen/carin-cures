
import React from 'react';
import Header from './Header';
import RemedyList from './RemedyList';
import SignIn from './SignIn';
import moduleName from './RemedyList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.css';

const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff'
};

function App() {

  return (


    <Router>
      <ThemeProvider theme={theme}>
        <Header theme={theme} />
        <Switch>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route exact path='/'>
            <RemedyList />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;