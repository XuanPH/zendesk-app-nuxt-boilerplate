import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  lead: {},
  listLeads: [],
  currentLead: "",
  listInteraction: [],
  interactionQuery: {
    from: 0,
    size: 5
  },
  interactionTotal: 0,
  filterMenu: [
    {
      text: "All",
      value: "all",
      selected: true
    },
    {
      text: "Assignment",
      value: "assignment",
      selected: false
    },
    {
      text: "Status",
      value: "status",
      selected: false
    },
    {
      text: "Calendar status",
      value: "statusCalendar",
      selected: false
    },
    {
      text: "Create & Edit",
      value: "edit",
      selected: false
    },
    {
      text: "Create & Edit working calendar",
      value: "editCalendar",
      selected: false
    },
    {
      text: "Notes",
      value: "note",
      selected: false
    },
    {
      text: "Send message to Telegram",
      value: "sendLead",
      selected: false
    },
    {
      text: "Message from Telegram",
      value: "recieveTelegram",
      selected: false
    },
    {
      text: "Create calendar",
      value: "sendCalendar",
      selected: false
    },
    {
      text: "Feedback from Salesman",
      value: "responseSale",
      selected: false
    }
  ],
  interactionLoading: true,
  companyLink: ""
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
