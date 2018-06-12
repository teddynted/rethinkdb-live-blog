import axios from 'axios';

export const BLOG_POST = 'BLOG_POST';

export function createPost( props ){
   const request = axios.post('/api/post/', props );
   return {
      type: BLOG_POST,
      payload: request
   }
}