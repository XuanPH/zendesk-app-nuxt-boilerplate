const SET_WEBLOGS = (state, weblogs) => {
  state.weblogs = weblogs.data.results.content;
  state.paging = weblogs.data.results.page;
  state.paging.currentPage++;
};

const SET_PAGE = (state, data) => {
  state.paging = data;
};

const SET_LEAD = (state, leadId) => {
  state.leadId = leadId;
};
export default {
  SET_WEBLOGS,
  SET_LEAD,
  SET_PAGE
};
