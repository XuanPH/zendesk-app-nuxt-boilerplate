import leadsModule from "./modules/leads";
import weblogModule from "./modules/weblogs";
import interestModule from "./modules/interest";
import interactionSocialModule from "./modules/social_interaction";
import ls from "../common/localStorage";
import Vuex from "vuex";
const createStore = () => {
  return new Vuex.Store({
    state: {
      zafClient: null,
      appLoading: true,
      currentLocation: "",
      token: "",
      commonData: null
    },
    modules: {
      leads: leadsModule,
      weblogs: weblogModule,
      interest: interestModule,
      interactionSocial: interactionSocialModule
    },
    getters: {
      loading: state => state.loading,
      zafClient: state => state.zafClient,
      getLocation: state => state.currentLocation,
      token: state => ls.getLocalStorage("token"),
      commonData: state => state.commonData,
      appLoading: state => state.appLoading
    },
    actions: {
      loading({ commit }, payload) {
        commit("LOADING_SET", payload);
      },
      setZAFClient({ commit }, payload) {
        commit("ZAF_SET", payload);
      },
      resizeClient({ commit }, payload) {
        commit("RESIZE", payload);
      },
      setParams({ commit }, payload) {
        commit("SET_PARAMS", payload);
      },
      async getCommonData(context) {
        let res = await this.$axios.get("/All/get");
        var data = res.data;
        context.commit("GET_COMMON_DATA", data);
      }
    },
    mutations: {
      LOADING_SET(state, value) {
        state.appLoading = value;
      },
      ZAF_SET(state, value) {
        console.log("zafClient setted");
        state.zafClient = value.client;
        state.appData = value.appData;
      },
      RESIZE(state) {
        setTimeout(() => {
          const maxHeight = document.body.clientHeight;
          state.zafClient.invoke("resize", { height: maxHeight + 50 });
        }, 100);
      },
      SET_PARAMS(state, payload) {
        state.currentLocation = payload.context.location;
        let token = payload.metadata.settings["O2O-Token"];
        ls.setLocalStorage("token", token);
      },
      GET_COMMON_DATA(state, data) {
        state.commonData = data;
      }
    }
  });
};
export default createStore;
