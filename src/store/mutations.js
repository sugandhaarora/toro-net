import * as types from './mutation-types'
//import { compareSync } from '../../../../.cache/typescript/2.6/node_modules/@types/bcryptjs';

export const mutations = {
  [types.GET_USER] (state, user) {
    state.user = user
  },
  [types.GET_COUNT] (state, count_payload) {
    state.counts = count_payload
  },
  [types.INC_COUNT] (state, count_payload) {
    state.counts.count = count_payload
  },
  [types.REGISTER] (state, user_payload) {
    state.user = user_payload
  },
  [types.LOGIN] (state, user_payload) {
    state.user = user_payload
  },
  [types.LOGOUT] (state) {
    state.user = {}
  },
  [types.ADD_POST] (state, posts_payload) {
    //state.posts = posts_payload
    state.posts.push( posts_payload) 
  },
  [types.GET_POSTS] (state, posts_payload) {
   state.posts=posts_payload
   console.log("mutation-call")
    //state.posts.push( posts_payload) 
    console.log("mutation-call--posts_paylaod")
    console.log(posts_payload)
    console.log("mutation-call--state.posts")
    console.log(state.posts)
    console.log("~~~~END~~~~MUTATIONS")

  }
}
