import React, { Component } from 'react';

class Posts extends Component {
   render(){
      let list = this.props.posts.map((item, i) => {
         // Convert ISO Date to time Format h:m
         let date = new Date(item.createdAt), hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(), datetime = hour + ':' + ( minutes > 9 ? minutes : '0' + minutes ), ampm = ( hour >= 0 && hour <= 11 ? 'AM' : 'PM' ), timeStampStyle = { display: 'inline-block', background: '#bfbfbf', color: '#333', padding: '6px', fontSize: '12px' };
         return <li className="list-group-item" key={i}><span style={timeStampStyle}>{datetime} {ampm}</span> {item.post}</li>
      }); 
      return(
        <div className="col-lg-12 col-md-12">
          <h2>Live updates</h2>
          <ul className="list-group">
           {list}
          </ul> 
        </div>
      );
   }
}

export default Posts;