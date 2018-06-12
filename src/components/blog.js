import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPost } from '../actions/index';
import io from "socket.io-client";
import Posts from './posts';

class Blog extends Component {
    constructor(props){
      super(props);
      this.socket = io('http://localhost:1994', { transports: [ 'websocket', 'polling', 'flashsocket' ] });
      this.state = { post: '', posts: [] }
    }
    componentDidMount(){
       this.socket.on('posts', data => {
          if( Object.keys(this.state.posts).length > 0 && Object.keys(data).length > 0 ) {
              this.setState({ posts: [ data[0], ...this.state.posts ]});
          } else {
              this.setState({ posts: data });
          }
       });
    }
    onSubmit(e){
      e.preventDefault();
      if( this.state.post !== '' ) {
          this.props.createPost({ post: this.state.post });
      } else {
          alert('Blog post is required!');
      }
    }
    handleChange(e){      
      this.setState({ post : e.target.value });
    }
    render() {
       return(
          <div className="col-lg-12 col-md-12">
             <div className="row">
                <div className="col-lg-12 col-md-12">
                   <h2>Update Blog</h2>
                   <form onSubmit={this.onSubmit.bind(this)}>
                     <div className="form-group">
                       <textarea name="post" type="blog-post" onChange={this.handleChange.bind(this)} className="form-control" id="blog-post" placeholder="Blog post"></textarea>
                     </div>
                     <button type="submit" className="btn btn-primary">Submit</button>
                   </form>
                </div> 
             </div>
             <div className="row">
                <Posts posts={this.state.posts} />
             </div> 
          </div> 
       );
    }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ createPost }, dispatch);
};

export default connect(null, mapStateToDispatch)(Blog);