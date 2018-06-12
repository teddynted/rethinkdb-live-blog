import React, { Component } from 'react';
import Blog from './blog';

export default class App extends Component {
  render() {
    return (
      <div className='row'>
         <Blog />
      </div>
    );
  }
}