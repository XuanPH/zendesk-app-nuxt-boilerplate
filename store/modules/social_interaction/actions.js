import _ from "lodash";

async function getInteraction(context, leadId) {
  try {
    context.dispatch("TRIGGER_LOADING", true);
    var body = {
      page: 0,
      pageSize: 5,
      sort: {
        field: "createdAt",
        sortOrder: "DESC"
      }
    };
    var res = await this.$axios.post(
      `/lead/facebookInteraction?LeadId=${leadId}`,
      body
    );
    await context.commit("setInteractionSocial", { data: res, loading: false });
  } catch (err) {
    context.dispatch("TRIGGER_LOADING", false);
    console.log("getting social interaction error => ", err);
  }
}

export default {
  getInteraction
};
