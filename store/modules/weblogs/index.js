import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  weblogs: [],
  paging: {
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalRecords: 0
  },
  leadId: "",
  loading: true
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
