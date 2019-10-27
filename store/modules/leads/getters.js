const getLeadsSelect = (state, getter, rootState) => {
  let list = state.listLeads;
  let leadsData = [];
  list.forEach((el, i) => {
    let els = el.data;
    leadsData.push({
      value: els.info.id,
      label: `${els.info.fullName} | ${els.info.phone}`
    });
  });
  return leadsData;
};
const getCustomerInfo = state => {
  return state.lead.customer_info;
};
const getDigitalSourceInfo = state => state.lead.digital_source_info;
const getWebAccess = state => state.lead.web_access;
const getCurrentLead = state => state.currentLead;
const getFilterMenu = state => state.filterMenu;
const getInteraction = state => state.listInteraction;
const getInteractionLoading = state => state.interactionLoading;
const showReadMore = state =>
  state.interactionTotal !== state.listInteraction.length;
export default {
  getLeadsSelect,
  getCurrentLead,
  getCustomerInfo,
  getDigitalSourceInfo,
  getWebAccess,
  getFilterMenu,
  getInteraction,
  getInteractionLoading,
  showReadMore
};
