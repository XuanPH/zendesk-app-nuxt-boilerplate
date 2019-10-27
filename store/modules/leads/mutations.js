import { replaceNullOrTempty } from "../../../common/func";
import ls from "../../../common/localStorage";
import _ from "lodash";
const INIT_LIST_LEAD = (state, messages) => {
  state.listLeads = messages;
  let els = messages[0].data;
  state.currentLead = els.info.id;
};

const SET_LEAD = state => {
  let list = state.listLeads;
  let leadId = state.currentLead;
  let leadsData = {};
  list.forEach((el, i) => {
    let data = el.data;
    if (data.info.id === leadId) {
      let customer_info = {
        phone: data.info.phone,
        email: data.info.email,
        name: data.info.fullName,
        gender: data.gender.dataValue,
        zen_req_id: data.info.zendeskId,
        id: data.info.id,
        care_status: data.info.status,
        care_status_id: data.statusId || "",
        take_note: data.info.note,
        tags_keywords: [
          data.info.utmCampaign,
          data.info.utmContent,
          data.info.utmKeyword,
          data.info.utmMedium,
          data.info.utmSource,
          data.info.utmTerm
        ],
        appointment_time: data.calendar.startTime,
        sales_man: data.saleman.email,
        sales_man_id: data.saleman.id,
        sales_man_first_name: `${replaceNullOrTempty(
          data.saleman.firstName
        )}`.trim(),
        sales_man_last_name: `${replaceNullOrTempty(
          data.saleman.lastName
        )}`.trim(),
        interest: data.info.interest,
        companyLink: data.companyLink
      };
      let digital_source_info = {
        conversion: data.o2oTracking.statistics.goalNames
          ? data.o2oTracking.statistics.goalNames
          : "",
        source_medium: data.o2oTracking.statistics.utmSourceMediums
          ? data.o2oTracking.statistics.utmSourceMediums
          : "",
        campaign_name: data.o2oTracking.statistics.utmCampaigns
          ? data.o2oTracking.statistics.utmCampaigns
          : "",
        keywords_terms: [
          ...(data.o2oTracking.statistics.utmKeywords
            ? data.o2oTracking.statistics.utmKeywords
            : []),
          ...(data.o2oTracking.statistics.utmTerms
            ? data.o2oTracking.statistics.utmTerms
            : [])
        ],
        zen_req_id: data.info.zendeskId
      };

      let web_access = {
        first_web_access_time: data.o2oTracking.statistics.firstAccess
          ? data.o2oTracking.statistics.firstAccess
          : "",
        last_web_access_time: data.o2oTracking.statistics.lastAccess
          ? data.o2oTracking.statistics.lastAccess
          : "",
        zen_req_id: data.info.zendeskId
      };
      leadsData = {
        customer_info,
        digital_source_info,
        web_access
      };
    }
  });
  state.lead = leadsData;
};

const LEAD_SELECTED = (state, leadId) => {
  localStorage.removeItem("currentLead");
  state.currentLead = leadId;
};

const SET_INTERACTION = (state, interaction) => {
  state.interactionQuery = {
    from: state.interactionQuery.from + interaction.size,
    size: interaction.size
  };
  state.interactionTotal = interaction.total;
  state.listInteraction = _.union(state.listInteraction, interaction.data);
};

const SELECT_FILTER = (state, value) => {
  state.filterMenu[value].selected = !state.filterMenu[value].selected;
  if (
    value === 0 &&
    _.filter(state.filterMenu, o => o.selected === true).length > 0
  ) {
    state.filterMenu = _.map(state.filterMenu, o => {
      o.selected = false;
      return o;
    });
  }
  if (_.filter(state.filterMenu, o => o.selected === true).length === 0) {
    state.filterMenu[0].selected = true;
  } else {
    state.filterMenu[0].selected = false;
  }
};

const RESET_INTERACTION_LIST = state => {
  state.interactionQuery.from = 0;
  state.listInteraction = [];
};

export default {
  SET_LEAD,
  INIT_LIST_LEAD,
  LEAD_SELECTED,
  SET_INTERACTION,
  SELECT_FILTER,
  RESET_INTERACTION_LIST
};
