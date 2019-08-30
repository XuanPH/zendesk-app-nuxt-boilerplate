const mutations = {
  LOADING_SET(state, value) {
    state.loading = value;
  },
  ZAF_SET(state, zafClient) {
    state.zafClient = zafClient;
  },
  RESIZE(state, zafClient) {
    setTimeout(() => {
      const maxHeight = document.body.clientHeight;
      zafClient.invoke("resize", { height: maxHeight + 50 });
    }, 100);
  },
  SET_LOCATION(state, payload) {
    state.currentLocation = payload;
  }
};
export default mutations;
