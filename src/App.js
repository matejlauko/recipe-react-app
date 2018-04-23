import React, { Component } from 'react';
import styles from './App.scss';
import Add from './Add';
import List from './List';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    this.setState({ error: true });
  }

  render() {
    return this.state.error ? (
      <h1 style={{ color: 'red' }}>Something went wrong. Refresh the app</h1>
    ) : (
      <Router>
        <main role="main" className={styles.App}>
          <Route path="/" component={List} />
          <Route path="/add" component={Add} />
        </main>
      </Router>
    );
  }
}

export default App;
