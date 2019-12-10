import _ from "lodash";
async function initLeads(context, user) {
  context.dispatch("loading", true, { root: true });
  let res = await this.$axios.post("/lead", user);
  await context.commit("INIT_LIST_LEAD", res.data);
  context.dispatch("setLeadObject");
  context.dispatch("loading", false, { root: true });
}

async function setLead(context, leadId) {
  await context.commit("LEAD_SELECTED", leadId);
  await context.dispatch("setLeadObject");
}

async function setLeadObject(context) {
  await context.commit("SET_LEAD");
  await context.dispatch("resetInteractionList");
  await context.dispatch("initInteraction");
}

async function initInteraction(context) {
  context.state.interactionLoading = true;
  let activityTypes = _.map(
    _.filter(context.state.filterMenu, o => o.selected === true),
    item => item.value
  );
  if (activityTypes.length === 0) {
    activityTypes.push("all");
  }
  let passParam = {
    ...context.state.interactionQuery,
    activityTypes
  };
  try {
    let res = await this.$axios.post(
      `/lead/activity?leadId=${context.state.currentLead}`,
      passParam
    );
    context.commit("SET_INTERACTION", res.data);
    context.state.interactionLoading = false;
  } catch (err) {
    //context.dispatch("initInteraction");
  }
}

async function updateLead(context, data) {
  let res = await this.$axios.put("/lead", data);
  return res;
}

async function selectFilter(context, value) {
  context.commit("SELECT_FILTER", value);
}

async function resetInteractionList(context) {
  context.commit("RESET_INTERACTION_LIST");
}

export default {
  initLeads,
  setLead,
  setLeadObject,
  initInteraction,
  selectFilter,
  updateLead,
  resetInteractionList
};
