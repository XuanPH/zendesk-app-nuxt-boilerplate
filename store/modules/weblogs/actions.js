import ls from "../../../common/localStorage";
async function getWeblogs(context) {
  context.state.loading = true;
  var page = context.state.paging.currentPage - 1;
  var res = await this.$axios.get(
    `/lead/weblog?leadId=${context.state.leadId}&page=${page}&pageSize=${context.state.paging.pageSize}`
  );
  await context.commit("SET_WEBLOGS", res);
  context.state.loading = false;
}

function setPage(context, payload) {
  context.commit("SET_PAGE", payload);
}

function setLead(context, payload) {
  context.commit("SET_LEAD", payload);
}

export default {
  getWeblogs,
  setPage,
  setLead
};
