export default {

    SET_Category (state, category) {
      state.category = category
    },
    SET_Article (state, article) {
      state.article = article
    },
    SET_Comments(state, comments) {
      state.comments = comments
    },
    SET_Descriptions(state, descriptions) {
      state.descriptions = descriptions
    },
    createNewList(state, payload) {
      state.lastListId++;
      const list = {
        id: state.lastListId,
        name: payload,
      };
      state.lists.push(list);
    },
    createNewCard(state, payload) {
      state.lastCardId++;
      const card = {
        listId: payload.listId,
        id: this.lastCardId,
        name: payload.name,
      };
      state.cards.push(card);
    },
    toggleOverlay(state) {
      state.overlay = !state.overlay;
    },
    openForm(state, payload) {
      state.currentData = payload;
    },
    saveCard(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card.id === payload.id) {
          return Object.assign({}, card, payload);
        }
        return card;
      });
    },
    deleteCard(state, payload) {
      const indexToDelete = state.cards
        .map((card) => card.id)
        .indexOf(payload.id);
      state.cards.splice(indexToDelete, 1);
    },
  
 
    lastListId(state) {
      return state.lastListId;
    },
    lastCardId(state) {
      return state.lastCardId;
    },
    lists(state) {
      return state.lists;
    },
    cards(state) {
      return state.cards;
    },
    overlay(state) {
      return state.overlay;
    },
    currentData(state) {
      return state.currentData;
    },
  };
  