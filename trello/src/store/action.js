import axios from "axios";

export default {
  loadCategory({ commit }) {
        axios
            .get('https://twp.oxy-development.fr/wp-json/wp/v2/categories', {
                headers: {
                  'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                }
            })
            .then(response => response.data)
            .then(category => {
                
            commit('SET_Category', category)
        })
    },

    loadArticle({ commit }) {
      axios
          .get('https://twp.oxy-development.fr/wp-json/wp/v2/posts', {
              headers: {
                'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
              }
          })
          .then(response => response.data)
          .then(article => {
              
          commit('SET_Article', article)
      })
  },
  loadComments({ commit }) {
    axios
        .get('https://twp.oxy-development.fr/wp-json/wp/v2/comments', {
            headers: {
              'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
            }
        })
        .then(response => response.data)
        .then(comments => {
            
        commit('SET_Comments', comments)
    })
  },
  loadDescriptions({ commit }) {
    axios
        .get('https://twp.oxy-development.fr/wp-json/wp/v2/posts', {
            headers: {
              'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
            }
        })
        .then(response => response.data.content)
        .then(descriptions => {
            
        commit('SET_Descriptions', descriptions)
    })
  },
};
   