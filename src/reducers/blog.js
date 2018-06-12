import { BLOG_POST } from '../actions/index';

export default function( state = [], action ) {
   switch(action.type){
      case BLOG_POST:
        return action.payload
   }
   return state;
}