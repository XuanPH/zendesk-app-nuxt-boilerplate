<template>
  <div
    :data-load="true"
    v-loading="true"
    class="Loadingtop2p"
    element-loading-text="Fetching data..."
  ></div>
</template>
<script>
import zaf from "~/common/zaf";
import ls from "~/common/localStorage";
import { mapGetters } from "vuex";
export default {
  async mounted() {
    let _self = this;
    var data = await zaf.init(this.$store);
    if (!data.code) {
      let intervalSet = setInterval(() => {
        let i = 0;
        try {
          _self.$store.dispatch("setZAFClient", data);
          _self.$store.dispatch("setParams", data.appData);
          clearInterval(intervalSet);
          console.info("Zendesk app framework created");
          let location = data.appData.context.location;
          if (location === "ticket_sidebar" || location === "user_sidebar") {
            this.$store.state.zafClient.on("data_modal_passing", modalData => {
              if (modalData.type === "updateLead") {
                this.$store.dispatch("leads/initLeads", {
                  zendeskId: 389547012574,
                  fullName: "Dzung Nguyen",
                  email: "dzung.nguyen@quesera.sg",
                  phone: ""
                });
              }
            });
            _self.$router.push("/ticket_sidebar");
          }
        } catch (err) {}
      }, 100);
    } else {
      console.info("Created fails, it't may be created");
      this.$router.push("/ticket_sidebar");
    }
  }
};
</script>
