import React, { PureComponent } from 'react';
import { Well } from 'react-bootstrap';

import Loader from './Loader.js';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <Well>
        <Well>
          <label onClick={this.clicked}>Well 1</label>
        </Well>
        <Well>
          <label onClick={this.clicked}>Well 2</label>
        </Well>
        <Well className='relative'>
          <label onClick={this.clicked}>Well 3</label>
          <Loader />
        </Well>
      </Well>
    )
  }

  clicked(event) {
    console.log(`${event.target.textContent} called!`);
  }
}

export default App;
