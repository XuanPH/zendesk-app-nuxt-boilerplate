import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  query: {
    from: 0,
    size: 200,
    query: {
      bool: {
        must: [
          {
            match: {
              code: {
                query: "livingPlace",
                operator: "and"
              }
            }
          },
          {
            term: {
              language: "vi"
            }
          }
        ]
      }
    }
  },
  loading: false
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
