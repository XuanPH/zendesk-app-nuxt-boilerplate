import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { Loading } from "element-ui";

const state = {
  socialInteractions: [],
  Loading: false
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
