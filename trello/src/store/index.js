import { createStore } from "vuex";

import rootMutations from "./mutation";
import rootActions from "./action";


const store = createStore({
  state() {
    return {
      lastListId: 3,
      lastCardId: 5,
      currentData: null,
      category:[],
      article:[],  
      lists: [],
      cards: [],
      comments: [],
      descriptions:[],
    };
  },
  mutations: rootMutations,
  actions: rootActions, 
  getters: {
      getarticle: state => {
      return state.article;
      },

      getcategory: state => {
      return state.category;
      },
      getLists(state)
      {
        return state.lists
      },
      getCards(state)
      {
        return state.cards
      },
      getComments(state)
      {
        return state.comments
      },
      getDescriptions(state)
      {
        return state.descriptions
      },
  } 
});

export default store;