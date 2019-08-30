const actions = {
  loading({ commit }, payload) {
    commit("LOADING_SET", payload);
  },
  setZAFClient({ commit }, payload) {
    commit("ZAF_SET", payload);
  },
  resizeClient({ commit }, payload) {
    commit("RESIZE", payload);
  },
  setLocation({ commit }, payload) {
    commit("SET_LOCATION", payload);
  }
};
export default actions;
